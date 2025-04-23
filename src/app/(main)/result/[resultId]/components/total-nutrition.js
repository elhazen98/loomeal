export const TotalNutrition = ({ totalNutrition }) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="font-bold text-lg">Total Nutritions</div>
            <div>
                <div className="flex justify-between">
                    <div>Calories</div>
                    <div>{`${totalNutrition.calories.amount} kcal`}</div>
                </div>
                <div className="flex justify-between">
                    <div>Carbohydrate</div>
                    <div>{`${totalNutrition.carbohydrate.amount} g`}</div>
                </div>
                <div className="flex justify-between">
                    <div>Protein</div>
                    <div>{`${totalNutrition.protein.amount} g`}</div>
                </div>
                <div className="flex justify-between">
                    <div>Fat</div>
                    <div>{`${totalNutrition.fat.amount} g`}</div>
                </div>
                <div className="flex justify-between">
                    <div>Cholesterol</div>
                    <div>{`${totalNutrition.cholesterol.amount} mg`}</div>
                </div>
                <div className="flex justify-between">
                    <div>Fiber</div>
                    <div>{`${totalNutrition.fiber.amount} g`}</div>
                </div>
                <div className="flex justify-between">
                    <div>Sugar</div>
                    <div>{`${totalNutrition.sugar.amount} g`}</div>
                </div>
            </div>
        </div>
    );
};
