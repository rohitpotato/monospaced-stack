import React from 'react'
import { cn } from '@/lib/utils'

interface MarkdownHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  id?: string
  className?: string
}

export function MarkdownHeading({ level, children, id, className, ...props }: MarkdownHeadingProps & React.HTMLAttributes<HTMLHeadingElement>) {
  // Generate ID from children text if not provided
  const generateId = (text: React.ReactNode): string => {
    if (typeof text === 'string') {
      return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }
    return ''
  }

  const headingId = id || generateId(children)

  const headingClasses = {
    1: 'font-display text-[1.85rem] leading-[1.2] font-medium tracking-[-0.015em] text-accent mb-5 mt-10',
    2: 'font-display text-[1.55rem] leading-[1.25] font-medium tracking-[-0.015em] text-accent mb-4 mt-11',
    3: 'font-body text-[1.25rem] leading-[1.3] font-medium text-accent mb-4 mt-10',
    4: 'font-body text-[1.1rem] leading-[1.35] font-medium text-accent mb-3 mt-8',
    5: 'font-body text-[1rem] leading-[1.4] font-medium text-accent mb-3 mt-8',
    6: 'font-body text-[0.95rem] leading-[1.4] font-medium text-accent mb-3 mt-7',
  }

  const Component = `h${level}` as React.ElementType

  return (
    <Component
      className={cn('group/heading scroll-mt-24', headingClasses[level], className)}
      id={headingId}
      {...props}
    >
      {children}
      {headingId && level >= 2 && level <= 4 && (
        <a
          href={`#${headingId}`}
          aria-label="Link to this section"
          data-heading-anchor=""
          className="ml-2 font-mono text-[0.7em] text-inkSubtle no-underline opacity-0 transition-opacity group-hover/heading:opacity-100 focus-visible:opacity-100 hover:text-accent"
        >
          #
        </a>
      )}
    </Component>
  )
}
