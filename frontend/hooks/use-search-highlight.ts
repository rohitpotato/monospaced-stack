'use client'

import { useMemo } from 'react'
import type { SearchResult } from '@/lib/search'

export interface HighlightedText {
  text: string
  isHighlighted: boolean
  startIndex: number
  endIndex: number
}

export interface SearchHighlightConfig {
  highlightClass?: string
  caseSensitive?: boolean
  maxSnippetLength?: number
}

export function useSearchHighlight(
  searchQuery: string,
  config: SearchHighlightConfig = {}
) {
  const {
    highlightClass = 'bg-green-400/30 text-green-100 px-1 rounded font-medium',
    caseSensitive = false,
    maxSnippetLength = 150
  } = config

  // Parse search query into individual terms
  const searchTerms = useMemo(() => {
    if (!searchQuery.trim()) return []
    
    return searchQuery
      .trim()
      .split(/\s+/)
      .filter(term => term.length > 0)
      .map(term => caseSensitive ? term : term.toLowerCase())
  }, [searchQuery, caseSensitive])

  // Highlight text with search terms
  const highlightText = useMemo(() => {
    return (text: string, indices?: number[]): HighlightedText[] => {
      if (!text || searchTerms.length === 0) {
        return [{ text, isHighlighted: false, startIndex: 0, endIndex: text.length }]
      }

      const textToSearch = caseSensitive ? text : text.toLowerCase()
      const highlights: HighlightedText[] = []
      let lastIndex = 0

      // If indices are provided (from search results), use them
      if (indices && indices.length > 0) {
        const sortedIndices = [...indices].sort((a, b) => a - b)
        
        // Group consecutive indices
        const groups: number[][] = []
        let currentGroup: number[] = []
        
        for (let i = 0; i < sortedIndices.length; i++) {
          const index = sortedIndices[i]
          if (index < 0 || index >= text.length) continue
          
          if (currentGroup.length === 0 || index === currentGroup[currentGroup.length - 1] + 1) {
            currentGroup.push(index)
          } else {
            if (currentGroup.length > 0) {
              groups.push([...currentGroup])
            }
            currentGroup = [index]
          }
        }
        
        if (currentGroup.length > 0) {
          groups.push(currentGroup)
        }

        // Build highlighted segments
        for (const group of groups) {
          const startIndex = group[0]
          const endIndex = group[group.length - 1]
          
          // Add text before highlight
          if (startIndex > lastIndex) {
            highlights.push({
              text: text.substring(lastIndex, startIndex),
              isHighlighted: false,
              startIndex: lastIndex,
              endIndex: startIndex
            })
          }
          
          // Add highlighted text
          highlights.push({
            text: text.substring(startIndex, endIndex + 1),
            isHighlighted: true,
            startIndex,
            endIndex: endIndex + 1
          })
          
          lastIndex = endIndex + 1
        }
        
        // Add remaining text
        if (lastIndex < text.length) {
          highlights.push({
            text: text.substring(lastIndex),
            isHighlighted: false,
            startIndex: lastIndex,
            endIndex: text.length
          })
        }
      } else {
        // Fallback: search for terms in text
        const allMatches: { start: number; end: number }[] = []
        
        for (const term of searchTerms) {
          let index = 0
          while ((index = textToSearch.indexOf(term, index)) !== -1) {
            allMatches.push({ start: index, end: index + term.length })
            index += term.length
          }
        }
        
        // Sort and merge overlapping matches
        allMatches.sort((a, b) => a.start - b.start)
        const mergedMatches: { start: number; end: number }[] = []
        
        for (const match of allMatches) {
          if (mergedMatches.length === 0 || match.start > mergedMatches[mergedMatches.length - 1].end) {
            mergedMatches.push(match)
          } else {
            mergedMatches[mergedMatches.length - 1].end = Math.max(
              mergedMatches[mergedMatches.length - 1].end,
              match.end
            )
          }
        }
        
        // Build highlighted segments
        for (const match of mergedMatches) {
          // Add text before highlight
          if (match.start > lastIndex) {
            highlights.push({
              text: text.substring(lastIndex, match.start),
              isHighlighted: false,
              startIndex: lastIndex,
              endIndex: match.start
            })
          }
          
          // Add highlighted text
          highlights.push({
            text: text.substring(match.start, match.end),
            isHighlighted: true,
            startIndex: match.start,
            endIndex: match.end
          })
          
          lastIndex = match.end
        }
        
        // Add remaining text
        if (lastIndex < text.length) {
          highlights.push({
            text: text.substring(lastIndex),
            isHighlighted: false,
            startIndex: lastIndex,
            endIndex: text.length
          })
        }
      }

      return highlights.length > 0 ? highlights : [{ text, isHighlighted: false, startIndex: 0, endIndex: text.length }]
    }
  }, [searchTerms, caseSensitive])

  // Extract snippet with highlighting
  const extractSnippet = useMemo(() => {
    return (text: string, indices: number[], maxLength: number = maxSnippetLength): string => {
      if (!text || indices.length === 0) return text
      
      const sortedIndices = [...indices].sort((a, b) => a - b)
      const firstMatch = sortedIndices[0]
      const lastMatch = sortedIndices[sortedIndices.length - 1]
      
      // Calculate snippet boundaries
      const halfLength = Math.floor(maxLength / 2)
      const start = Math.max(0, firstMatch - halfLength)
      const end = Math.min(text.length, lastMatch + halfLength)
      
      let snippet = text.substring(start, end)
      
      // Add ellipsis if needed
      if (start > 0) snippet = '...' + snippet
      if (end < text.length) snippet = snippet + '...'
      
      return snippet
    }
  }, [maxSnippetLength])

  // Get highlighted HTML for a search result
  const getHighlightedHTML = useMemo(() => {
    return (result: SearchResult, field: 'title' | 'summary' | 'content'): string => {
      const match = result.matches.find(m => m.field === field)
      if (!match) return result.post[field] || ''
      
      const highlights = highlightText(match.text, match.indices[0])
      return highlights
        .map(highlight => 
          highlight.isHighlighted 
            ? `<mark class="${highlightClass}">${highlight.text}</mark>`
            : highlight.text
        )
        .join('')
    }
  }, [highlightText, highlightClass])

  return {
    searchTerms,
    highlightText,
    extractSnippet,
    getHighlightedHTML,
    hasSearchQuery: searchQuery.trim().length > 0
  }
}
