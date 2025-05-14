"use client";

import {
    IconFolder,
    IconHome,
    IconPencil,
    IconPerson,
} from "@/components/ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BottomNavbar = () => {
    const pathName = usePathname();
    const navItems = [
        { href: "/home", icon: <IconHome />, name: "Home" },
        { href: "/input", icon: <IconPencil />, name: "Input" },
        { href: "/results", icon: <IconFolder />, name: "Results" },
        { href: `/profile`, icon: <IconPerson />, name: "Profile" },
    ];
    return (
        <div className="p-2">
            <nav className="flex justify-around items-center h-12 bg-primary w-full rounded-full backdrop-blur-lg">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`text-xs flex flex-col items-center gap-0.5 text-bold ${
                            pathName.startsWith(item.href)
                                ? "text-secondary scale-110 duration-150"
                                : "text-primary-foreground"
                        }`}
                    >
                        <div>{item.icon}</div>
                        <div>{item.name}</div>
                    </Link>
                ))}
            </nav>
        </div>
    );
};
