import { Button } from "@/components/ui/button";
import { UserCard } from "./components/user-info";
import Link from "next/link";
import { IconFolder, IconPlus } from "@/components/ui/icons";
import { RecordChart } from "./components/last-week-record";
import { TodayRecord } from "./components/today-record";
import { dailyCounter } from "@/lib/daily-counter";
import { weeklyCounter } from "@/lib/weekly-counter";

export default async function Page() {
    const todayRecord = await dailyCounter();
    const previousRecord = await weeklyCounter();

    const averageCalories = Math.round(
        previousRecord.reduce((sum, record) => sum + record.calories, 0) /
            previousRecord.length
    );

    return (
        <div className="flex flex-col h-full w-full gap-8">
            <div className="flex flex-col justify-center items-center gap-4">
                <UserCard />
                <TodayRecord todayRecord={todayRecord} />
                <Link href="/input" className="w-full">
                    <Button className="w-full p-6 mt-2">
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
                            <div
                                className={`font-bold ${
                                    averageCalories ? "text-3xl" : "text-xl"
                                }`}
                            >
                                {averageCalories
                                    ? averageCalories
                                    : "No Record"}
                            </div>
                            <div className="text-sm">
                                {averageCalories
                                    ? "kcal (AVG)"
                                    : "The log will display your past 7 days records."}
                            </div>
                        </div>
                    </div>
                    <RecordChart previousRecord={previousRecord} />
                </div>
                <Link href="/results" className="w-full">
                    <Button className="w-full p-6">
                        <IconFolder /> See All Record
                    </Button>
                </Link>
            </div>
        </div>
    );
}
