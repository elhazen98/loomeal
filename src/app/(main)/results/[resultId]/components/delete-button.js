"use client";

import { useActionState } from "react";
import { deleteResultAction } from "./delete-action";
import { Button } from "@/components/ui/button";
import { IconLoading } from "@/components/ui/icons";

export const DeleteResultButton = ({ resultId }) => {
    const [state, formAction, pending] = useActionState(
        deleteResultAction,
        null
    );

    return (
        <form action={formAction}>
            <input name="resultId" defaultValue={resultId} hidden />
            <Button
                type="submit"
                className="w-full font-bold"
                disabled={pending}
            >
                {pending ? <IconLoading /> : "Delete"}
            </Button>
        </form>
    );
};
