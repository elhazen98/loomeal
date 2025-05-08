"use client";

import { useActionState } from "react";
import { editProfileAction } from "./action";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useUser } from "../../components/user-provider";

export default function Page() {
    const { id, username, email, sex, age, userContext } = useUser();
    const [state, formAction, pending] = useActionState(editProfileAction, {});
    return (
        <div>
            <div>
                <div>{username}</div>
                <div>{id}</div>
            </div>
            <form action={formAction}>
                <input name="userId" defaultValue={id} hidden />
                <Input
                    name="userSex"
                    placeholder="Enter your sex"
                    defaultValue={sex}
                />
                <Input
                    name="userAge"
                    type="number"
                    placeholder="Enter your age"
                    defaultValue={age}
                />
                <Textarea
                    name="userContext"
                    placeholder="Enter your goals or health condition. like 'low fat diet', 'have diabetes type 1' etc,"
                    defaultValue={userContext}
                />
                <Button type="submit">Update</Button>
            </form>
        </div>
    );
}
