import React from 'react'
import { cn } from '@/lib/utils'
import Typography from '@/components/typography'

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
  const variantMap = {
    1: 'h1' as const,
    2: 'h2' as const,
    3: 'h3' as const,
    4: 'h4' as const,
    5: 'h5' as const,
    6: 'h6' as const,
  }

  const marginClasses = {
    1: 'mb-6 mt-8',
    2: 'mb-5 mt-7',
    3: 'mb-4 mt-6',
    4: 'mb-3 mt-5',
    5: 'mb-2 mt-4',
    6: 'mb-2 mt-4',
  }

  return (
    <Typography
      variant={variantMap[level]}
      color="text"
      className={cn('scroll-mt-24', marginClasses[level], className)}
      id={headingId}
      {...props}
    >
      {children}
    </Typography>
  )
}
