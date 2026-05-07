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

  // Extract language from className (e.g. "language-javascript").
  // Some MDX pipelines append extra classes, so we parse via regex.
  const languageMatch = className?.match(/language-([\w-]+)/)
  const language = languageMatch?.[1]

  return (
    <SyntaxHighlighter
      language={language}
      className="mb-4"
      {...props}
    >
      {children}
    </SyntaxHighlighter>
  )
}
