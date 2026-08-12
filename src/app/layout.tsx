import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const PoppinsFont = Poppins({
  adjustFontFallback: false,
  display: "swap",
  fallback: [],
  preload: true,
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500"],
})

export const metadata: Metadata = {
  title: "Luna | Your game place",
  description: "placeholder",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
      <html lang="en" className={`${PoppinsFont.variable} ${PoppinsFont.variable}`}>
      <body>{children}</body>
      </html>
  );
}
