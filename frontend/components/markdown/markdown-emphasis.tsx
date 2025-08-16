import React from 'react'
import { cn } from '@/lib/utils'

interface MarkdownEmphasisProps {
    children: React.ReactNode
    className?: string
}

export function MarkdownEmphasis({ children, className, ...props }: MarkdownEmphasisProps & React.HTMLAttributes<HTMLElement>) {
  return (
    <em className={cn('italic text-gray-800', className)} {...props}>
      {children}
    </em>
  )
}
