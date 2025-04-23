import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Header } from "./components/header";
import UserProvider from "./components/user-provider";
import { Footer } from "../components/footer";

export default async function Layout({ children }) {
    const session = await auth();

    if (!session) {
        redirect("/signin");
    }

    const user = {
        id: session.user.id,
        username: session.user.name,
        email: session.user.email,
    };

    return (
        <div className="flex justify-center">
            <div className="flex flex-col items-center max-w-[400px] min-h-screen w-full">
                <Header
                    id={user.id}
                    username={user.username}
                    email={user.email}
                />
                <div className="flex-1 justify-center w-4/5 items-center text-center">
                    <UserProvider user={user}>{children}</UserProvider>
                </div>

                <Footer />
            </div>
        </div>
    );
}
