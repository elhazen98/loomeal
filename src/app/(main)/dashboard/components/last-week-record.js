"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
    calories: {
        label: "calories",
    },
};

export const RecordChart = ({ previousRecord }) => {
    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={previousRecord}>
                <CartesianGrid vertical={false} stroke="var(--muted)" />
                <XAxis
                    dataKey="date"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={{ stroke: "var(--secondary)", strokeWidth: 2 }}
                    tickFormatter={(value) =>
                        value.split("/")[1] + "/" + value.split("/")[0]
                    }
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="calories" fill="var(--secondary)" radius={6} />
            </BarChart>
        </ChartContainer>
    );
};
