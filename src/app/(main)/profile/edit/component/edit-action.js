"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/util/prisma";
import { redirect } from "next/navigation";

export async function editProfileAction(_, formData) {
    const session = await auth();
    const username = formData.get("userName");
    const sex = formData.get("userSex");
    const age = Number(formData.get("userAge"));
    const userContext = formData.get("userContext");

    if (!username) {
        return {
            success: false,
            message: "Username can't be blank!",
        };
    }

    await prisma.user.update({
        where: {
            id: session.user.id,
        },
        data: {
            name: username,
            sex,
            age,
            userContext,
        },
    });

    redirect(`/profile`);
}
