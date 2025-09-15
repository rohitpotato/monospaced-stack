import React from 'react'
import { cn } from '@/lib/utils'
import Typography from '@/components/typography'

interface MarkdownLinkProps {
    href: string
    children: React.ReactNode
    className?: string
}

export function MarkdownLink({ href, children, className, ...props }: MarkdownLinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={cn(
        'text-primary underline decoration-green-300 hover:decoration-green-500 transition-colors duration-200 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}
