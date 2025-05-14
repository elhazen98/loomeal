import { SpecialButton } from "@/app/components/special-button";
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
                    <SpecialButton text="See all result here" />
                </Link>
            </div>
        </div>
    );
};
