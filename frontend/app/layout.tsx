import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./_context/ThemeProvider";
import InitThemeScript from "./InitThemeScript";
import Head from "next/head";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <InitThemeScript />
      </Head>
      <body className={`${spaceMono.variable}  antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
