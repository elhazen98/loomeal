import { prisma } from "@/util/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { resultId } = await params;
    const result = await prisma.result.findUnique({
        where: { id: resultId },
        include: {
            input: {
                select: {
                    context: true,
                },
            },
        },
    });

    if (!result) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(result, {
        headers: {
            "Cache-Control": "no-store",
        },
    });
}
