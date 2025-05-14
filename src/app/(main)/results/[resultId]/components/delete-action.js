"use server";

import { prisma } from "@/util/prisma";
import { redirect } from "next/navigation";

export async function deleteResultAction(_, formData) {
    const resultId = formData.get("resultId");

    try {
        await prisma.result.delete({
            where: {
                id: resultId,
            },
        });
    } catch (error) {
        console.error("Delete result error:", error);
    }

    redirect("/results");
}
