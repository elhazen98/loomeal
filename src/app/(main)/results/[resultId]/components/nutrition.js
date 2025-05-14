import { capitalize } from "@/lib/utils";

export const Nutrition = ({ nutritions }) => {
    return (
        <div className="p-4 bg-chart-1 rounded-xl">
            <div className="text-left flex flex-col gap-2">
                <div className="font-bold text-lg">Nutrition Breakdown</div>
                <div className="flex flex-col gap-4">
                    {nutritions.map((food, index) => (
                        <div key={index}>
                            <div className="font-bold flex justify-between">
                                <div>{capitalize(food.food)}</div>
                                <div>{capitalize(food.portion)}</div>
                            </div>
                            <div className="flex justify-between">
                                <div>Calories</div>
                                <div>{`${food.calories.amount} kcal`}</div>
                            </div>
                            <div className="flex justify-between">
                                <div>Carbohydrate</div>
                                <div>{`${food.carbohydrate.amount} g`}</div>
                            </div>
                            <div className="flex justify-between">
                                <div>Protein</div>
                                <div>{`${food.protein.amount} g`}</div>
                            </div>
                            <div className="flex justify-between">
                                <div>Fat</div>
                                <div>{`${food.fat.amount} g`}</div>
                            </div>
                            <div className="flex justify-between">
                                <div>Cholesterol</div>
                                <div>{`${food.cholesterol.amount} mg`}</div>
                            </div>
                            <div className="flex justify-between">
                                <div>Fiber</div>
                                <div>{`${food.fiber.amount} g`}</div>
                            </div>
                            <div className="flex justify-between">
                                <div>Sugar</div>
                                <div>{`${food.sugar.amount} g`}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
