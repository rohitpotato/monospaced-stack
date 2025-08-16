import React from 'react'
import Typography from '../typography'
import { cn } from '@/lib/utils'

interface MarkdownParagraphProps {
    children: React.ReactNode
    className?: string
}

export function MarkdownParagraph({ children, className, ...props }: MarkdownParagraphProps & React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <Typography
      variant="p"
      className={cn('text-gray-700 leading-relaxed mb-4', className)}
      {...props}
    >
      {children}
    </Typography>
  )
}
