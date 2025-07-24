import type { Metadata } from "next";
import Script from "next/script";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/header/header";

const mono = JetBrains_Mono({
  variable: "--font-jet-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rohitpotato.xyz"),
  title: {
    default: "Notes about web dev, infrastructure, and some other stuff.",
    template: "%s | Digital Backyard",
  },
  description:
    "A personal blog and portfolio showcasing software engineering, web development, and technical insights.",
  keywords: [
    "software engineering",
    "web development",
    "blog",
    "portfolio",
    "tech",
    "programming",
  ],
  authors: [{ name: "Rohit Kashyap" }],
  creator: "Rohit Kashyap",
  publisher: "Rohit Kashyap",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rohitpotato.xyz",
    siteName: "Digital Backyard",
    title: "Notes about web dev, infrastructure, and some other stuff.",
    description:
      "A personal blog and portfolio showcasing software engineering, web development, and technical insights.",
    images: [
      {
        url: "/favicon/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: "Digital Backyard - Personal Blog and Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Notes about web dev, infrastructure, and some other stuff.",
    description:
      "A personal blog and portfolio showcasing software engineering, web development, and technical insights.",
    creator: "@rohitpotato",
    images: ["/favicon/web-app-manifest-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon/favicon.svg",
        color: "#05FFCD",
      },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
    yahoo: "your-yahoo-verification",
    other: {
      me: ["your-email@domain.com"],
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        src="https://analytics.rohitpotato.xyz/script.js"
        data-website-id="94df3d9d-929c-4095-a309-ece2e6d5bbe1"
      />
      <body className={`${mono.variable} antialiased`}>
        <ThemeProvider>
          {<Header />}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
