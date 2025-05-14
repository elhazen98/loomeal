import Link from "next/link";
import { LogoutButton } from "./edit/component/logout-button";
import { prisma } from "@/util/prisma";
import { auth } from "@/lib/auth";
import { SpecialButton } from "@/app/components/special-button";

export default async function Page() {
    const session = await auth();

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
    });

    const username = user.name;
    const sex = user.sex ? user.sex : "sex";
    const age = user.age ? user.age : "age";
    const userContext = user.userContext
        ? user.userContext
        : "Edit profile to set your personal context.";

    return (
        <div className="flex flex-col gap-6">
            <div className="text-2xl text-left font-extrabold">Profile</div>
            <div className="flex flex-col gap-2 bg-secondary text-secondary-foreground p-4 rounded-lg">
                <div className="text-left">
                    <div className="font-bold text-xl">{username}</div>
                    <div className="flex gap-1">
                        <div
                            className={`text-sm ${
                                !user.sex ? "opacity-50 italic" : ""
                            }`}
                        >
                            {sex},
                        </div>
                        <div
                            className={`text-sm ${
                                !user.age ? "opacity-50 italic" : ""
                            }`}
                        >
                            {age}
                        </div>
                    </div>
                </div>
                <div
                    className={`text-left ${
                        !user.userContext ? "opacity-50 italic" : ""
                    }`}
                >
                    {userContext}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Link href={`/profile/edit`}>
                    <SpecialButton text="Edit Profile" />
                </Link>
                <LogoutButton />
            </div>
        </div>
    );
}
