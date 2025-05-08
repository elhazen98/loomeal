"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    IconKey,
    IconLoading,
    IconMail,
    IconPerson,
} from "@/components/ui/icons";
import Link from "next/link";
import { registerAction } from "./action";
import Image from "next/image";
import { Label } from "@/components/ui/label";

export default function Page() {
    const [state, formAction, pending] = useActionState(registerAction, {});

    return (
        <div className="flex justify-center">
            <div className="max-w-[400px] w-full">
                <main className="h-screen flex flex-col justify-center items-center">
                    <div className="w-4/5 pb-8">
                        <Image
                            width={50}
                            height={50}
                            src="/loomeal.svg"
                            alt="loomeal.svg"
                            className="hover:rotate-180 duration-200"
                        />
                    </div>
                    <div className="flex flex-col pb-8 text-left w-4/5 gap-4">
                        <div className="text-5xl font-extrabold text-primary">
                            Register
                        </div>
                        <div className="text-sm opacity-50">
                            {
                                "Create your account to access our personalized services and tools. It takes less than a minutes."
                            }
                        </div>
                    </div>
                    <form
                        action={formAction}
                        className="flex flex-col gap-6 w-4/5"
                    >
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    name="username"
                                    placeholder="Username"
                                    icon={<IconPerson />}
                                    disabled={pending}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    icon={<IconMail />}
                                    disabled={pending}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    icon={<IconKey />}
                                    disabled={pending}
                                />
                            </div>
                        </div>
                        <Button disabled={pending}>
                            {pending ? <IconLoading /> : "Register"}
                        </Button>
                    </form>
                    <div className="p-4 text-primary/50">
                        {"Already have an account?"}
                        <span>
                            <Link href="/signin">
                                <Button variant="link" className="p-2 text-md">
                                    Sign In
                                </Button>
                            </Link>
                        </span>
                    </div>
                    {!state?.success && (
                        <div className="text-red-500">{state?.message}</div>
                    )}
                    {state?.success && (
                        <div className="text-emerald-600">{state?.message}</div>
                    )}
                </main>
            </div>
        </div>
    );
}
