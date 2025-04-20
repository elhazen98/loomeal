import Image from "next/image";

export const Header = ({ id, username, email }) => {
    return (
        <header className="h-12 flex justify-between items-center p-4 max-w-[400px] w-full backdrop-blur-sm z-50">
            <Image
                width={22}
                height={22}
                src="loomeal.svg"
                alt="loomeal.svg"
                className="hover:rotate-180 duration-200"
            />
            <div className="font-bold">{username}</div>
        </header>
    );
};
