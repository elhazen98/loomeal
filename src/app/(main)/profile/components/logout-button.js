"use client";

import { useActionState } from "react";
import { logoutAction } from "./logout-action";
import { Button } from "@/components/ui/button";

export const LogoutButton = () => {
    const [state, formAction, pending] = useActionState(logoutAction, null);
    return (
        <form action={formAction}>
            <Button>Logout</Button>
        </form>
    );
};
