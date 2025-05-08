import Image from "next/image";
import Link from "next/link";

export const Header = ({ username }) => {
    return (
        <header className="h-12 flex justify-between items-center p-4 max-w-[400px] w-full backdrop-blur-sm z-50">
            <Link href="/">
                <Image
                    width={22}
                    height={22}
                    src="loomeal.svg"
                    alt="loomeal.svg"
                    className="hover:rotate-180 duration-200"
                />
            </Link>
            <Link href="/profile">
                <div className="font-bold">{username}</div>
            </Link>
        </header>
    );
};
