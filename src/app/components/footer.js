import { Parkinsans } from "next/font/google";

const parkinsans = Parkinsans({
    subsets: ["latin"],
});

export const Footer = () => {
    return (
        <footer className="h-12 flex justify-center items-center p-4 max-w-[400px] w-full">
            <div
                className={`flex ${parkinsans.className} text-sm text-primary/50`}
            >
                loomeal | 2025
            </div>
        </footer>
    );
};
