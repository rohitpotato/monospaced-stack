'use client'

import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { NAV_LINKS } from '@/components/site/site-nav'
import { cn } from '@/lib/utils'

// Sticky header for posts and About: the same wordmark and links as the home
// page nav, with a reading-progress line along the bottom edge.
export function ReaderHeader() {
  const pathname = usePathname()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-page/90 backdrop-blur-md">
      <div className="site-shell flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3.5">
        <Link href="/" className="font-serif text-lg font-medium text-ink transition-colors hover:text-accent">
          @rohitpotato
        </Link>
        <nav aria-label="Main" className="flex items-baseline gap-3.5 font-sans text-[13px] sm:gap-6 sm:text-sm">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? 'page' : undefined}
              className={cn(
                'text-inkSubtle transition-colors hover:text-ink',
                pathname === link.href && 'text-ink',
              )}
            >
              {link.label}
            </Link>
          ))}
          <a href="/rss.xml" className="text-inkSubtle transition-colors hover:text-ink">RSS</a>
        </nav>
      </div>
      <div className="h-px w-full bg-divider" aria-hidden="true">
        <div className="h-px bg-[var(--color-accent-cta)] transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>
    </header>
  )
}
