import { Parkinsans } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const parkinsans = Parkinsans({
    subsets: ["latin"],
});

export default async function Page() {
    return (
        <div className="flex justify-center">
            <div className="max-w-[400px] w-full">
                {/* <div className="absolute h-screen max-w-[400px] w-full flex flex-col justify-between items-center -z-50">
                    <div className="w-full">
                        <div className="h-60 w-40 bg-secondary rounded-r-full blur-3xl" />
                    </div>
                    <div className="w-full flex justify-end">
                        <div className="h-60 w-40 bg-secondary rounded-l-full blur-3xl" />
                    </div>
                </div> */}
                <div className="h-screen flex flex-col">
                    <header className="h-12 flex justify-between items-center p-4 fixed max-w-[400px] w-full backdrop-blur-sm z-50">
                        <div className="grid grid-cols-2 grid-rows-2 h-[22px] w-[21px] gap-[1px] hover:rotate-360 duration-150">
                            <div className="bg-primary row-span-2 rounded-xs" />
                            <div className="bg-primary rounded-full" />
                            <div className="bg-primary rounded-xs" />
                        </div>
                        <nav className="flex gap-2">
                            <Link href="/login">
                                <Button
                                    size="sm"
                                    variant="link"
                                    className="font-bold"
                                >
                                    Log In
                                </Button>
                            </Link>
                            <Link href="/signin">
                                <Button size="sm">Sign In</Button>
                            </Link>
                        </nav>
                    </header>
                    <main className="flex-1 flex flex-col justify-center items-center gap-6">
                        <img
                            className="max-w-3/4 rotate-360 duration-50000 active:rotate-0 active:duration-1000"
                            src="foods.svg"
                        />
                        <div className="text-center">
                            <div
                                className={`${parkinsans.className} font-bold text-7xl text-primary`}
                            >
                                loomeal
                            </div>
                            <h2 className="text-md font-bold text-primary">
                                Decode your meal. Elevate your health.
                            </h2>
                        </div>
                        <Button variant="special" className="font-extrabold">
                            Try loomeal Now
                        </Button>
                    </main>
                    <nav className="h-12 w-full bg-primary rounded-t-xl flex items-center">
                        <div className="flex w-full justify-around">
                            <div className="text-primary-foreground font-bold">
                                1
                            </div>
                            <div className="text-primary-foreground font-bold">
                                2
                            </div>
                            <div className="text-primary-foreground font-bold">
                                3
                            </div>
                            <div className="text-primary-foreground font-bold">
                                4
                            </div>
                        </div>
                    </nav>
                </div>
                <section className="h-80 w-full bg-primary flex justify-center items-center">
                    <h2 className="bg-secondary text-secondary-foreground font-bold py-2 px-4 rounded-lg">
                        addition
                    </h2>
                </section>
                <footer className="h-12 text-center bg-primary text-primary-foreground">
                    <div>Copyright</div>
                </footer>
            </div>
        </div>
    );
}
