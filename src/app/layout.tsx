import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AfriHeadshot Studio — Turn your selfies into professional headshots",
  description: "Free high-resolution AI studio headshot generator for African executives and professionals.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${inter.className} h-full antialiased font-sans`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
