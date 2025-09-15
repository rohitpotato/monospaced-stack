import type React from 'react'
import { VT323 } from 'next/font/google'
import Script from 'next/script'
import Header from '@/components/header'
import { cn } from '@/lib/utils'
import './globals.css'

const vt323Font = VT323({ subsets: ['latin'], weight: ['400'] })

export const metadata = {
  title: {
    default: 'Digital Backyard',
    template: '%s | Digital Backyard',
  },
  description: 'Notes about web dev, infrastructure, and some other stuff.',
  metadataBase: new URL('https://rohitpotato.xyz'),
  alternates: {
    types: {
      'application/rss+xml': '/rss',
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  colorScheme: 'dark light',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#0f172a' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Digital Backyard',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rohitpotato.xyz',
    siteName: 'Digital Backyard',
    title: 'Digital Backyard',
    description: 'Notes about web dev, infrastructure, and some other stuff.',
    images: [
      {
        url: 'https://rohitpotato.xyz/api/og?title=Digital%20Backyard&description=Notes%20about%20web%20dev%2C%20infrastructure%2C%20and%20some%20other%20stuff.',
        width: 1200,
        height: 630,
        alt: 'Digital Backyard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@rohitpotato',
    creator: '@rohitpotato',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'Technology Blog',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'web development',
    'infrastructure',
    'technology',
    'programming',
    'software engineering',
    'blog',
    'tech insights',
    'full stack development',
    'devops',
    'cloud computing',
  ],
  authors: [{ name: 'Rohit' }],
  creator: 'Rohit',
  publisher: 'Digital Backyard',
  generator: 'Next.js',
  applicationName: 'Digital Backyard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://rohitpotato.xyz" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <Script defer src="https://analytics.rohitpotato.xyz/script.js" data-website-id="ba838c03-a5b0-4560-a1d8-72c4f18aa565" />
      </head>
      <body className={cn(vt323Font.className)}>
        <div className="min-h-screen max-w-7xl mx-auto">
          <div className="sticky top-0 z-50 bg-black">
            <Header />
          </div>
          <div className="mt-16">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
