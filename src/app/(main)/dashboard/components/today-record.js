export const TodayRecord = ({ todayRecord }) => {
    const { calories, fat, carbs, protein } = todayRecord;
    const totalGram = fat + carbs + protein;
    const fatPercentage = totalGram ? fat / totalGram : 0;
    const carbsPercentage = totalGram ? carbs / totalGram : 0;
    const proteinPercentage = totalGram ? protein / totalGram : 0;

    return (
        <div className="w-full text-left">
            <p className="opacity-50 text-sm mb-2">Your Record Today</p>
            <div>
                <div className="w-full flex gap-2 justify-around mb-2 mt-4">
                    <div className="flex flex-col text-center">
                        <div className="text-5xl font-bold">{calories}</div>
                        <p>kilocalories (kcal)</p>
                    </div>
                    <div className="flex flex-col justify-center text-sm">
                        <div className="flex items-center gap-2">
                            <div className="bg-chart-1 h-2 w-2 rounded-full"></div>
                            <div>
                                Fat <span className="font-bold">{fat}g</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-chart-2 h-2 w-2 rounded-full"></div>
                            <div>
                                Carbs{" "}
                                <span className="font-bold">{carbs} g</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-chart-3 h-2 w-2 rounded-full"></div>
                            <div>
                                Protein{" "}
                                <span className="font-bold">{protein} g</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-1 h-6 text-xs">
                    <div
                        style={{
                            width: `${
                                totalGram ? fatPercentage * 100 : 33.33
                            }%`,
                        }}
                        className="flex bg-chart-1 rounded-sm justify-center items-center"
                    >
                        {(fatPercentage >= 0.07 && (
                            <div className="z-50 font-bold">
                                {Math.round(fatPercentage * 100)}%
                            </div>
                        )) ||
                            (totalGram === 0 && (
                                <div className="z-50 font-bold">0%</div>
                            ))}
                    </div>
                    <div
                        style={{
                            width: `${
                                totalGram ? carbsPercentage * 100 : 33.33
                            }%`,
                        }}
                        className="flex bg-chart-2 rounded-sm justify-center items-center"
                    >
                        {(carbsPercentage >= 0.07 && (
                            <div className="z-50 font-bold">
                                {Math.round(carbsPercentage * 100)}%
                            </div>
                        )) ||
                            (totalGram === 0 && (
                                <div className="z-50 font-bold">0%</div>
                            ))}
                    </div>
                    <div
                        style={{
                            width: `${
                                totalGram ? proteinPercentage * 100 : 33.33
                            }%`,
                        }}
                        className="flex flex-col bg-chart-3 rounded-sm justify-center items-center"
                    >
                        {(proteinPercentage >= 0.07 && (
                            <div className="z-50 font-bold">
                                {Math.round(proteinPercentage * 100)}%
                            </div>
                        )) ||
                            (totalGram === 0 && (
                                <div className="z-50 font-bold">0%</div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
