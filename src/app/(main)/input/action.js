"use server";

import { getFood, searchFood } from "@/lib/fatsecret";
import Fuse from "fuse.js";
import { openai } from "@/util/openai";
import { redirect } from "next/navigation";
import { systemPrompt } from "@/lib/prompt";
import { prisma } from "@/util/prisma";
import { createId } from "@paralleldrive/cuid2";
import { roundTwoDec } from "@/lib/utils";
import { ParametersLoader } from "oauth-signature";

export async function getDataAction(_, formData) {
    const inputId = createId();
    const resultId = createId();
    const userId = formData.get("userId");
    const userSex = formData.get("userSex");
    const userAge = formData.get("userAge");
    const userContext = formData.get("userContext");
    const size = formData.get("size");
    const context = formData.get("context");
    const foodsOriginal = [];
    const foods = [];

    if (!context) {
        return {
            success: false,
            message: "Meal context can't be blank",
        };
    }

    for (let index = 0; index < size; index++) {
        const food = formData.get(`food${index}`);
        const portion = formData.get(`portion${index}`);

        if (!food) {
            return {
                success: false,
                message: "Food name can't be blank",
            };
        }

        if (!portion) {
            return {
                success: false,
                message: "Food portion should be filled",
            };
        }
    }

    const inputs = {
        userSex,
        userAge,
        userContext,
        context,
        foods,
    };

    for (let index = 0; index < size; index++) {
        let food = formData.get(`food${index}`);
        const portion = formData.get(`portion${index}`);
        let serving = null;

        foodsOriginal.push({ food: food, portion: portion });

        try {
            const data = await searchFood(food);

            if (data) {
                const fuse = new Fuse(data, {
                    keys: ["food_name"],
                    threshold: 0.2,
                    includeScore: true,
                });

                const similar = fuse.search(food);
                const fixFood = similar.length ? similar[0].item : null;

                if (fixFood) {
                    food = fixFood.food_name;
                    serving = await getFood(fixFood.food_id);
                }
            }
        } catch (err) {
            console.error("getDataAction error:", err.message);
            return {
                success: false,
                message: "An error occurred while searching for food.",
            };
        }

        inputs.foods.push({
            food,
            portion,
            serving,
        });
    }

    await prisma.input.create({
        data: {
            id: inputId,
            userId: userId,
            context: context,
            foods: foodsOriginal,
        },
    });

    const completion = await openai.chat.completions.create({
        model: "google/gemini-2.0-flash-001",
        messages: [
            {
                role: "system",
                content: systemPrompt(),
            },
            {
                role: "user",
                content: JSON.stringify(inputs),
            },
        ],
    });

    const response = completion.choices[0].message.content;

    try {
        const cleaned = response.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleaned);

        const totalNutrition = {
            calories: { amount: 0.0, unit: "kcal" },
            carbohydrate: { amount: 0.0, unit: "g" },
            protein: { amount: 0.0, unit: "g" },
            fat: { amount: 0.0, unit: "g" },
            cholesterol: { amount: 0.0, unit: "mg" },
            fiber: { amount: 0.0, unit: "g" },
            sugar: { amount: 0.0, unit: "g" },
        };

        parsed.per_food_breakdown.map((food) => {
            totalNutrition.calories.amount += food.calories.amount;
            totalNutrition.carbohydrate.amount += food.carbohydrate.amount;
            totalNutrition.protein.amount += food.protein.amount;
            totalNutrition.fat.amount += food.fat.amount;
            totalNutrition.cholesterol.amount += food.cholesterol.amount;
            totalNutrition.fiber.amount += food.fiber.amount;
            totalNutrition.sugar.amount += food.sugar.amount;
        });

        totalNutrition.calories.amount = roundTwoDec(
            totalNutrition.calories.amount
        );
        totalNutrition.carbohydrate.amount = roundTwoDec(
            totalNutrition.carbohydrate.amount
        );
        totalNutrition.protein.amount = roundTwoDec(
            totalNutrition.protein.amount
        );
        totalNutrition.fat.amount = roundTwoDec(totalNutrition.fat.amount);
        totalNutrition.cholesterol.amount = roundTwoDec(
            totalNutrition.cholesterol.amount
        );
        totalNutrition.fiber.amount = roundTwoDec(totalNutrition.fiber.amount);
        totalNutrition.sugar.amount = roundTwoDec(totalNutrition.sugar.amount);

        await prisma.result.create({
            data: {
                id: resultId,
                userId: userId,
                inputId: inputId,
                totalNutrition: totalNutrition,
                nutritions: parsed.per_food_breakdown,
                insight: parsed.insight,
                recommendations: parsed.recommendations,
                score: parsed.score,
            },
        });
    } catch (e) {
        console.error(e.message);
    }

    redirect(`/result/${resultId}`);
}
