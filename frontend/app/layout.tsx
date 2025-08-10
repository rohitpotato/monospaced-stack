import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/lib/theme-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Digital Backyard",
  description: "Notes about web dev, infrastructure, and some other stuff.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
