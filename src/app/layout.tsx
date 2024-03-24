import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeadMeta from "@/components/HeadMeta/HeadMeta";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MEI-DANCER",
  description: "NOT MAIN DANCER",
  openGraph: {
    images: ["https://mei.dance/ogImage.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <HeadMeta />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
