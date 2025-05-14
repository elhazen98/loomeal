"use client";

import { useActionState } from "react";
import { logoutAction } from "./logout-action";
import { Button } from "@/components/ui/button";
import { IconLoading } from "@/components/ui/icons";

export const LogoutButton = () => {
    const [state, formAction, pending] = useActionState(logoutAction, null);
    return (
        <form action={formAction}>
            <Button disabled={pending} className="w-full font-bold">
                {pending ? <IconLoading /> : "Logout"}
            </Button>
        </form>
    );
};
