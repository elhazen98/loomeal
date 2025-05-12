"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/util/prisma";
import { createId } from "@paralleldrive/cuid2";

export async function getDataAction(_, formData) {
    const inputId = createId();
    const resultId = createId();
    const userId = formData.get("userId");
    const size = formData.get("size");
    const context = formData.get("context");
    const foodsOriginal = [];

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

        foodsOriginal.push({ food: food, portion: portion });
    }

    await prisma.input.create({
        data: {
            id: inputId,
            userId: userId,
            context: context,
            foods: foodsOriginal,
        },
    });

    await prisma.result.create({
        data: {
            id: resultId,
            userId: userId,
            inputId: inputId,
        },
    });

    return {
        success: true,
        resultId,
    };
}
