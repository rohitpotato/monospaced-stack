import React from 'react'
import Typography from '@/components/typography'
import { cn } from '@/lib/utils'

interface MarkdownStrongProps {
  children: React.ReactNode
  className?: string
}

export function MarkdownStrong({ children, className, ...props }: MarkdownStrongProps & React.HTMLAttributes<HTMLElement>) {
  return (
    <Typography
      as="strong"
      variant="body"
      // @ts-expect-error - TypographyColor is not defined
      color="text"
      className={cn('font-semibold', className)}
      {...props}
    >
      {children}
    </Typography>
  )
}
