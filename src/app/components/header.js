import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
    return (
        <header className="h-12 flex justify-between items-center p-4 max-w-[400px] w-full">
            <div className="flex gap-2 items-center">
                <Image
                    width={22}
                    height={22}
                    src="loomeal.svg"
                    alt="loomeal.svg"
                    className="hover:rotate-180 duration-200"
                />
            </div>
            <nav className="flex gap-2">
                <Link href="/signin">
                    <Button size="sm" variant="link" className="font-bold">
                        Sign In
                    </Button>
                </Link>
                <Link href="/register">
                    <Button size="sm">Register</Button>
                </Link>
            </nav>
        </header>
    );
};
