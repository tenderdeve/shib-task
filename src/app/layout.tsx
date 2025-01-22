import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { NFTDataProvider } from "./context/NFTDataContext";

const lexend = Lexend({
  variable: "--font--poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shiba Inu Test Task",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lexend.variable} antialiased bg-gradient-to-t from-[#121212] from-1% to-[#133d84] to-99%`}
      >
        <NFTDataProvider>{children}</NFTDataProvider>
      </body>
    </html>
  );
}
