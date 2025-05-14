"use client";

import { Button } from "@/components/ui/button";
import {
    IconDislike,
    IconLike,
    IconLoading,
    IconOk,
} from "@/components/ui/icons";
import { capitalize } from "@/lib/utils";
import { useState } from "react";

export const ResultButton = ({ variant, context, totalCalories, score }) => {
    const [isLoading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
    };

    return (
        <Button
            onClick={handleClick}
            disabled={isLoading}
            variant={variant}
            className="w-full font bold"
        >
            {isLoading ? (
                <IconLoading />
            ) : (
                <div className="w-full flex justify-between">
                    <div>{capitalize(context)}</div>
                    <div className="flex gap-2 items-center">
                        <div>{`${totalCalories} Kcal`}</div>
                        <div>
                            {score === 1 && <IconDislike />}
                            {score === 2 && <IconOk />}
                            {score === 3 && <IconLike />}
                        </div>
                    </div>
                </div>
            )}
        </Button>
    );
};
