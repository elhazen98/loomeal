import { Header } from "./components/header";
import { Footer } from "./components/footer";
import Image from "next/image";
import Link from "next/link";
import { Parkinsans } from "next/font/google";
import { SpecialButton } from "./components/special-button";

const parkinsans = Parkinsans({
    subsets: ["latin"],
});

export default async function Page() {
    return (
        <div className="flex justify-center">
            <div className="max-w-[400px] w-full min-h-screen flex flex-col justify-between">
                <Header />
                <div className="my-12">
                    <main className="flex justify-center text-center flex-grow">
                        <div className="flex flex-col items-center max-w-4/5 gap-10">
                            <div
                                className={`font-bold ${parkinsans.className} text-6xl`}
                            >
                                loomeal
                            </div>
                            <Image
                                width={80}
                                height={80}
                                src="/foods.svg"
                                alt="foods.svg"
                                className="animate-spin w-full"
                                style={{ animationDuration: "50s" }}
                            />
                            <div className="flex flex-col gap-4">
                                <div className="font-extrabold text-3xl text-primary">
                                    {"Decode Your Meal,  Elevate Your Health."}
                                </div>
                                <div>
                                    {
                                        "Snap, track, and understand your meals with AI-powered nutrition analysis."
                                    }
                                </div>
                            </div>
                            <Link href={"/input"} className="w-4/5">
                                <SpecialButton
                                    text={"Try it Now, Free!"}
                                    variant="special"
                                />
                            </Link>
                        </div>
                    </main>
                </div>
                <Footer />
            </div>
        </div>
    );
}
