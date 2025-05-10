import { getFood, searchFood } from "@/lib/fatsecret";
import { systemPrompt } from "@/lib/prompt";
import { roundTwoDec } from "@/lib/utils";
import { openai } from "@/util/openai";
import { prisma } from "@/util/prisma";
import Fuse from "fuse.js";

export async function backgroundProcessing({
    resultId,
    size,
    foodsOriginal,
    inputs,
}) {
    for (let index = 0; index < size; index++) {
        let food = foodsOriginal[index].food;
        const portion = foodsOriginal[index].portion;
        let serving = null;

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

        const updated = await prisma.result.update({
            where: { id: resultId },
            data: {
                totalNutrition: totalNutrition,
                nutritions: parsed.per_food_breakdown,
                insight: parsed.insight,
                recommendations: parsed.recommendations,
                score: parsed.score,
                status: "done",
            },
        });

        if (!updated) {
            console.log("An error occurred while saving food.");
        }
    } catch (e) {
        return {
            success: false,
            message: e.message,
        };
    }
}
