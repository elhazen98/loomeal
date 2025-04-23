"use client";

import { useUser } from "../../components/user-provider";

export const UserCard = () => {
    const { id, username, email } = useUser();
    return (
        <div className="text-left w-full bg-secondary text-secondary-foreground rounded-lg p-4">
            <div className="flex flex-col gap-2">
                <div className="text-2xl font-bold">Hello, {username}</div>
                <p className="text-sm">
                    {
                        "Your health starts with your next bite. What's on your craving list today?"
                    }
                </p>
            </div>
        </div>
    );
};
