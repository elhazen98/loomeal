"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ResultButton } from "./result-button";

export const ResultGroup = ({ results }) => {
    const groupByDate = Object.values(
        results.reduce((group, result) => {
            const date = result.createdAt.toLocaleDateString(undefined, {
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

    if (!size) {
        return (
            <Link href="/input" className="w-full">
                <Button className="w-full">Record your meal here!</Button>
            </Link>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            {groupByDate.map((group) => (
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
                                            result.totalNutrition.calories
                                                .amount
                                        }
                                        score={result.score}
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
