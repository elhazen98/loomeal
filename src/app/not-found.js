import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function NotFound() {
    return (
        <div className="flex justify-center">
            <div className="flex flex-col items-center justify-center max-w-[400px] min-h-screen w-full">
                <div className="flex flex-col gap-8 text-center max-w-4/5">
                    <div>
                        <div className="text-9xl font-extrabold">404</div>
                        <div className="text-sm opacity-50">
                            {
                                "this page doesn't exist. You may misstyped the address or the page may have moved"
                            }
                        </div>
                    </div>
                    <Link href="/">
                        <Button
                            className="w-full font-bold"
                            variant="secondary"
                        >
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
