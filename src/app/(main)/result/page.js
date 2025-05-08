import { auth } from "@/lib/auth";
import { prisma } from "@/util/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { capitalize } from "@/lib/utils";
import { IconDislike, IconLike, IconOk } from "@/components/ui/icons";

export default async function Page() {
    const session = await auth();
    const userId = session.user.id;
    let results = null;

    try {
        results = await prisma.result.findMany({
            where: { userId: userId },
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

    return (
        <div className="w-full text-left">
            <div className="font-extrabold text-2xl pb-4">
                Your Previous Record
            </div>
            <div className="flex flex-col gap-6">
                {groupByDate.map((group) => (
                    <div className="text-left w-full" key={group.date}>
                        <div className="font-bold mb-2">{group.date}</div>
                        <div className="flex flex-col gap-2">
                            {group.results.map((result) => (
                                <div key={result.id} className="w-full">
                                    <Link
                                        href={`result/${result.id}`}
                                        className="w-full"
                                    >
                                        <Button
                                            className="w-full justify-between"
                                            variant="secondary"
                                        >
                                            <div>
                                                {capitalize(
                                                    result.input.context
                                                )}
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <div>
                                                    {`${result.totalNutrition.calories.amount} Kcal`}
                                                </div>
                                                <div>
                                                    {result.score === 1 && (
                                                        <IconDislike />
                                                    )}
                                                    {result.score === 2 && (
                                                        <IconOk />
                                                    )}
                                                    {result.score === 3 && (
                                                        <IconLike />
                                                    )}
                                                </div>
                                            </div>
                                        </Button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
