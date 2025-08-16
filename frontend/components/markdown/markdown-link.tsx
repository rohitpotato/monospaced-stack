import React from 'react'
import { cn } from '@/lib/utils'

interface MarkdownLinkProps {
    href: string
    children: React.ReactNode
    className?: string
}

export function MarkdownLink({ href, children, className, ...props }: MarkdownLinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className={cn(
        'text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-500 transition-colors duration-200',
        className
      )}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  )
}
