import React from 'react'
import Typography from '../typography'
import { cn } from '@/lib/utils'

interface MarkdownHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  id?: string
  className?: string
}

const headingStyles = {
  1: 'text-4xl font-bold text-gray-900 mb-6 mt-8 scroll-mt-24',
  2: 'text-3xl font-bold text-gray-900 mb-5 mt-7 scroll-mt-24',
  3: 'text-2xl font-semibold text-gray-800 mb-4 mt-6 scroll-mt-24',
  4: 'text-xl font-semibold text-gray-800 mb-3 mt-5 scroll-mt-24',
  5: 'text-lg font-medium text-gray-700 mb-2 mt-4 scroll-mt-24',
  6: 'text-base font-medium text-gray-700 mb-2 mt-4 scroll-mt-24',
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
  const headingProps = {
    id: headingId,
    className: cn(headingStyles[level], className),
    ...props
  }

  switch (level) {
    case 1:
      return <h1 {...headingProps}>{children}</h1>
    case 2:
      return <h2 {...headingProps}>{children}</h2>
    case 3:
      return <h3 {...headingProps}>{children}</h3>
    case 4:
      return <h4 {...headingProps}>{children}</h4>
    case 5:
      return <h5 {...headingProps}>{children}</h5>
    case 6:
      return <h6 {...headingProps}>{children}</h6>
    default:
      return <h2 {...headingProps}>{children}</h2>
  }
}
