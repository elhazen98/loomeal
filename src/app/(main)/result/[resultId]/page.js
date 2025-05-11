import { capitalize, roundTwoDec } from "@/lib/utils";
import { TotalNutrition } from "./components/total-nutrition";
import { Nutrition } from "./components/nutrition";
import { NoResult } from "./components/no-result";
import { IconDislike, IconLike, IconOk } from "@/components/ui/icons";
import { DeleteResultButton } from "./components/delete-button";
import { prisma } from "@/util/prisma";
import { getFood, searchFood } from "@/lib/fatsecret";
import Fuse from "fuse.js";
import { systemPrompt } from "@/lib/prompt";
import { openai } from "@/util/openai";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function Page({ params }) {
    const { resultId } = await params;

    const result = await prisma.result.findUnique({
        where: { id: resultId },
        include: {
            user: { select: { sex: true, age: true, userContext: true } },
            input: { select: { context: true, foods: true } },
        },
    });

    if (!result) {
        return <NoResult />;
    }

    const context = result.input.context;
    let totalNutrition = result.totalNutrition;
    let nutritions = result.nutritions;
    let insight = result.insight;
    let recommendations = result.recommendations;
    let score = result.score;

    if (result.status === "processing") {
        const inputs = {
            userContext: result.user.userContext,
            userSex: result.sex,
            userAge: result.age,
            mealContext: result.input.context,
            foods: [],
        };

        totalNutrition = {
            calories: { amount: 0.0, unit: "kcal" },
            carbohydrate: { amount: 0.0, unit: "g" },
            protein: { amount: 0.0, unit: "g" },
            fat: { amount: 0.0, unit: "g" },
            cholesterol: { amount: 0.0, unit: "mg" },
            fiber: { amount: 0.0, unit: "g" },
            sugar: { amount: 0.0, unit: "g" },
        };

        const size = result.input.foods.length;

        for (let index = 0; index < size; index++) {
            let food = result.input.foods[index].food;
            let portion = result.input.foods[index].portion;
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
                return <div>An error occurred while searching for food</div>;
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

            parsed.per_food_breakdown.forEach((food) => {
                Object.keys(totalNutrition).forEach((key) => {
                    totalNutrition[key].amount += food[key].amount;
                    if (!totalNutrition[key].unit) {
                        totalNutrition[key].unit = food[key].unit;
                    }
                });
            });

            nutritions = parsed.per_food_breakdown;
            insight = parsed.insight;
            recommendations = parsed.recommendations;
            score = parsed.score;

            Object.values(totalNutrition).forEach((nutrient) => {
                nutrient.amount = roundTwoDec(nutrient.amount);
            });

            if (
                totalNutrition &&
                nutritions &&
                insight &&
                recommendations &&
                score
            ) {
                const updated = await prisma.result.update({
                    where: { id: resultId },
                    data: {
                        totalNutrition,
                        nutritions,
                        insight,
                        recommendations,
                        score,
                        status: "done",
                    },
                });

                if (!updated) {
                    console.log("An error occurred while saving food.");
                }
            }
        } catch (err) {
            return <div>{err.message}</div>;
        }
    }

    const date = new Date(result.createdAt).toLocaleDateString("en-CA", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="flex flex-col gap-4 text-left text-sm">
            <div className="flex justify-between items-center">
                <div className="">
                    <div className="font-extrabold text-2xl">
                        {capitalize(context)}
                    </div>
                    <div>{date}</div>
                </div>
                <div className="text-5xl">
                    {score === 1 && <IconDislike />}
                    {score === 2 && <IconOk />}
                    {score === 3 && <IconLike />}
                </div>
            </div>
            <TotalNutrition totalNutrition={totalNutrition} />
            <div className="p-4 bg-chart-2 rounded-xl">
                <div className="flex flex-col gap-2">
                    <div className="font-bold text-lg">Insight</div>
                    <div className="text-sm text-justify">{insight}</div>
                </div>
            </div>
            <div className="p-4 bg-chart-3 rounded-xl">
                <div className="flex flex-col gap-2">
                    <div className="font-bold text-lg">Recommendations</div>
                    <ol className="list-disc list-inside text-justify">
                        {recommendations.map((recommendation, index) => (
                            <li key={index}>{recommendation}</li>
                        ))}
                    </ol>
                </div>
            </div>
            <Nutrition nutritions={nutritions} />
            <DeleteResultButton resultId={resultId} />
        </div>
    );
}
