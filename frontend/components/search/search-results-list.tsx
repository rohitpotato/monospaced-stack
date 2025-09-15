'use client'

import React from 'react'
import { Search, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SearchResult } from '@/lib/search'
import type { Post } from '@/lib/posts'
import { SearchResultItem } from './search-result-item'

interface SearchResultsListProps {
  results: SearchResult[]
  isSearching: boolean
  searchQuery: string
  selectedIndex?: number
  onResultSelect: (post: Post) => void
  className?: string
  variant?: 'default' | 'compact' | 'detailed'
  maxResults?: number
}

export function SearchResultsList({
  results,
  isSearching,
  searchQuery,
  selectedIndex = -1,
  onResultSelect,
  className,
  variant = 'default',
  maxResults = 10
}: SearchResultsListProps) {
  const displayedResults = results.slice(0, maxResults)

  if (isSearching) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-12', className)}>
        <div className="flex items-center gap-3 text-green-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="font-mono text-sm">Searching database...</span>
        </div>
        <div className="mt-2 text-green-500 text-xs font-mono">
          Query: "{searchQuery}"
        </div>
      </div>
    )
  }

  if (displayedResults.length === 0 && searchQuery.trim()) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-12', className)}>
        <Search className="w-12 h-12 text-green-500/50 mb-4" />
        <div className="text-center">
          <h3 className="font-mono font-semibold text-green-400 mb-2">
            No results found
          </h3>
          <p className="text-green-500 text-sm font-mono mb-1">
            Query: "{searchQuery}"
          </p>
          <p className="text-green-600 text-xs font-mono">
            Try different keywords or check spelling
          </p>
        </div>
      </div>
    )
  }

  if (displayedResults.length === 0) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-12', className)}>
        <Search className="w-12 h-12 text-green-500/50 mb-4" />
        <div className="text-center">
          <h3 className="font-mono font-semibold text-green-400 mb-2">
            Enter search query
          </h3>
          <p className="text-green-500 text-sm font-mono">
            Type at least 3 characters to search
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('space-y-2', className)}>
      {/* Results header */}
      <div className="flex items-center justify-between px-2 py-1 border-b border-green-500/20">
        <span className="text-xs font-mono text-green-400">
          {displayedResults.length} result{displayedResults.length !== 1 ? 's' : ''} found
        </span>
        {results.length > maxResults && (
          <span className="text-xs font-mono text-green-500">
            Showing {maxResults} of {results.length}
          </span>
        )}
      </div>

      {/* Results list */}
      <div className="space-y-1">
        {displayedResults.map((result, index) => (
          <SearchResultItem
            key={`${result.post.slug}-${index}`}
            result={result}
            index={index}
            isSelected={index === selectedIndex}
            onSelect={onResultSelect}
            variant={variant}
          />
        ))}
      </div>

      {/* Footer */}
      {results.length > maxResults && (
        <div className="px-2 py-1 border-t border-green-500/20 text-center">
          <span className="text-xs font-mono text-green-500">
            +{results.length - maxResults} more results available
          </span>
        </div>
      )}
    </div>
  )
}
