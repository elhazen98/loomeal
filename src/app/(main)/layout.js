import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Header } from "./components/header";
import UserProvider from "./components/user-provider";
import { BottomNavbar } from "./components/bottom-navbar";

export default async function Layout({ children }) {
    const session = await auth();

    if (!session) {
        redirect("/signin");
    }

    const user = {
        id: session.user.id,
        username: session.user.name,
        email: session.user.email,
        sex: session.user.sex,
        age: session.user.age,
        userContext: session.user.userContext,
    };

    return (
        <div className="flex justify-center">
            <div className="flex flex-col items-center max-w-[400px] min-h-screen w-full gap-8">
                <Header
                    id={user.id}
                    username={user.username}
                    email={user.email}
                />
                <div className="flex-1 justify-center w-4/5 items-center text-center">
                    <UserProvider user={user}>{children}</UserProvider>
                </div>
                <div className="h-12"></div>
                <div className="fixed max-w-[400px] w-full bottom-0 z-50">
                    <BottomNavbar />
                </div>
            </div>
        </div>
    );
}
