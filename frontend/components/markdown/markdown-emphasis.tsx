import React from 'react'
import { cn } from '@/lib/utils'
import Typography from '@/components/typography'

interface MarkdownEmphasisProps {
    children: React.ReactNode
    className?: string
}

export function MarkdownEmphasis({ children, className, ...props }: MarkdownEmphasisProps & React.HTMLAttributes<HTMLElement>) {
  return (
    <Typography
      as="em"
      variant="body"
      color="text"
      className={cn('italic', className)}
      {...props}
    >
      {children}
    </Typography>
  )
}
