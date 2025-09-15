'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Post } from '@/lib/posts'
import type { SearchResult } from '@/lib/search'
import { searchPosts } from '@/lib/search'
import { useSearchHighlight } from './use-search-highlight'

export interface UseSearchOptions {
  debounceMs?: number
  minQueryLength?: number
  maxResults?: number
  highlightConfig?: {
    highlightClass?: string
    caseSensitive?: boolean
    maxSnippetLength?: number
  }
}

export interface UseSearchReturn {
  // Search state
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchResults: SearchResult[]
  isSearching: boolean
  hasSearchQuery: boolean
  hasResults: boolean
  
  // Search actions
  clearSearch: () => void
  performSearch: (query: string) => void
  
  // Highlighting utilities
  getHighlightedHTML: (result: SearchResult, field: 'title' | 'summary' | 'content') => string
  highlightText: (text: string, indices?: number[]) => any[]
  
  // Selection state
  selectedIndex: number
  setSelectedIndex: (index: number) => void
  selectNext: () => void
  selectPrevious: () => void
  selectResult: (index: number) => Post | null
}

export function useSearch(
  posts: Post[],
  options: UseSearchOptions = {}
): UseSearchReturn {
  const {
    debounceMs = 300,
    minQueryLength = 3,
    maxResults = 10,
    highlightConfig = {}
  } = options

  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  // Highlighting utilities
  const { getHighlightedHTML, highlightText } = useSearchHighlight(searchQuery, {
    highlightClass: 'bg-green-400/30 text-green-100 px-1 rounded font-medium font-mono',
    caseSensitive: false,
    maxSnippetLength: 150,
    ...highlightConfig
  })

  // Computed values
  const hasSearchQuery = searchQuery.trim().length >= minQueryLength
  const hasResults = searchResults.length > 0

  // Debounced search effect
  useEffect(() => {
    if (!hasSearchQuery) {
      setSearchResults([])
      setIsSearching(false)
      setSelectedIndex(-1)
      return
    }

    setIsSearching(true)
    const timeoutId = setTimeout(() => {
      const results = searchPosts(posts, searchQuery)
      setSearchResults(results.slice(0, maxResults))
      setIsSearching(false)
      setSelectedIndex(-1) // Reset selection when new results come in
    }, debounceMs)

    return () => {
      clearTimeout(timeoutId)
      setIsSearching(false)
    }
  }, [searchQuery, posts, debounceMs, minQueryLength, maxResults, hasSearchQuery])

  // Search actions
  const clearSearch = useCallback(() => {
    setSearchQuery('')
    setSearchResults([])
    setIsSearching(false)
    setSelectedIndex(-1)
  }, [])

  const performSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  // Selection navigation
  const selectNext = useCallback(() => {
    if (searchResults.length === 0) return
    setSelectedIndex(prev => (prev + 1) % searchResults.length)
  }, [searchResults.length])

  const selectPrevious = useCallback(() => {
    if (searchResults.length === 0) return
    setSelectedIndex(prev => prev <= 0 ? searchResults.length - 1 : prev - 1)
  }, [searchResults.length])

  const selectResult = useCallback((index: number) => {
    if (index < 0 || index >= searchResults.length) return null
    return searchResults[index].post
  }, [searchResults])

  return {
    // Search state
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    hasSearchQuery,
    hasResults,
    
    // Search actions
    clearSearch,
    performSearch,
    
    // Highlighting utilities
    getHighlightedHTML,
    highlightText,
    
    // Selection state
    selectedIndex,
    setSelectedIndex,
    selectNext,
    selectPrevious,
    selectResult
  }
}
