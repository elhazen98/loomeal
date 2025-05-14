"use server";

import { prisma } from "@/util/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export async function signinAction(_, formData) {
    const cookieStore = await cookies();
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
        return {
            success: false,
            message: "All field must be filled!",
        };
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) {
        return {
            success: false,
            message: "Account not found!",
        };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return {
            success: false,
            message: "Invalid credentials!",
        };
    }

    const newSession = await prisma.session.create({
        data: {
            userId: user.id,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
    });

    cookieStore.set("sessionId", newSession.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: newSession.expires,
        sameSite: "lax",
    });

    redirect("/home");
}
