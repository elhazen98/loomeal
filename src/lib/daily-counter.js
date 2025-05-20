import { prisma } from "@/util/prisma";
import { auth } from "./auth";
import { roundTwoDec } from "./utils";
import { DateTime } from "luxon";

export async function dailyCounter() {
    const session = await auth();
    const timezone = session.timezone;
    const userId = session.user.id;
    const todayDate = DateTime.now().setZone(timezone).toISODate();

    const previousMeal = await prisma.result.findMany({
        where: { userId: userId, status: "done" },
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
        const date = DateTime.fromISO(meal.createdAt.toISOString(), {
            zone: timezone,
        }).toISODate();
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
