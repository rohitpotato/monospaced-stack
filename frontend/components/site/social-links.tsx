import type { LucideIcon } from 'lucide-react'
import { Github, Linkedin, Rss, Twitter, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const LINKS: { href: string, label: string, icon: LucideIcon, external?: boolean }[] = [
  { href: '/about', label: 'About', icon: User },
  { href: 'https://github.com/rohitpotato', label: 'GitHub', icon: Github, external: true },
  { href: 'https://www.linkedin.com/in/rohit-kashyap-a33a4716a/', label: 'LinkedIn', icon: Linkedin, external: true },
  { href: 'https://twitter.com/rohitpotato', label: 'Twitter', icon: Twitter, external: true },
  { href: '/rss.xml', label: 'RSS', icon: Rss },
]

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn('flex list-none flex-wrap gap-x-5 gap-y-2 p-0 font-sans text-sm', className)}>
      {LINKS.map(({ href, label, icon: Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            {...(external && { target: '_blank', rel: 'noopener noreferrer me' })}
            className="inline-flex items-center gap-1.5 py-1 text-inkSubtle transition-colors hover:text-accent"
          >
            <Icon size={15} aria-hidden="true" />
            {label}
          </a>
        </li>
      ))}
    </ul>
  )
}

export function SiteFooter() {
  return (
    <footer className="mt-16 flex flex-col gap-3 border-t border-divider pt-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="font-mono text-xs text-inkSubtle">
        <p>rohitpotato.xyz · served from a small k3s cluster</p>
        <p className="mt-1.5 flex gap-4">
          <a href="/projects" className="transition-colors hover:text-accent">Projects</a>
          <a href="/uses" className="transition-colors hover:text-accent">Uses</a>
        </p>
      </div>
      <SocialLinks />
    </footer>
  )
}
