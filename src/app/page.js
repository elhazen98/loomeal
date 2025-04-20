import { Parkinsans } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import Image from "next/image";
import Link from "next/link";

const parkinsans = Parkinsans({
    subsets: ["latin"],
});

export default async function Page() {
    return (
        <div className="flex justify-center">
            <div className="max-w-[400px] w-full h-screen flex flex-col">
                <Header />
                <div className="h-full flex justify-center items-center">
                    <main className="max-h-5/6 flex justify-center text-center">
                        <div className="flex flex-col justify-center items-center max-w-4/5 gap-10">
                            <div
                                className={`font-bold ${parkinsans.className} text-6xl`}
                            >
                                loomeal
                            </div>
                            <Image
                                width={0}
                                height={0}
                                src="foods.svg"
                                alt="foods.svg"
                                className="animate-spin w-full"
                                style={{ animationDuration: "50s" }}
                            />
                            <div>
                                <div className="font-extrabold text-3xl text-primary mb-2">
                                    {"Decode Your Meal,  Elevate Your Health."}
                                </div>
                                <div>
                                    {
                                        "Snap, track, and understand your meals with AI-powered nutrition analysis."
                                    }
                                </div>
                            </div>
                            <Link href={"/input"}>
                                <Button variant="special" className="font-bold">
                                    {"Try It Now, Free!"}
                                </Button>
                            </Link>
                        </div>
                    </main>
                </div>
                <Footer />
            </div>
        </div>
    );
}
