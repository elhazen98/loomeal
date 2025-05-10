"use client";

import { capitalize } from "@/lib/utils";
import { TotalNutrition } from "./components/total-nutrition";
import { Nutrition } from "./components/nutrition";
import { NoResult } from "./components/no-result";
import { IconDislike, IconLike, IconOk } from "@/components/ui/icons";
import { DeleteResultButton } from "./components/delete-button";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {
    const { resultId } = useParams();
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let pollCount = 0;
        const maxPolls = 10;
        let firstFetch = true;
        let timeoutId = null;

        const poll = async () => {
            try {
                pollCount++;
                const res = await fetch(`/api/result/${resultId}`);
                const data = await res.json();

                if (firstFetch && res.ok && data.status !== "done") {
                    firstFetch = false;
                    timeoutId = setTimeout(poll, 10000);
                    return;
                }

                if (!res.ok || !data.status) {
                    setError(true);
                    setLoading(false);
                    return;
                }

                console.log(data.status);

                if (data.status === "done") {
                    setResult(data);
                    setLoading(false);
                } else if (pollCount < maxPolls) {
                    firstFetch = false;
                    timeoutId = setTimeout(poll, 10000);
                } else {
                    setError(true);
                    setLoading(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };

        poll();

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [resultId]);

    if (loading) {
        return <div>processing ...</div>;
    }

    if (error || !result) {
        return <NoResult />;
    }

    const date = new Date(result.createdAt).toLocaleDateString("en-CA", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const context = result.input.context;
    const totalNutrition = result.totalNutrition;
    const nutritions = result.nutritions;
    const insight = result.insight;
    const recommendations = result.recommendations;
    const score = result.score;

    return (
        <div className="flex flex-col gap-4 text-left text-sm">
            <div className="flex justify-between items-center">
                <div className="">
                    <div className="font-extrabold text-2xl">
                        {capitalize(context)}
                    </div>
                    <div>{date}</div>
                </div>
                <div className="text-5xl">
                    {score === 1 && <IconDislike />}
                    {score === 2 && <IconOk />}
                    {score === 3 && <IconLike />}
                </div>
            </div>
            <TotalNutrition totalNutrition={totalNutrition} />
            <div className="p-4 bg-chart-2 rounded-xl">
                <div className="flex flex-col gap-2">
                    <div className="font-bold text-lg">Insight</div>
                    <div className="text-sm text-justify">{insight}</div>
                </div>
            </div>
            <div className="p-4 bg-chart-3 rounded-xl">
                <div className="flex flex-col gap-2">
                    <div className="font-bold text-lg">Recommendations</div>
                    <ol className="list-disc list-inside text-justify">
                        {recommendations.map((recommendation, index) => (
                            <li key={index}>{recommendation}</li>
                        ))}
                    </ol>
                </div>
            </div>
            <Nutrition nutritions={nutritions} />
            <DeleteResultButton resultId={resultId} />
        </div>
    );
}
