import React from 'react'
import { cn } from '@/lib/utils'

interface MarkdownStrongProps {
  children: React.ReactNode
  className?: string
}

export function MarkdownStrong({ children, className, ...props }: MarkdownStrongProps & React.HTMLAttributes<HTMLElement>) {
  return (
    <strong
      className={cn('font-semibold text-gray-900', className)}
      {...props}
    >
      {children}
    </strong>
  )
}
