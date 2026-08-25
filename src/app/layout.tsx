import type {Metadata} from "next";
import {Geist, Geist_Mono, Poppins} from "next/font/google";
import "@/styles/main.scss"

const PoppinsFont = Poppins({
    weight: ["100","200","300","400","500","600","700","800","900"],
    subsets: ["latin"],
    variable: "--font-poppins",
    preload: true,
    display: "swap",
});

export const metadata: Metadata = {
    title: "Luna | Your game place",
    description: "placeholder",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-br">
        <head>
            <meta
                name="keywords"
            />
        </head>
        <body
            className={`${PoppinsFont.variable}`}
        >
        {children}
        </body>
        </html>
    );
}