import React from 'react'
import { cn } from '@/lib/utils'

interface MarkdownBlockquoteProps {
  children: React.ReactNode
  className?: string
}

export function MarkdownBlockquote({ children, className, ...props }: MarkdownBlockquoteProps & React.BlockquoteHTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn('my-6 italic leading-relaxed py-2', className)}
      {...props}
    >
      {children}
    </blockquote>
  )
}
