'use client'

import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '/', label: 'Writing' },
  { href: '/archive', label: 'Archive' },
  { href: '/homelab', label: 'Homelab' },
]

export function SiteNav() {
  const pathname = usePathname()

  return (
    <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 py-6 sm:py-8">
      <Link href="/" className="font-serif text-xl font-medium text-ink sm:text-2xl">
        @rohitpotato
      </Link>
      <nav aria-label="Main" className="flex items-baseline gap-3.5 font-sans text-[13px] sm:gap-6 sm:text-sm">
        {LINKS.map(link => (
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
    </header>
  )
}
