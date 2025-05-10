import { Onest, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const onest = Onest({
    subsets: ["latin"],
});

export const metadata = {
    title: "Loomeal",
    description: "Look at Your Meal",
    icons: {
        icon: "/loomeal-icon.svg",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${onest.className} antialiased loomeal`}
            >
                {children}
            </body>
        </html>
    );
}
