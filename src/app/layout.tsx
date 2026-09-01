import type {Metadata} from "next";
import {Poppins, ABeeZee} from "next/font/google";
import "@/styles/main.scss"

const PoppinsFont = Poppins({
    weight: ["100","200","300","400","500","600","700","800","900"],
    subsets: ["latin"],
    variable: "--font-poppins",
    preload: true,
    display: "swap",
});

const Abeezee = Poppins({
    weight: ["100","200","300","400","500","600","700","800","900"],
    subsets: ["latin"],
    variable: "--font-abeezee",
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
            className={`${PoppinsFont.variable} ${Abeezee.variable}`}
        >
        {children}
        </body>
        </html>
    );
}