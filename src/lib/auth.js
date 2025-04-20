import { prisma } from "@/util/prisma";
import { cookies } from "next/headers";

export async function auth() {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("sessionId")?.value;

    if (!sessionId) {
        return null;
    }

    const session = await prisma.session.findUnique({
        where: {
            id: sessionId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    return session;
}
