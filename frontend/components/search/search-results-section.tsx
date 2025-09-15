'use client'

import type { Post } from '@/lib/posts'
import type { SearchResult } from '@/lib/search'
import React, { useEffect } from 'react'
import { RetroWindow } from '@/components/retro-window'
import { cn } from '@/lib/utils'
import { SearchResultsList } from './search-results-list'

interface SearchResultsSectionProps {
  searchResults: SearchResult[]
  isSearching: boolean
  hasResults: boolean
  searchQuery: string
  onResultSelect: (post: Post) => void
  className?: string
  variant?: 'default' | 'compact' | 'detailed'
  maxResults?: number
  selectedIndex?: number
  onSelectionChange?: (index: number) => void
  showKeyboardHints?: boolean
}

export function SearchResultsSection({
  searchResults,
  isSearching,
  hasResults,
  searchQuery,
  onResultSelect,
  className,
  variant = 'default',
  maxResults = 10,
  selectedIndex = -1,
  onSelectionChange,
  showKeyboardHints = true,
}: SearchResultsSectionProps) {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!hasResults || isSearching)
        return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          // eslint-disable-next-line no-case-declarations
          const nextIndex = selectedIndex < searchResults.length - 1 ? selectedIndex + 1 : 0
          onSelectionChange?.(nextIndex)
          break
        case 'ArrowUp':
          e.preventDefault()
          // eslint-disable-next-line no-case-declarations
          const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : searchResults.length - 1
          onSelectionChange?.(prevIndex)
          break
        case 'Enter':
          e.preventDefault()
          if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
            onResultSelect(searchResults[selectedIndex].post)
          }
          break
        case 'Escape':
          e.preventDefault()
          onSelectionChange?.(-1)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [hasResults, isSearching, selectedIndex, searchResults, onResultSelect, onSelectionChange])

  const handleResultSelect = (post: Post) => {
    onResultSelect(post)
  }

  return (
    <div className={cn('w-full', className)}>
      <RetroWindow
        title="SEARCH_RESULTS.exe"
        className="border-green-500/50 shadow-[0_0_15px_rgba(0,255,0,0.3)]"
        contentClassName="p-0"
      >
        {/* Keyboard hints */}
        {showKeyboardHints && hasResults && (
          <div className="hidden sm:flex items-center gap-2 text-xs text-green-500/80 font-mono mb-4">
            <span>↑↓ navigate</span>
            <span>•</span>
            <span>↵ select</span>
            <span>•</span>
            <span>esc clear</span>
          </div>
        )}

        {/* Results content */}
        <div className="p-4">
          <SearchResultsList
            results={searchResults}
            isSearching={isSearching}
            searchQuery={searchQuery}
            selectedIndex={selectedIndex}
            onResultSelect={handleResultSelect}
            variant={variant}
            maxResults={maxResults}
          />
        </div>

        {/* Footer with search info */}
        {hasResults && (
          <div className="border-t border-green-500/30 px-4 py-2">
            <div className="flex items-center justify-between text-xs font-mono text-green-500/80">
              <span>
                Query: "
                {searchQuery}
                "
              </span>
              <span>
                {searchResults.length}
                {' '}
                result
                {searchResults.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}
      </RetroWindow>
    </div>
  )
}
