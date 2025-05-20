"use client";

import { Button } from "@/components/ui/button";
import { IconGoogle, IconLoading } from "@/components/ui/icons";
import { useActionState } from "react";
import { continueWithGoogleAction } from "./oauth-action";

export const OauthButton = () => {
    const [state, formAction, pending] = useActionState(
        continueWithGoogleAction
    );

    const handleClick = () => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        document.cookie = `timezone=${timezone}`;
    };

    return (
        <form action={formAction}>
            <Button
                type="submit"
                onClick={handleClick}
                className="w-full bg-neutral-100 hover:border hover:border-primary hover:bg-neutral-100 text-primary items-center justify-center"
                disabled={pending}
            >
                {pending ? (
                    <IconLoading />
                ) : (
                    <div className="flex gap-2">
                        <IconGoogle />
                        <div>Continue with Google</div>
                    </div>
                )}
            </Button>
        </form>
    );
};
