"use server";

import { prisma } from "@/util/prisma";
import { redirect } from "next/navigation";

export async function editProfileAction(_, formData) {
    const id = formData.get("userId");
    const sex = formData.get("userSex");
    const age = Number(formData.get("userAge"));
    const userContext = formData.get("userContext");

    await prisma.user.update({
        where: {
            id,
        },
        data: {
            sex,
            age,
            userContext,
        },
    });

    redirect(`/profile`);
}
