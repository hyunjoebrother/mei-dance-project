import type { Metadata } from "next";
import Head from "next/head";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MEI-DANCER",
  description: "NOT MAIN DANCER",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="https://mei.dance/logo.png" />
        <link rel="shortcut icon" href="https://mei.dance/favicon.ico" />
        <link rel="apple-touch-icon" href="https://mei.dance/logo.png" />
        <link rel="canonical" href="https://mei.dance" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta property="og:type" content="website" />
        <meta name="title" content="MEI-DANCER" />
        <meta name="description" content="NOT MAIN DANCER" />
        <meta
          name="Keywords"
          content="kpop, 케이팝, 커버댄스, dance, choreography"
        />
        <meta name="author" content="MEI" />
        <meta property="og:image" content="https://mei.dance/ogImage.png" />
        <meta property="og:title" content="MEI-DANCER" />
        <meta property="og:description" content="NOT MAIN DANCER" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content="https://mei.dance/ogImage.png" />
        <meta name="twitter:title" content="MEI-DANCER" />
        <meta name="twitter:description" content="NOT MAIN DANCER" />
        <meta name="twitter:url" content="https://mei.dance/" />
        <meta name="twitter:site" content="@DevDance.Mei" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
