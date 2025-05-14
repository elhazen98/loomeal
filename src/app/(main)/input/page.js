"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, useState } from "react";
import { IconLoading, IconMinus, IconPlus } from "@/components/ui/icons";
import { getDataAction } from "./action";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [state, formAction, pending] = useActionState(getDataAction, {});
    const [context, setContext] = useState("");
    const [foods, setFoods] = useState([{ food: "", portion: "" }]);
    const [size, setSize] = useState(1);
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
        if (state.success && state.resultId) {
            setRedirecting(true);
            router.push(`/results/${state.resultId}`);
        }
    }, [state, router]);

    const handleContext = (value) => {
        setContext(value);
    };

    const handleChange = (index, field, value) => {
        const newFoods = [...foods];
        newFoods[index][field] = value;
        setFoods(newFoods);
    };

    const addFoods = () => {
        const newFoods = [...foods, { food: "", portion: "" }];
        setFoods(newFoods);
        setSize(newFoods.length);
    };

    const delFoods = (index) => {
        const newFoods = foods.filter((_, i) => i !== index);
        setFoods(newFoods);
        setSize(newFoods.length);
    };

    return (
        <div className="w-full h-full">
            <div className="text-2xl text-left font-extrabold mb-8">
                Record A Meal
            </div>
            <form action={formAction} className="flex flex-col gap-2 text-left">
                <div>
                    <div className="font-bold">
                        {"Tell us what you're eating."}
                    </div>
                    <div className="text-sm text-primary/50">
                        {"Helps us understand the purpose of your meal."}
                    </div>
                </div>
                <Input
                    className="mb-8"
                    name="context"
                    placeholder="breakfast, pre-workout, sahoor, etc."
                    value={context}
                    disabled={pending || redirecting}
                    onChange={(e) => handleContext(e.target.value)}
                />
                <div>
                    <div className="font-bold">{"What's on your plate?"}</div>
                    <div className="text-sm text-primary/50">
                        {"Add the food items you're about to eat, one by one."}
                    </div>
                </div>
                {foods.map((item, index) => (
                    <div className="relative" key={index}>
                        <div className="grid grid-rows-1 grid-cols-3 gap-2">
                            <Input
                                name={`food${index}`}
                                placeholder="Food Name"
                                value={item.food}
                                disabled={pending || redirecting}
                                onChange={(e) =>
                                    handleChange(index, "food", e.target.value)
                                }
                                className="col-span-2"
                            />
                            <Input
                                name={`portion${index}`}
                                placeholder="Portion"
                                value={item.portion}
                                disabled={pending || redirecting}
                                onChange={(e) =>
                                    handleChange(
                                        index,
                                        "portion",
                                        e.target.value
                                    )
                                }
                                className=""
                            />
                            {foods.length > 1 && (
                                <div className="absolute flex justify-end right-0 top-0">
                                    <button
                                        type="button"
                                        disabled={pending || redirecting}
                                        onClick={() => delFoods(index)}
                                        className="text-destructive text-xl"
                                    >
                                        <IconMinus />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {foods.length < 3 && (
                    <Button
                        type="button"
                        disabled={pending || redirecting}
                        onClick={addFoods}
                        variant="add"
                        className="font-bold"
                    >
                        <IconPlus /> Add Food
                    </Button>
                )}
                <input name="size" value={size} readOnly hidden />
                <Button
                    type="submit"
                    className="mt-8"
                    disabled={pending || redirecting}
                >
                    {pending ? (
                        <IconLoading />
                    ) : redirecting ? (
                        <div className="flex gap-2 items-center">
                            <IconLoading />
                            <div>Processing</div>
                        </div>
                    ) : (
                        "Submit"
                    )}
                </Button>
                {!state.success && (
                    <div className="text-red-500 transition-opacity duration-500 opacity-100 text-center">
                        {state?.message}
                    </div>
                )}
            </form>
        </div>
    );
}
