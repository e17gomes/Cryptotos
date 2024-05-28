import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./Components/NavBar";
import BackgroundDn from "./Components/Background";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cryptotos",
  description: "My project for  the cryptocoins market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar/>
        {/* <BackgroundDn/> */}
        {children}</body>
    </html>
  );
}
