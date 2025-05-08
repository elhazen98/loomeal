import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
    const session = await auth();

    if (session) {
        redirect("/dashboard");
    }

    return children;
}
