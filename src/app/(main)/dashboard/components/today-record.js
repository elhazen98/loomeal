export const TodayRecord = ({ todayRecord }) => {
    const { calories, fat, carbs, protein } = todayRecord;

    const totalGram = fat + carbs + protein;
    const fatPercentage = totalGram ? fat / totalGram : 0;
    const carbsPercentage = totalGram ? carbs / totalGram : 0;
    const proteinPercentage = totalGram ? protein / totalGram : 0;

    return (
        <div className="w-full text-left">
            <p className="opacity-50 text-sm mb-2">Your Record Today</p>
            <div className="gap-2">
                <div className="w-full p-4 items-center text-center">
                    <div className="w-full">
                        <div className="text-5xl font-bold">
                            {calories} kcal
                        </div>
                    </div>
                </div>
                <div className="flex text-xs gap-1 font-bold">
                    <div
                        style={{
                            width: `${
                                totalGram ? fatPercentage * 100 : 33.33
                            }%`,
                        }}
                        className="flex flex-col text-center gap-1"
                    >
                        <div>Fat {Math.round(fatPercentage * 100)}%</div>
                        <div className="bg-chart-1 w-full text-card-foreground rounded-lg p-1 text-sm">
                            {fat} g
                        </div>
                    </div>
                    <div
                        style={{
                            width: `${
                                totalGram ? carbsPercentage * 100 : 33.33
                            }%`,
                        }}
                        className="flex flex-col text-center gap-1"
                    >
                        Carbs {Math.round(carbsPercentage * 100)}%
                        <div className="bg-chart-2 w-full text-card-foreground rounded-lg p-1 text-sm">
                            {carbs} g
                        </div>
                    </div>
                    <div
                        style={{
                            width: `${
                                totalGram ? proteinPercentage * 100 : 33.33
                            }%`,
                        }}
                        className="flex flex-col text-center gap-1"
                    >
                        Protein {Math.round(proteinPercentage * 100)}%
                        <div className="bg-chart-3 text-card-foreground rounded-lg p-1 text-sm">
                            {protein} g
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
