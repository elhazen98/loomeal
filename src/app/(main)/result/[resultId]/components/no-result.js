import { Button } from "@/components/ui/button";
import Link from "next/link";

export const NoResult = () => {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className="flex flex-col text-center gap-8">
                <div className="flex flex-col gap-2">
                    <div className="font-extrabold text-5xl">NO RESULT</div>
                    <div className="text-sm opacity-50">
                        {
                            "We couldn’t find the result — it may have been deleted or was never created."
                        }
                    </div>
                </div>
                <Link href="/result">
                    <Button className="w-full font-bold" variant="secondary">
                        See all result here
                    </Button>
                </Link>
            </div>
        </div>
    );
};
