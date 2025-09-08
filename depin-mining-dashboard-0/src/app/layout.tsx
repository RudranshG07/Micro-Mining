import type { Metadata } from "next";
import { Inter, Martian_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Micro Mining - Stacks Blockchain Mining Platform",
  description: "Earn real STX rewards through micro-mining on the Stacks blockchain. Register devices, commit BTC, and claim instant rewards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${martianMono.variable} antialiased font-mono`}
      >
        {children}
      </body>
    </html>
  );
}
