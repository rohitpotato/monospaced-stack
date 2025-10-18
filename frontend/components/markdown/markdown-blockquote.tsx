import React from 'react'
import { cn } from '@/lib/utils'

interface MarkdownBlockquoteProps {
  children: React.ReactNode
  className?: string
}

export function MarkdownBlockquote({ children, className, ...props }: MarkdownBlockquoteProps & React.BlockquoteHTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn('my-6 italic text-gray-600 leading-relaxed border-l-4 border-gray-300 pl-4 py-2', className)}
      {...props}
    >
      {children}
    </blockquote>
  )
}
