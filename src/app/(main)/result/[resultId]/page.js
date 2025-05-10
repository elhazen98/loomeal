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
        let retries = 10;
        let intervalId = null;

        const fetchStatus = async () => {
            if (retries <= 0) {
                setError(true);
                setLoading(false);
                clearInterval(intervalId);
                return;
            }
            try {
                const res = await fetch(`/api/result/${resultId}`);
                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    clearInterval(intervalId);
                    return;
                }
                const data = await res.json();
                if (data.status === "done") {
                    setResult(data);
                    setLoading(false);
                    clearInterval(intervalId);
                }

                if (data.status === "processing") {
                    retries--;
                }
            } catch (error) {
                setError(true);
                setLoading(false);
                clearInterval(intervalId);
            }
        };

        fetchStatus();
        intervalId = setInterval(fetchStatus, 3000);

        return () => clearInterval(intervalId);
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
