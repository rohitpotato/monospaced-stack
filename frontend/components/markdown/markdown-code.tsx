import React from 'react'
import Typography from '@/components/typography'
import Window from '@/components/window'
import { cn } from '@/lib/utils'

interface MarkdownCodeProps {
  children: React.ReactNode
  className?: string
  inline?: boolean
}

export function MarkdownCode({ children, className, inline = false, ...props }: MarkdownCodeProps & React.HTMLAttributes<HTMLElement>) {
  if (inline) {
    return (
      <Typography
        as="code"
        variant="code"
        // @ts-expect-error - TypographyColor is not defined
        color="accent"
        glow
        className={cn('px-1.5 py-0.5 rounded bg-green-700 text-green-50', className)}
        {...props}
      >
        {children}
      </Typography>
    )
  }

  return (
    <Window className='mb-4'>
      <pre className={cn('overflow-x-auto', className)} {...props}>
        <Typography
          as="code"
          variant="code"
          color="accent"
          className="leading-relaxed"
        >
          {children}
        </Typography>
      </pre>
    </Window>
  )
}
