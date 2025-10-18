import React from 'react'
import { SyntaxHighlighter } from '@/components/syntax-highlighter'
import { cn } from '@/lib/utils'

interface MarkdownCodeProps {
  children: React.ReactNode
  className?: string
  inline?: boolean
}

export function MarkdownCode({ children, className, inline = false, ...props }: MarkdownCodeProps & React.HTMLAttributes<HTMLElement>) {
  if (inline) {
    return (
      <code
        className={cn('px-1.5 py-0.5 rounded bg-gray-100 text-gray-800 text-sm font-mono', className)}
        {...props}
      >
        {children}
      </code>
    )
  }

  // Extract language from className if present (e.g., "language-javascript")
  const language = className?.includes('language-')
    ? className.replace('language-', '')
    : undefined

  return (
    <SyntaxHighlighter
      language={language}
      className={cn('mb-4', className)}
      {...props}
    >
      {children}
    </SyntaxHighlighter>
  )
}
