"use server";

import { auth } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
    const cookieStore = await cookies();
    const session = await auth();

    cookieStore.delete("sessionId");

    try {
        await prisma.session.delete({
            where: {
                id: session.id,
            },
        });
    } catch (error) {
        console.error("Logout Error:", error);
    }

    redirect("/");
}
