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
        { href: "/dashboard", icon: <IconHome /> },
        { href: "/input", icon: <IconPencil /> },
        { href: "/result", icon: <IconFolder /> },
        { href: "/profile", icon: <IconPerson /> },
    ];
    return (
        <div className="p-2">
            <nav className="flex justify-around items-center h-12 bg-primary w-full rounded-lg backdrop-blur-lg">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`text-sm {} ${
                            pathName.startsWith(item.href)
                                ? "text-secondary scale-150 duration-150"
                                : "text-primary-foreground"
                        }`}
                    >
                        {item.icon}
                    </Link>
                ))}
            </nav>
        </div>
    );
};
