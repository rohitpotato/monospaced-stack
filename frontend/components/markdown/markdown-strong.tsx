import React from 'react'
import { cn } from '@/lib/utils'
import Typography from '@/components/typography'

interface MarkdownStrongProps {
    children: React.ReactNode
    className?: string
}

export function MarkdownStrong({ children, className, ...props }: MarkdownStrongProps & React.HTMLAttributes<HTMLElement>) {
  return (
    <Typography
      as="strong"
      variant="body"
      color="text"
      className={cn('font-semibold', className)}
      {...props}
    >
      {children}
    </Typography>
  )
}
