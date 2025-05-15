import { auth } from "@/lib/auth";
import { prisma } from "@/util/prisma";
import { ResultGroup } from "./components/result-group";

export default async function Page() {
    const session = await auth();
    const userId = session.user.id;
    let results = null;

    try {
        results = await prisma.result.findMany({
            where: { userId: userId, status: "done" },
            select: {
                id: true,
                createdAt: true,
                totalNutrition: true,
                score: true,
                input: {
                    select: {
                        context: true,
                    },
                },
            },
        });
    } catch (err) {
        console.error("Get result error", err.message);
        return {
            success: false,
            message: "An error occurred while catch the result.",
        };
    }

    return (
        <div className="w-full text-left">
            <div className="font-extrabold text-2xl pb-4">
                {results.length ? "Your Previous Record" : "No Previous Record"}
            </div>
            <ResultGroup results={results} />
        </div>
    );
}
