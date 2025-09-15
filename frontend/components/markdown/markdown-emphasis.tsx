import React from 'react'
import Typography from '@/components/typography'
import { cn } from '@/lib/utils'

interface MarkdownEmphasisProps {
  children: React.ReactNode
  className?: string
}

export function MarkdownEmphasis({ children, className, ...props }: MarkdownEmphasisProps & React.HTMLAttributes<HTMLElement>) {
  return (
    <Typography
      as="em"
      variant="body"
      // @ts-expect-error - TypographyColor is not defined
      color="text"
      className={cn('italic', className)}
      {...props}
    >
      {children}
    </Typography>
  )
}
