import { Parkinsans } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const parkinsans = Parkinsans({
    subsets: ["latin"],
});

export default async function Page() {
    return (
        <div className="flex justify-center">
            <div className="max-w-96 w-full">
                <div className="h-screen flex flex-col">
                    <header className="h-12 flex justify-between items-center p-4">
                        <div className="h-full w-4 bg-primary rounded-full"></div>
                        <nav className="flex gap-2">
                            <Link href="/login">
                                <Button size="sm">Log In</Button>
                            </Link>
                            <Link href="/signin">
                                <Button size="sm">Sign In</Button>
                            </Link>
                        </nav>
                    </header>
                    <main className="flex-1 flex flex-col justify-center items-center">
                        <div
                            className={`${parkinsans.className} font-bold text-7xl`}
                        >
                            loomeal
                        </div>
                        <h2 className="text-xl">know your meal, better.</h2>
                    </main>
                </div>
                <footer>
                    <p>Copyright</p>
                </footer>
            </div>
        </div>
    );
}
