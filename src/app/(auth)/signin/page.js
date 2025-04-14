"use client";

import { useActionState } from "react";
import { loginAction } from "./action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Page() {
    const [state, formAction, pending] = useActionState(loginAction, {});

    return (
        <div className="flex justify-center">
            <div className="max-w-[400px] w-full">
                <main className="h-screen flex flex-col justify-center items-center">
                    <div className="flex flex-col pb-12 text-center gap-2">
                        <div className="text-5xl font-extrabold text-primary">
                            Sign In
                        </div>
                        <div className="text-sm">
                            {"Stay informed about what's on your plate"}
                        </div>
                    </div>
                    <form className="flex flex-col gap-24 w-4/5">
                        <div className="flex flex-col gap-2">
                            <Input type="email" placeholder="Email" />
                            <Input type="password" placeholder="Password" />
                        </div>
                        <Button>Sign In</Button>
                    </form>
                    <div className="p-4 text-primary/50">
                        {"Don't have an account? Sign Up?"}
                    </div>
                </main>
            </div>
        </div>
    );
}
