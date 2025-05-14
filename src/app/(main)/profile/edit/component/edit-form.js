"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { editProfileAction } from "./edit-action";
import { Textarea } from "@/components/ui/textarea";
import { IconLoading } from "@/components/ui/icons";
import { Label } from "@/components/ui/label";

export const EditForm = ({ user }) => {
    const [state, formAction, pending] = useActionState(editProfileAction, {});
    const username = user.name;
    const sex = user.sex;
    const age = user.age;
    const userContext = user.userContext;

    return (
        <div>
            <form action={formAction} className="flex flex-col gap-4">
                <div className="text-left flex flex-col gap-4">
                    <div>
                        <Label htmlFor="userName">Username</Label>
                        <Input
                            name="userName"
                            placeholder="Enter your sex"
                            defaultValue={username}
                            className="mt-2"
                            disabled={pending}
                        />
                    </div>
                    <div>
                        <Label htmlFor="userSex">Sex</Label>
                        <Input
                            name="userSex"
                            placeholder="Enter your sex"
                            defaultValue={sex}
                            className="mt-2"
                            disabled={pending}
                        />
                    </div>
                    <div>
                        <Label htmlFor="userAge">Age</Label>
                        <Input
                            name="userAge"
                            type="number"
                            placeholder="Enter your age"
                            defaultValue={age}
                            className="mt-2"
                            disabled={pending}
                        />
                    </div>
                    <div>
                        <Label htmlFor="userContext">Context</Label>
                        <Textarea
                            name="userContext"
                            placeholder="Enter your goals or health condition. like 'low fat diet', 'have diabetes type 1' etc,"
                            defaultValue={userContext}
                            className="mt-2"
                            disabled={pending}
                        />
                    </div>
                </div>
                <Button type="submit" className="w-full" disabled={pending}>
                    {pending ? <IconLoading /> : "Update"}
                </Button>
                {!state.success && (
                    <div className="text-red-500 transition-opacity duration-500 opacity-100 text-center">
                        {state?.message}
                    </div>
                )}
            </form>
        </div>
    );
};
