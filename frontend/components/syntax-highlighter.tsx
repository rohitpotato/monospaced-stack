import React from 'react'
import { cn } from '@/lib/utils'

interface SyntaxHighlighterProps {
  children: React.ReactNode
  language?: string
  className?: string
}

// Simple syntax highlighting using CSS classes
function highlightSyntax(code: string, language?: string) {
  if (!language)
    return code

  // Basic syntax highlighting patterns
  const patterns = {
    javascript: [
      { pattern: /\b(const|let|var|function|if|else|for|while|return|class|import|export|from|async|await)\b/g, className: 'text-blue-600 font-semibold' },
      { pattern: /(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g, className: 'text-green-600' },
      { pattern: /\b(\d+(?:\.\d*)?)\b/g, className: 'text-orange-600' },
      { pattern: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, className: 'text-gray-500 italic' },
    ],
    typescript: [
      { pattern: /\b(const|let|var|function|if|else|for|while|return|class|import|export|from|async|await|interface|type|enum)\b/g, className: 'text-blue-600 font-semibold' },
      { pattern: /(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g, className: 'text-green-600' },
      { pattern: /\b(\d+(?:\.\d*)?)\b/g, className: 'text-orange-600' },
      { pattern: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, className: 'text-gray-500 italic' },
    ],
    python: [
      { pattern: /\b(def|class|if|else|elif|for|while|return|import|from|try|except|finally|with|as)\b/g, className: 'text-blue-600 font-semibold' },
      { pattern: /(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g, className: 'text-green-600' },
      { pattern: /\b(\d+(?:\.\d*)?)\b/g, className: 'text-orange-600' },
      { pattern: /(#.*$)/gm, className: 'text-gray-500 italic' },
    ],
    yaml: [
      { pattern: /^(\s*)([a-z_]\w*):/gim, className: 'text-blue-600 font-semibold' },
      { pattern: /(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g, className: 'text-green-600' },
      { pattern: /\b(true|false|null)\b/g, className: 'text-orange-600' },
    ],
    json: [
      { pattern: /(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g, className: 'text-green-600' },
      { pattern: /\b(true|false|null)\b/g, className: 'text-orange-600' },
    ],
  }

  const langPatterns = patterns[language as keyof typeof patterns] || []
  let highlightedCode = code

  langPatterns.forEach(({ pattern, className }) => {
    highlightedCode = highlightedCode.replace(pattern, `<span class="${className}">$&</span>`)
  })

  return highlightedCode
}

export function SyntaxHighlighter({ children, language, className }: SyntaxHighlighterProps) {
  const codeString = typeof children === 'string' ? children : String(children)
  const highlightedCode = highlightSyntax(codeString, language)

  return (
    <div className={cn('my-6 rounded-lg bg-gray-50 border border-gray-200 overflow-hidden', className)}>
      {language && (
        <div className="px-4 py-2 bg-gray-100 border-b border-gray-200 text-xs text-gray-600 font-mono">
          {language}
        </div>
      )}
      <pre className="overflow-x-auto p-4">
        <code
          className="text-sm font-mono text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  )
}
