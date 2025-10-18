import React from 'react'
import { cn } from '@/lib/utils'

interface MarkdownListProps {
  children: React.ReactNode
  className?: string
  ordered?: boolean
}

export function MarkdownList({ children, className, ordered = false, ...props }: MarkdownListProps & React.HTMLAttributes<HTMLElement>) {
  const Component = ordered ? 'ol' : 'ul'

  return (
    <Component
      className={cn(
        'my-4 space-y-2 pl-6',
        ordered
          ? 'list-decimal'
          : 'list-disc',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

interface MarkdownListItemProps {
  children: React.ReactNode
  className?: string
}

export function MarkdownListItem({ children, className, ...props }: MarkdownListItemProps & React.LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li
      className={cn('text-gray-700 leading-relaxed', className)}
      {...props}
    >
      {children}
    </li>
  )
}
