import { cn } from '@/lib/utils'

export const FEATURED_IN = [
  { name: 'This Week in React', href: 'https://thisweekinreact.com/newsletter/305' },
  { name: 'TLDR Dev', href: 'https://tldr.tech/dev/2026-11-12' },
]

export function FeaturedIn({ className }: { className?: string }) {
  return (
    <p className={cn('font-sans text-sm text-inkSubtle', className)}>
      Featured in
      {' '}
      {FEATURED_IN.map((item, i) => (
        <span key={item.name}>
          {i > 0 && (i === FEATURED_IN.length - 1 ? ' and ' : ', ')}
          <a href={item.href} target="_blank" rel="noopener noreferrer" className="editorial-link">
            {item.name}
          </a>
        </span>
      ))}
    </p>
  )
}
