'use client'

import type { HighlightedText as HighlightedTextType } from '@/hooks/use-search-highlight'
import React from 'react'
import { cn } from '@/lib/utils'

interface HighlightedTextProps {
  highlights: HighlightedTextType[]
  className?: string
  as?: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  highlightClassName?: string
}

export function HighlightedText({
  highlights,
  className,
  as: Component = 'span',
  highlightClassName = 'bg-green-400/30 text-green-100 px-1 rounded font-medium',
}: HighlightedTextProps) {
  return (
    <Component className={className}>
      {highlights.map((highlight, index) => (
        <React.Fragment key={index}>
          {highlight.isHighlighted
            ? (
                <mark className={cn(highlightClassName, 'font-mono')}>
                  {highlight.text}
                </mark>
              )
            : (
                highlight.text
              )}
        </React.Fragment>
      ))}
    </Component>
  )
}

interface HighlightedTextHTMLProps {
  html: string
  className?: string
  as?: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export function HighlightedTextHTML({
  html,
  className,
  as: Component = 'span',
}: HighlightedTextHTMLProps) {
  return (
    <Component
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
