import { prisma } from "@/util/prisma";
import { auth } from "./auth";
import { DateTime } from "luxon";

export async function weeklyCounter() {
    const session = await auth();
    const timezone = session.timezone;
    const userId = session.user.id;

    const today = DateTime.now().setZone(timezone);
    const dateCalories = {};

    for (let i = 0; i < 7; i++) {
        const date = today.minus({ days: i }).toFormat("yyyy-MM-dd");
        dateCalories[date] = 0;
    }

    const sevenDaysAgo = today.minus({ days: 6 }).startOf("day").toJSDate();

    const previousMeal = await prisma.result.findMany({
        where: {
            userId: userId,
            status: "done",
            createdAt: {
                gte: sevenDaysAgo,
            },
        },
        select: {
            totalNutrition: true,
            createdAt: true,
        },
    });

    previousMeal.forEach((meal) => {
        const date = DateTime.fromJSDate(meal.createdAt)
            .setZone(timezone)
            .toFormat("yyyy-MM-dd");

        if (dateCalories[date] != null) {
            dateCalories[date] += meal.totalNutrition.calories.amount;
        }
    });

    const result = Object.entries(dateCalories)
        .map(([date, calories]) => ({ date, calories }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    return result;
}
