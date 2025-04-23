import { capitalize, roundTwoDec } from "@/lib/utils";
import { prisma } from "@/util/prisma";
import { TotalNutrition } from "./components/total-nutrition";
import { Nutrition } from "./components/nutrition";
import { createId } from "@paralleldrive/cuid2";

export default async function Page({ params }) {
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

    const date = result.createdAt.toLocaleDateString("en-CA", {
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

    return (
        <div className="my-20 flex flex-col gap-8 text-left text-sm">
            <div className="">
                <div className="font-bold text-2xl">{capitalize(context)}</div>
                <div>{date}</div>
            </div>
            <TotalNutrition totalNutrition={totalNutrition} />
            <div className="flex flex-col gap-2">
                <div className="font-bold text-lg">Insight</div>
                <div className="text-sm text-justify">{insight}</div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="font-bold text-lg">Recommendations</div>
                <ol className="list-decimal text-justify">
                    {recommendations.map((recommendation) => (
                        <li key={createId()}>{recommendation}</li>
                    ))}
                </ol>
            </div>
            <Nutrition nutritions={nutritions} key={createId()} />
        </div>
    );
}
