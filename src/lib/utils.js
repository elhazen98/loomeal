import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function roundTwoDec(num) {
    return Math.round(num * 100) / 100;
}

export function capitalize(str) {
    if (!str) return "";
    return str
        .split(" ")
        .map((word) => {
            const firstLetterIndex = word.search(/[a-zA-Z]/);
            if (firstLetterIndex === -1) return word;
            return (
                word.slice(0, firstLetterIndex) +
                word.charAt(firstLetterIndex).toUpperCase() +
                word.slice(firstLetterIndex + 1).toLowerCase()
            );
        })
        .join(" ");
}
