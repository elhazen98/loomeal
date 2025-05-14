import { auth } from "@/lib/auth";
import { prisma } from "@/util/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ResultButton } from "./components/result-button";

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

    const groupByDate = Object.values(
        results.reduce((group, result) => {
            const date = result.createdAt.toLocaleDateString("en-CA", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
            });

            if (!group[date]) {
                group[date] = {
                    date: date,
                    results: [],
                    timestamp: new Date(result.createdAt).getTime(),
                };
            }

            group[date].results.push(result);
            return group;
        }, {})
    ).sort((a, b) => b.timestamp - a.timestamp);

    const size = groupByDate.length;

    return (
        <div className="w-full text-left">
            <div className="font-extrabold text-2xl pb-4">
                {size ? "Your Previous Record" : "No Previous Record"}
            </div>
            <div className="flex flex-col gap-6">
                {size ? (
                    groupByDate.map((group) => (
                        <div className="text-left w-full" key={group.date}>
                            <div className="font-bold mb-2">{group.date}</div>
                            <div className="flex flex-col gap-2">
                                {group.results.map((result) => (
                                    <div key={result.id} className="w-full">
                                        <Link
                                            href={`results/${result.id}`}
                                            className="w-full"
                                        >
                                            <ResultButton
                                                variant="secondary"
                                                context={result.input.context}
                                                totalCalories={
                                                    result.totalNutrition
                                                        .calories.amount
                                                }
                                                score={result.score}
                                            />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <Link href="/input" className="w-full">
                        <Button className="w-full">
                            Record your meal here!
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}
