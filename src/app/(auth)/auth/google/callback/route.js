import { capitalize } from "@/lib/utils";
import { google } from "@/util/arctic";
import { prisma } from "@/util/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(req) {
    const query = req.nextUrl.searchParams;
    const code = query.get("code");

    const cookieStore = await cookies();
    const codeVerifier = cookieStore.get("codeVerifier")?.value;

    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const accessToken = tokens.accessToken();

    const res = await fetch(
        "https://openidconnect.googleapis.com/v1/userinfo",
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    const newUser = await res.json();

    let user = await prisma.user.findUnique({
        where: { email: newUser.email },
    });

    if (!user) {
        user = await prisma.user.create({
            data: {
                name: capitalize(newUser.name),
                email: newUser.email,
            },
        });
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
