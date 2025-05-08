"use server";

import { prisma } from "@/util/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function registerAction(_, formData) {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!username || !email || !password) {
        return {
            success: false,
            message: "All field must be filled",
        };
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (user) {
        return {
            success: false,
            message: `Email ${email} already registered.`,
        };
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
        data: {
            name: username,
            email: email,
            password: hashedPassword,
        },
    });

    redirect("/signin");
}
