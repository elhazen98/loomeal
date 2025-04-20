import { Button } from "@/components/ui/button";
import { UserCard } from "./components/user-card";
import Link from "next/link";
import { IconFolder, IconPlus } from "@/components/ui/icons";
import { RecordChart } from "./components/chart";
import { TodayRecord } from "./components/today-card";

export default function Page() {
    const todayRecord = {
        calories: 129,
        fat: 10,
        carbs: 24.3,
        protein: 16.06,
    };

    const previousRecord = [
        { date: "11/12", calories: 325 },
        { date: "12/12", calories: 212 },
        { date: "13/12", calories: 449 },
        { date: "14/12", calories: 284 },
        { date: "15/12", calories: 332 },
        { date: "16/12", calories: 521 },
        { date: "17/12", calories: 325 },
    ];

    const averageCalories = Math.round(
        previousRecord.reduce((sum, record) => sum + record.calories, 0) /
            previousRecord.length
    );

    return (
        <div className="flex flex-col justify-center items-center h-full w-full gap-12">
            <div className="flex flex-col justify-center items-center gap-4">
                <UserCard />
                <TodayRecord todayRecord={todayRecord} />
                <Link href="/input" className="w-full">
                    <Button className="w-full p-6">
                        <IconPlus /> Record A Meal
                    </Button>
                </Link>
            </div>
            <div className="flex flex-col justify-center items-center gap-4 w-full">
                <div className="flex flex-col justify-center items-center gap-2 w-full">
                    <div className="w-full text-right flex justify-between">
                        <div className="text-left w-full">
                            <p className="opacity-50 text-sm">
                                Last Week Record
                            </p>
                        </div>
                        <div className="w-full">
                            <div className="font-bold text-3xl">
                                {averageCalories}
                            </div>
                            <div className="text-sm">{"kcal (AVG)"}</div>
                        </div>
                    </div>
                    <RecordChart previousRecord={previousRecord} />
                </div>
                <Link href="/result" className="w-full">
                    <Button className="w-full p-6">
                        <IconFolder /> See All Record
                    </Button>
                </Link>
            </div>
        </div>
    );
}
