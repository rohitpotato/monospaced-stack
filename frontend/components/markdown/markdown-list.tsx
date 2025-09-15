import React from 'react'
import Typography from '@/components/typography'
import Window from '@/components/window'
import { cn } from '@/lib/utils'

interface MarkdownListProps {
  children: React.ReactNode
  className?: string
  ordered?: boolean
}

export function MarkdownList({ children, className, ordered = false, ...props }: MarkdownListProps & React.HTMLAttributes<HTMLElement>) {
  const Component = ordered ? 'ol' : 'ul'

  return (
    <Window className={cn('my-4', className)}>
      <Component
        className={cn(
          'space-y-2',
          ordered
            ? 'list-decimal list-inside'
            : 'list-disc list-inside',
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    </Window>
  )
}

interface MarkdownListItemProps {
  children: React.ReactNode
  className?: string
}

export function MarkdownListItem({ children, className, ...props }: MarkdownListItemProps & React.LiHTMLAttributes<HTMLLIElement>) {
  return (
    <Typography
      as="li"
      variant="body"
      // @ts-expect-error - TypographyColor is not defined
      color="text"
      className={cn('leading-relaxed', className)}
      {...props}
    >
      {children}
    </Typography>
  )
}
