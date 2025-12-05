import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Samkit Jain | Software Developer",
  description: "Portfolio of Samkit Jain - Android, Web, and ML Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          inter.variable,
          outfit.variable,
          "font-sans min-h-screen bg-background text-white antialiased"
        )}
      >
        {children}
      </body>
    </html>
  );
}
