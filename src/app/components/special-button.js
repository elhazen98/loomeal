"use client";

import { Button } from "@/components/ui/button";
import { IconLoading } from "@/components/ui/icons";
import { useState } from "react";

export const SpecialButton = ({ text, variant }) => {
    const [isLoading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
    };

    return (
        <Button
            onClick={handleClick}
            disabled={isLoading}
            variant={variant}
            className="w-full font-bold"
        >
            {isLoading ? <IconLoading /> : text}
        </Button>
    );
};
