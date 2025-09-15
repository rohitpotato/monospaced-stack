'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Post } from '@/lib/posts'
import { 
  SearchInput, 
  SearchResultsSection, 
  useSearch,
  SearchInputWithLabel 
} from './index'

interface SearchDemoProps {
  posts: Post[]
  className?: string
  variant?: 'sidebar' | 'full' | 'compact'
}

export function SearchDemo({ posts, className, variant = 'full' }: SearchDemoProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    hasSearchQuery,
    hasResults,
    clearSearch,
    selectedIndex,
    setSelectedIndex
  } = useSearch(posts, {
    debounceMs: 300,
    minQueryLength: 3,
    maxResults: 10,
    highlightConfig: {
      highlightClass: 'bg-green-400/30 text-green-100 px-1 rounded font-medium font-mono'
    }
  })

  const handleResultSelect = (post: Post) => {
    setSelectedPost(post)
    clearSearch()
  }

  const containerClasses = cn(
    'bg-black border-2 border-green-500/50 rounded-lg shadow-[0_0_15px_rgba(0,255,0,0.3)]',
    variant === 'sidebar' && 'w-80',
    variant === 'compact' && 'w-96',
    variant === 'full' && 'w-full max-w-4xl',
    className
  )

  return (
    <div className={containerClasses}>
      {/* Header */}
      <div className="border-b border-green-500/30 p-3">
        <div className="flex items-center justify-between">
          <h2 className="font-mono font-semibold text-green-400 text-sm">
            SEARCH_DEMO.exe
          </h2>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-green-500/50 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500/50 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500/50 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Search Input */}
        <SearchInputWithLabel
          label="Search Database"
          description="Search through articles, summaries, and content"
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Enter search query..."
          showClearButton
          onClear={clearSearch}
        />

        {/* Search Results */}
        {hasSearchQuery && (
          <SearchResultsSection
            searchResults={searchResults}
            isSearching={isSearching}
            hasResults={hasResults}
            searchQuery={searchQuery}
            onResultSelect={handleResultSelect}
            selectedIndex={selectedIndex}
            onSelectionChange={setSelectedIndex}
            variant={variant === 'compact' ? 'compact' : 'default'}
            maxResults={variant === 'sidebar' ? 5 : 10}
            showKeyboardHints={variant !== 'compact'}
          />
        )}

        {/* Selected Post Display */}
        {selectedPost && (
          <div className="border-t border-green-500/30 pt-4">
            <h3 className="font-mono font-semibold text-green-400 mb-2">
              SELECTED_ARTICLE.exe
            </h3>
            <div className="bg-black/50 border border-green-500/30 rounded p-3">
              <h4 className="font-mono font-medium text-green-300 mb-2">
                {selectedPost.title}
              </h4>
              {selectedPost.summary && (
                <p className="text-green-400 text-sm font-mono mb-2">
                  {selectedPost.summary}
                </p>
              )}
              <div className="flex items-center gap-4 text-xs text-green-500 font-mono">
                <span>Published: {new Date(selectedPost.publishedAt).toLocaleDateString()}</span>
                <span>Read time: {selectedPost.readingTime} min</span>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!hasSearchQuery && (
          <div className="text-center py-8">
            <div className="text-green-500/80 font-mono text-sm space-y-2">
              <p>Enter a search query to find articles</p>
              <p className="text-xs text-green-600">
                Search through titles, summaries, and content
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
