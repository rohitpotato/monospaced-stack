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
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={cn(
        'text-gray-900 hover:text-orange-600 transition-colors duration-200',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}
