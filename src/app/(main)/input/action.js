"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/util/prisma";
import { createId } from "@paralleldrive/cuid2";
import { backgroundProcessing } from "../../../lib/processing";

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

        foodsOriginal.push({ food: food, portion: portion });
    }

    const inputs = {
        userSex,
        userAge,
        userContext,
        context,
        foods,
    };

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

    backgroundProcessing({ resultId, size, foodsOriginal, inputs });

    redirect(`/result/${resultId}`);
}
