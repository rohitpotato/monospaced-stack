'use client'

import React, { useState, useEffect } from 'react'
import { Command } from 'cmdk'
import { Search, FileText, Calendar, Clock, ArrowUpRight } from 'lucide-react'
import { Post } from '@/lib/posts'
import { searchPosts, SearchResult, highlightText } from '@/lib/search'
import { useRouter } from 'next/navigation'

interface CommandPaletteProps {
  posts: Post[]
  isOpen: boolean
  onClose: () => void
}

const CommandPalette = ({ posts, isOpen, onClose }: CommandPaletteProps) => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  // Search effect
  useEffect(() => {
    if (search.trim() && search.trim().length >= 2) {
      setIsSearching(true)
      // Small delay to show loading state
      const timeoutId = setTimeout(() => {
        const searchResults = searchPosts(posts, search)
        // Fuse.js returns results sorted by score (lower is better)
        setResults(searchResults.slice(0, 10)) // Limit to 10 results
        setIsSearching(false)
      }, 100)

      return () => clearTimeout(timeoutId)
    } else {
      setResults([])
      setIsSearching(false)
    }
  }, [search, posts])

  // Handle result selection
  const handleSelect = (post: Post) => {
    router.push(`/thoughts/${post.slug}`)
    onClose()
    setSearch('')
  }

  // Handle escape key and outside click
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Element
      if (target && !target.contains(document.querySelector('#command-palette') as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleOutsideClick)
      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.removeEventListener('mousedown', handleOutsideClick)
      }
    }
  }, [isOpen, onClose])

  return (
    <Command.Dialog
      open={isOpen}
      onOpenChange={onClose}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      id="command-palette"
      label="Search posts, titles, and content..."
    >
      <div className="fixed inset-0 flex items-start justify-center p-4 pt-[20vh]">
        <Command className="w-full max-w-2xl bg-[#FFEFBA] rounded-lg shadow-2xl border border-gray-200">
          {/* Header */}
          <div className="flex items-center border-b border-gray-200 px-4 py-3">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Search posts, titles, and content..."
              className="flex-1 outline-none text-gray-900 placeholder-gray-500"
            />
            <div className="flex items-center gap-2 ml-3">
              <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded border">
                ↑↓
              </kbd>
              <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded border">
                Enter
              </kbd>
              <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded border">
                ESC
              </kbd>
            </div>
          </div>

          {/* Results */}
          <Command.List className="max-h-96 overflow-y-auto p-2">
            {isSearching && (
              <div className="px-4 py-8 text-center text-gray-500">
                <div className="w-8 h-8 mx-auto mb-2 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                <p>Searching...</p>
              </div>
            )}

            {!isSearching && search.trim() && search.trim().length >= 2 && results.length === 0 && (
              <div className="px-4 py-8 text-center text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No results found for "{search}"</p>
                <p className="text-sm">Try different keywords or check spelling</p>
              </div>
            )}

            {!isSearching && (!search.trim() || search.trim().length < 2) && (
              <div className="px-4 py-8 text-center text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>Start typing to search posts...</p>
                <p className="text-sm">Search through titles, summaries, and content (minimum 2 characters)</p>
              </div>
            )}

            {!isSearching && results.map((result, index) => (
              <Command.Item
                key={`${result.post.slug}-${index}`}
                value={`${result.post.title} ${result.post.summary || ''}`}
                onSelect={() => handleSelect(result.post)}
                className="flex items-start p-3 rounded-lg cursor-pointer hover:bg-[#ead595] transition-colors focus:bg-[#ead595] focus:outline-none"
              >
                <div className="flex-1 min-w-0">
                  {/* Title */}
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <h3
                      className="font-medium text-gray-900 truncate"
                      dangerouslySetInnerHTML={{
                        __html: result.matches.find(m => m.field === 'title')
                          ? highlightText(result.post.title, result.matches.find(m => m.field === 'title')!.indices[0])
                          : result.post.title
                      }}
                    />
                  </div>

                  {/* Summary */}
                  {result.post.summary && (
                    <p
                      className="text-sm text-gray-600 mb-2 overflow-hidden text-ellipsis"
                      style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                      dangerouslySetInnerHTML={{
                        __html: result.matches.find(m => m.field === 'summary')
                          ? highlightText(result.post.summary, result.matches.find(m => m.field === 'summary')!.indices[0])
                          : result.post.summary
                      }}
                    />
                  )}

                  {/* Content snippet */}
                  {result.matches.find(m => m.field === 'content') && (
                    <p
                      className="text-sm text-gray-500 overflow-hidden text-ellipsis"
                      style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                      dangerouslySetInnerHTML={{
                        __html: highlightText(
                          result.matches.find(m => m.field === 'content')!.text,
                          result.matches.find(m => m.field === 'content')!.indices[0]
                        )
                      }}
                    />
                  )}

                  {/* Meta info */}
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(result.post.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{result.post.readingTime}</span>
                    </div>
                  </div>
                </div>

                <ArrowUpRight className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
              </Command.Item>
            ))}
          </Command.List>

          {/* Footer */}
          {results.length > 0 && (
            <div className="border-t border-gray-200 px-4 py-2 text-xs text-gray-500">
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </div>
          )}
        </Command>
      </div>
    </Command.Dialog>
  )
}

export default CommandPalette
