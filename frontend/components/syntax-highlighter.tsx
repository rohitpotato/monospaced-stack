import React from 'react'
import { Prism as ReactSyntaxHighlighter } from 'react-syntax-highlighter'
import { andyPrismTheme } from '@/lib/andy-prism-theme'
import { cn } from '@/lib/utils'

interface SyntaxHighlighterProps {
  children: React.ReactNode
  language?: string
  className?: string
}

function reactNodeToPlainText(node: React.ReactNode): string {
  if (node == null || typeof node === 'boolean')
    return ''
  if (typeof node === 'string' || typeof node === 'number')
    return String(node)
  if (Array.isArray(node))
    return node.map(reactNodeToPlainText).join('')
  if (React.isValidElement(node))
    return reactNodeToPlainText((node.props as { children?: React.ReactNode }).children)
  return ''
}

function normalizeLanguage(language?: string): string {
  if (!language)
    return 'text'
  const lower = language.toLowerCase()
  const aliases: Record<string, string> = {
    yml: 'yaml',
    shell: 'bash',
    sh: 'bash',
    ts: 'typescript',
    js: 'javascript',
  }
  return aliases[lower] || lower
}

export function SyntaxHighlighter({ children, language, className }: SyntaxHighlighterProps) {
  const codeString = reactNodeToPlainText(children).replace(/\n$/, '')
  const normalizedLanguage = normalizeLanguage(language)
  const lineCount = codeString.split('\n').length

  return (
    <figure className={cn('editorial-code-block', className)}>
      {language && (
        <figcaption className="flex items-center justify-between px-5 py-2.5">
          <span className="editorial-tag">{normalizedLanguage}</span>
          <span className="font-mono text-[0.65rem] text-inkMuted">
            {lineCount}
            {' '}
            {lineCount === 1 ? 'line' : 'lines'}
          </span>
        </figcaption>
      )}
      <ReactSyntaxHighlighter
        language={normalizedLanguage}
        style={andyPrismTheme as any}
        PreTag="div"
        customStyle={{
          margin: 0,
          borderRadius: 0,
          background: 'transparent',
          padding: '1.25rem 1.35rem 1.35rem',
          overflowX: 'auto',
        }}
        codeTagProps={{
          style: {
            fontSize: '0.8125rem',
            lineHeight: 1.75,
            fontFamily: '"SF Mono", Monaco, Inconsolata, "Roboto Mono", monospace',
          },
        }}
      >
        {codeString}
      </ReactSyntaxHighlighter>
    </figure>
  )
}
