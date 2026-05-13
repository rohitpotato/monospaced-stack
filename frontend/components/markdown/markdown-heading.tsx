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
    1: 'font-body text-[40px] leading-[46px] font-bold text-[var(--color-reading-ink)] mb-5 mt-10',
    2: 'font-body text-[36px] leading-[43px] font-bold text-[var(--color-reading-ink)] mb-4 mt-11',
    3: 'font-body text-[30px] leading-[36px] font-bold text-[var(--color-reading-ink)] mb-4 mt-10',
    4: 'font-body text-[26px] leading-[32px] font-bold text-[var(--color-reading-ink)] mb-3 mt-8',
    5: 'font-body text-[23px] leading-[29px] font-semibold text-[var(--color-reading-ink)] mb-3 mt-8',
    6: 'font-body text-[20px] leading-[26px] font-semibold text-[var(--color-reading-ink)] mb-3 mt-7',
  }

  const Component = `h${level}` as React.ElementType

  return (
    <Component
      className={cn('scroll-mt-24', headingClasses[level], className)}
      id={headingId}
      {...props}
    >
      {children}
    </Component>
  )
}
