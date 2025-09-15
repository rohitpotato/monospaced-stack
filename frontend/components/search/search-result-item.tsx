'use client'

import React from 'react'
import { Calendar, Clock, FileText, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SearchResult } from '@/lib/search'
import type { Post } from '@/lib/posts'
import { HighlightedTextHTML } from './highlighted-text'
import { useSearchHighlight } from '@/hooks/use-search-highlight'

interface SearchResultItemProps {
  result: SearchResult
  index: number
  isSelected?: boolean
  onSelect: (post: Post) => void
  className?: string
  variant?: 'default' | 'compact' | 'detailed'
}

export function SearchResultItem({
  result,
  index,
  isSelected = false,
  onSelect,
  className,
  variant = 'default'
}: SearchResultItemProps) {
  const { getHighlightedHTML } = useSearchHighlight('', {
    highlightClass: 'bg-green-400/30 text-green-100 px-1 rounded font-medium font-mono'
  })

  const handleClick = () => {
    onSelect(result.post)
  }

  const baseClasses = cn(
    'flex items-start p-3 rounded-lg cursor-pointer transition-all duration-200',
    'hover:bg-green-500/10 focus:bg-green-500/10 focus:outline-none',
    'border border-transparent hover:border-green-500/30',
    isSelected && 'bg-green-500/20 border-green-500/50',
    className
  )

  const compactClasses = cn(
    'flex items-center p-2 rounded cursor-pointer transition-all duration-200',
    'hover:bg-green-500/10 focus:bg-green-500/10 focus:outline-none',
    'border border-transparent hover:border-green-500/30',
    isSelected && 'bg-green-500/20 border-green-500/50',
    className
  )

  const detailedClasses = cn(
    'flex flex-col p-4 rounded-lg cursor-pointer transition-all duration-200',
    'hover:bg-green-500/10 focus:bg-green-500/10 focus:outline-none',
    'border border-transparent hover:border-green-500/30',
    isSelected && 'bg-green-500/20 border-green-500/50',
    className
  )

  if (variant === 'compact') {
    return (
      <button
        onClick={handleClick}
        className={compactClasses}
        aria-label={`Select ${result.post.title}`}
      >
        <FileText className="w-4 h-4 text-green-400 flex-shrink-0 mr-2" />
        <div className="flex-1 min-w-0 text-left">
          <HighlightedTextHTML
            html={getHighlightedHTML(result, 'title')}
            className="font-medium text-green-300 truncate text-sm"
            as="span"
          />
        </div>
        <ArrowUpRight className="w-3 h-3 text-green-400 flex-shrink-0 ml-2" />
      </button>
    )
  }

  if (variant === 'detailed') {
    return (
      <button
        onClick={handleClick}
        className={detailedClasses}
        aria-label={`Select ${result.post.title}`}
      >
        {/* Title */}
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-green-400 flex-shrink-0" />
          <HighlightedTextHTML
            html={getHighlightedHTML(result, 'title')}
            className="font-semibold text-green-300 text-lg"
            as="h3"
          />
        </div>

        {/* Summary */}
        {result.post.summary && (
          <div className="mb-3">
            <HighlightedTextHTML
              html={getHighlightedHTML(result, 'summary')}
              className="text-green-400 text-sm leading-relaxed"
              as="p"
            />
          </div>
        )}

        {/* Content snippet */}
        {result.matches.find(m => m.field === 'content') && (
          <div className="mb-3">
            <HighlightedTextHTML
              html={getHighlightedHTML(result, 'content')}
              className="text-green-500 text-sm leading-relaxed italic"
              as="p"
            />
          </div>
        )}

        {/* Meta info */}
        <div className="flex items-center gap-4 text-xs text-green-600">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(result.post.publishedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{result.post.readingTime} min read</span>
          </div>
        </div>
      </button>
    )
  }

  // Default variant
  return (
    <button
      onClick={handleClick}
      className={baseClasses}
      aria-label={`Select ${result.post.title}`}
    >
      <div className="flex-1 min-w-0">
        {/* Title */}
        <div className="flex items-center gap-2 mb-1">
          <FileText className="w-4 h-4 text-green-400 flex-shrink-0" />
          <HighlightedTextHTML
            html={getHighlightedHTML(result, 'title')}
            className="font-medium text-green-300 truncate"
            as="h3"
          />
        </div>

        {/* Summary */}
        {result.post.summary && (
          <div className="mb-2">
            <HighlightedTextHTML
              html={getHighlightedHTML(result, 'summary')}
              className="text-green-400 text-sm overflow-hidden text-ellipsis"
              style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
              as="p"
            />
          </div>
        )}

        {/* Content snippet */}
        {result.matches.find(m => m.field === 'content') && (
          <div className="mb-2">
            <HighlightedTextHTML
              html={getHighlightedHTML(result, 'content')}
              className="text-green-500 text-sm overflow-hidden text-ellipsis italic"
              style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
              as="p"
            />
          </div>
        )}

        {/* Meta info */}
        <div className="flex items-center gap-4 text-xs text-green-600">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(result.post.publishedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{result.post.readingTime} min</span>
          </div>
        </div>
      </div>

      <ArrowUpRight className="w-4 h-4 text-green-400 flex-shrink-0 ml-2" />
    </button>
  )
}
