import { prisma } from "@/util/prisma";
import { auth } from "./auth";

export async function weeklyCounter() {
    const session = await auth();
    const userId = session.user.id;
    const today = new Date();
    const dateCalories = {};

    const previousMeal = await prisma.result.findMany({
        where: { userId: userId },
        select: {
            totalNutrition: true,
            createdAt: true,
        },
    });

    for (let i = 1; i <= 7; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);

        const formatted = date.toLocaleDateString();
        dateCalories[formatted] = 0;
    }

    previousMeal.map((meal) => {
        const date = new Date(meal.createdAt).toLocaleDateString();
        if (date in dateCalories) {
            dateCalories[date] += meal.totalNutrition.calories.amount;
        }
    });

    const previousRecord = Object.entries(dateCalories)
        .map(([date, calories]) => ({
            date,
            calories,
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    return previousRecord;
}
