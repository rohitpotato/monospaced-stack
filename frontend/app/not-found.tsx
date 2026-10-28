import type { Metadata } from 'next'
import Link from 'next/link'
import { DeliveryScene } from '@/components/not-found/delivery-scene'
import { SiteNav } from '@/components/site/site-nav'
import { SiteFooter } from '@/components/site/social-links'

export const metadata: Metadata = {
  title: 'Out for delivery',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] bg-page text-inkBody">
      <div className="mx-auto w-full max-w-[var(--layout-wide-max)] px-[var(--space-page-x)] pb-16">
        <SiteNav />
        <main className="flex flex-col items-center pt-10 text-center sm:pt-16">
          <p className="font-serif text-7xl font-medium text-ink sm:text-8xl">404</p>
          <h1 className="mt-4 font-serif text-2xl text-ink sm:text-3xl">This page is out for delivery.</h1>
          <p className="mt-3 font-mono text-xs text-inkSubtle sm:text-sm">ETA: ∞ · rider last seen near /thoughts</p>
          <DeliveryScene />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="rounded-full bg-accent px-5 py-2.5 font-sans text-sm font-medium text-[var(--color-on-accent)] transition-colors hover:bg-[var(--color-accent-strong)]">
              Back to the backyard
            </Link>
            <Link href="/archive" className="rounded-full border border-divider-strong px-5 py-2.5 font-sans text-sm text-ink transition-colors hover:bg-[var(--color-wash-hover)]">
              Browse the archive
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
