"use client";

import { useActionState } from "react";
import { signinAction } from "./action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconKey, IconLoading, IconPerson } from "@/components/ui/icons";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { OauthButton } from "../components/oauth-button";

export default function Page() {
    const [state, formAction, pending] = useActionState(signinAction, {});

    return (
        <div className="flex justify-center">
            <div className="max-w-[400px] w-full">
                <main className="h-screen flex flex-col items-center pt-24">
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
                            Sign In
                        </div>
                        <div className="text-sm opacity-50">
                            {
                                "Stay informed about what's on your plate. Let us help you to make smarter food choices."
                            }
                        </div>
                    </div>
                    <form
                        action={formAction}
                        className="flex flex-col gap-6 w-4/5"
                    >
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    icon={<IconPerson />}
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
                            {pending ? <IconLoading /> : "Sign In"}
                        </Button>
                    </form>
                    <div className="w-4/5 pt-4">
                        <OauthButton />
                    </div>
                    <div className="p-4 text-primary/50">
                        {"Don't have an account?"}
                        <span>
                            <Link href="/register">
                                <Button variant="link" className="p-2 text-md">
                                    Register
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
