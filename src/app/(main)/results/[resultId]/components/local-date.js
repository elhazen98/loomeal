"use client";

export const LocalDate = ({ date }) => {
    const localDate = new Date(date).toLocaleDateString(undefined, {
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    return <div>{localDate}</div>;
};
