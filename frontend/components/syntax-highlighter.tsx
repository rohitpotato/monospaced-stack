import React from 'react'
import { Prism as ReactSyntaxHighlighter } from 'react-syntax-highlighter'
import { andyPrismTheme } from '@/lib/andy-prism-theme'
import { cn } from '@/lib/utils'

interface SyntaxHighlighterProps {
  children: React.ReactNode
  language?: string
  className?: string
}

/** MDX / markdown often passes code children as arrays or nested nodes — String(children) breaks blocks. */
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
  const codeString = reactNodeToPlainText(children)
  const normalizedLanguage = normalizeLanguage(language)

  return (
    <div className={cn('my-8 overflow-hidden rounded-xl border border-divider bg-white/60', className)}>
      {language && (
        <div className="border-divider border-b bg-white/70 px-4 py-2 font-mono text-xs text-[var(--color-ink-subtle)]">
          {normalizedLanguage}
        </div>
      )}
      <ReactSyntaxHighlighter
        language={normalizedLanguage}
        style={andyPrismTheme as any}
        PreTag="div"
        customStyle={{
          margin: 0,
          borderRadius: 0,
          background: 'transparent',
          padding: '1rem 1.1rem',
          overflowX: 'auto',
        }}
        codeTagProps={{
          style: {
            fontSize: '0.875rem',
            lineHeight: 1.625,
          },
        }}
      >
        {codeString}
      </ReactSyntaxHighlighter>
    </div>
  )
}
