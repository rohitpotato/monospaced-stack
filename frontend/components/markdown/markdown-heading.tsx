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
    1: 'text-4xl font-semibold text-gray-900 mb-6 mt-8 font-serif',
    2: 'text-3xl font-semibold text-gray-900 mb-4 mt-6 font-serif',
    3: 'text-2xl font-semibold text-gray-900 mb-3 mt-5 font-serif',
    4: 'text-xl font-medium text-gray-900 mb-2 mt-4 font-serif',
    5: 'text-lg font-medium text-gray-900 mb-2 mt-4 font-serif',
    6: 'text-base font-medium text-gray-900 mb-2 mt-4 font-serif',
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
