"use server";

import { getFood, searchFood } from "@/lib/fatsecret";
import Fuse from "fuse.js";
import { openai } from "@/util/openai";
import { redirect } from "next/navigation";
import { systemPrompt } from "@/lib/prompt";
import { prisma } from "@/util/prisma";
import { createId } from "@paralleldrive/cuid2";

export async function getDataAction(_, formData) {
    const inputId = createId();
    const resultId = createId();
    const today = new Date();
    const userId = formData.get("userId");
    const size = formData.get("size");
    const context = formData.get("context");
    const foodsOriginal = [];
    const foods = [];

    if (!context) {
        return {
            success: false,
            message: "What do you eat for?",
        };
    }

    const inputs = { context, foods };

    for (let index = 0; index < size; index++) {
        let food = formData.get(`food${index}`);
        const portion = formData.get(`portion${index}`);
        let serving = null;

        if (!food) {
            return {
                success: false,
                message: "Food name should be defined",
            };
        }

        if (!portion) {
            return {
                success: false,
                message: "Food portion should be filled",
            };
        }

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
            date: today.toLocaleDateString("en-CA", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
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
            calories: { amount: 0, unit: "kcal" },
            carbohydrate: { amount: 0, unit: "g" },
            protein: { amount: 0, unit: "g" },
            fat: { amount: 0, unit: "g" },
            cholesterol: { amount: 0, unit: "mg" },
            fiber: { amount: 0, unit: "g" },
            sugar: { amount: 0, unit: "g" },
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

        console.log("Parsed:", parsed);
        console.log(parsed.per_food_breakdown);
        console.log(totalNutrition);

        await prisma.result.create({
            data: {
                id: resultId,
                userId: userId,
                inputId: inputId,
                totalNutrition: totalNutrition,
                nutritions: parsed.per_food_breakdown,
                insight: parsed.insight,
                recommendations: parsed.recommendations,
                date: today.toLocaleDateString("en-CA", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
            },
        });
    } catch (e) {
        console.error(e.message);
    }

    redirect(`/result/${resultId}`);
}
