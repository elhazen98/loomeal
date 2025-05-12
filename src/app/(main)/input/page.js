"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState, useState } from "react";
import { IconLoading } from "@/components/ui/icons";
import { getDataAction } from "./action";
import { useUser } from "../components/user-provider";
import { useRouter } from "next/router";

export default function Page() {
    const router = useRouter();
    const { id } = useUser();
    const [state, formAction, pending] = useActionState(getDataAction, {});
    const [context, setContext] = useState("");
    const [foods, setFoods] = useState([{ food: "", portion: "" }]);
    const [size, setSize] = useState(1);

    useEffect(() => {
        if (state.success && state.resultId) {
            router.push(`/result/${state.resultId}`);
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
                <input name="userId" defaultValue={id} hidden />
                <div>
                    <div className="font-bold">
                        {"Tell Us What You're Eating"}
                    </div>
                    <div className="text-sm text-primary/50">
                        {"Helps us understand the purpose of your meal."}
                    </div>
                </div>
                <Input
                    className="mb-8"
                    name="context"
                    placeholder="Meal Context. (e.g., breakfast, pre-workout)"
                    value={context}
                    onChange={(e) => handleContext(e.target.value)}
                />
                <div>
                    <div className="font-bold">{"What's on Your Plate?"}</div>
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
                                onChange={(e) =>
                                    handleChange(index, "food", e.target.value)
                                }
                                className="col-span-2"
                            />
                            <Input
                                name={`portion${index}`}
                                placeholder="Portion"
                                value={item.portion}
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
                                <div className="absolute flex justify-end right-0 bottom-1/2 h-1/2">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => delFoods(index)}
                                        className="h-full px-1.5"
                                    >
                                        -
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {foods.length < 5 && (
                    <Button
                        type="button"
                        onClick={addFoods}
                        variant="add"
                        className="font-bold"
                    >
                        +
                    </Button>
                )}
                <input name="size" value={size} readOnly hidden />
                <Button type="submit" className="mt-8">
                    {pending ? <IconLoading /> : "Submit"}
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
