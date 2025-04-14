"use server";

import { getFood, searchFood } from "@/lib/fatsecret";
import Fuse from "fuse.js";
import { openai } from "@/util/openai";
import { redirect } from "next/navigation";
import { systemPrompt } from "@/lib/prompt";

export async function getDataAction(_, formData) {
    const size = formData.get("size");
    const context = formData.get("context");
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
                console.log(fixFood);

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
    console.log(JSON.parse(response.replace(/```json|```/g, "").trim()));
    redirect("/input");
}
