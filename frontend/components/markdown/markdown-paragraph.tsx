import React from 'react'
import Typography from '@/components/typography'
import { cn } from '@/lib/utils'

interface MarkdownParagraphProps {
    children: React.ReactNode
    className: string
}

export function MarkdownParagraph({ children, className, ...props }: MarkdownParagraphProps & Omit< React.HTMLAttributes<HTMLParagraphElement>, 'color'>) {
  return (
    <Typography
      variant="body"
      className={cn('leading-relaxed mb-4', className)}
      {...props}
    >
      {children}
    </Typography>
  )
}
