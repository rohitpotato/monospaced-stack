import React from 'react'
import { cn } from '@/lib/utils'

interface MarkdownParagraphProps {
  children: React.ReactNode
  className?: string
}

export function MarkdownParagraph({ children, className, ...props }: MarkdownParagraphProps & Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'>) {
  return (
    <p
      className={cn('text-gray-700 leading-relaxed mb-4', className)}
      {...props}
    >
      {children}
    </p>
  )
}
