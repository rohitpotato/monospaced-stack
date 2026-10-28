import type { Metadata, Viewport } from 'next'
import type React from 'react'
import { ViewTransitions } from 'next-view-transitions'
import { Inter, JetBrains_Mono, Newsreader } from 'next/font/google'
import { Toaster } from 'sonner'
import App from '@/_app'
import GoatCounter from '@/components/goatcounter'
import { SITE } from '@/lib/site'
import { cn } from '@/lib/utils'
import './globals.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-display-serif',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ui-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-code-mono',
})

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SITE.name,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE.handle,
    creator: SITE.handle,
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: SITE.author, url: SITE.url }],
  creator: SITE.author,
  applicationName: SITE.name,
}

// Pinch-zoom stays enabled: no maximumScale or userScalable here.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: SITE.themeColor,
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(newsreader.variable, inter.variable, jetbrainsMono.variable, 'font-body')}>
          <div className="min-h-screen">
            <App>{children}</App>
          </div>
          <GoatCounter />
          <Toaster theme="dark" position="bottom-center" />
        </body>
      </html>
    </ViewTransitions>
  )
}
