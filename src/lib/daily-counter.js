import { prisma } from "@/util/prisma";
import { auth } from "./auth";
import { roundTwoDec } from "./utils";

export async function dailyCounter() {
    const session = await auth();
    const userId = session.user.id;
    const today = new Date();
    const todayDate = today.toLocaleDateString();

    const previousMeal = await prisma.result.findMany({
        where: { userId: userId },
        select: {
            totalNutrition: true,
            createdAt: true,
        },
    });

    const todayRecord = {
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
    };

    previousMeal.map((meal) => {
        const date = new Date(meal.createdAt).toLocaleDateString();
        if (date === todayDate) {
            todayRecord.calories += meal.totalNutrition.calories.amount;
            todayRecord.fat += meal.totalNutrition.fat.amount;
            todayRecord.carbs += meal.totalNutrition.carbohydrate.amount;
            todayRecord.protein += meal.totalNutrition.protein.amount;
        }
    });

    todayRecord.calories = roundTwoDec(todayRecord.calories);
    todayRecord.fat = roundTwoDec(todayRecord.fat);
    todayRecord.carbs = roundTwoDec(todayRecord.carbs);
    todayRecord.protein = roundTwoDec(todayRecord.protein);

    return todayRecord;
}
