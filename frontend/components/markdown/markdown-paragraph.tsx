import React from 'react'
import { cn } from '@/lib/utils'

interface MarkdownParagraphProps {
  children: React.ReactNode
  className?: string
}

export function MarkdownParagraph({ children, className, ...props }: MarkdownParagraphProps & Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'>) {
  return (
    <p
      className={cn('mb-6 text-[var(--color-reading-ink)]', className)}
      {...props}
    >
      {children}
    </p>
  )
}
