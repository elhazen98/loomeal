"use client";

import { RandomFunFact } from "@/lib/funfact";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Loading() {
    const [showTrivia, setShowTrivia] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTrivia(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full text-center gap-8">
            <div className="flex items-center">
                <Image
                    width={60}
                    height={60}
                    src="/loomeal.svg"
                    alt="loomeal.svg"
                    className="animate-spin"
                />
            </div>
            {showTrivia && (
                <div className="text-secondary-foreground bg-secondary p-4 w-full rounded-xl">
                    <div className="font-bold mb-4 text-xl">Food Trivia</div>
                    <div className="">
                        <RandomFunFact />
                    </div>
                </div>
            )}
        </div>
    );
}
