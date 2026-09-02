import type {Metadata} from "next";
import {Geist, Geist_Mono, Poppins, Archivo_Narrow} from "next/font/google";
import "@/styles/main.scss"

const PoppinsFont = Poppins({
    weight: ["100","200","300","400","500","600","700","800","900"],
    subsets: ["latin"],
    variable: "--font-poppins",
    preload: true,
    display: "swap",
});

const archivoNarrow = Archivo_Narrow({
    subsets: ["latin"],
    weight: ["600"],
    variable: "--font-archivo-narrow",
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
            className={`${PoppinsFont.variable} ${archivoNarrow.variable}`}
        >
        {children}
        </body>
        </html>
    );
}