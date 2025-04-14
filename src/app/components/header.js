import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Header = () => {
    return (
        <header className="h-12 flex justify-between items-center p-4 max-w-[400px] w-full">
            <div className="flex gap-2 items-center">
                <div className="grid grid-cols-2 grid-rows-2 h-[22px] w-[21px] gap-[1px] hover:rotate-360 duration-150">
                    <div className="bg-primary row-span-2 rounded-xs" />
                    <div className="bg-primary rounded-full" />
                    <div className="bg-primary rounded-xs" />
                </div>
            </div>
            <nav className="flex gap-2">
                <Link href="/signin">
                    <Button size="sm" variant="link" className="font-bold">
                        Sign In
                    </Button>
                </Link>
                <Link href="/signup">
                    <Button size="sm">Sign Up</Button>
                </Link>
            </nav>
        </header>
    );
};
