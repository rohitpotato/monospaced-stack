'use client'

import React, { useEffect } from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { Post } from '@/lib/posts'
import { useSearch } from '@/hooks/use-search'
import { SearchInput, SearchResultsSection } from './index'
import { RetroWindow } from '@/components/retro-window'

interface CommandPaletteProps {
  posts: Post[]
  isOpen: boolean
  onClose: () => void
}

export function CommandPalette({ posts, isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter()
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    hasSearchQuery,
    hasResults,
    clearSearch,
    selectedIndex,
    setSelectedIndex,
    selectNext,
    selectPrevious
  } = useSearch(posts, {
    debounceMs: 100,
    minQueryLength: 3,
    maxResults: 10,
    highlightConfig: {
      highlightClass: 'bg-green-400/30 text-green-100 px-1 rounded font-medium font-mono'
    }
  })

  // Handle result selection
  const handleSelect = (post: Post) => {
    router.push(`/thoughts/${post.slug}`)
    onClose()
    clearSearch()
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
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
    >
      <div
        id="command-palette"
        className="w-full max-w-2xl mx-4"
      >
        <RetroWindow 
          title="COMMAND_PALETTE.exe"
          variant="full"
          className="rounded-lg shadow-[0_0_30px_rgba(0,255,0,0.5)]"
        >

        {/* Search input */}
        <div className="p-4 border-b border-green-500/30">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search articles, summaries, and content..."
            autoFocus
            showClearButton
            onClear={clearSearch}
          />
        </div>

        {/* Results */}
        <div className="p-4">
          <SearchResultsSection
            searchResults={searchResults}
            isSearching={isSearching}
            hasResults={hasResults}
            searchQuery={searchQuery}
            onResultSelect={handleSelect}
            selectedIndex={selectedIndex}
            onSelectionChange={setSelectedIndex}
            variant="default"
            maxResults={10}
            showKeyboardHints={true}
          />
        </div>

        {/* Footer */}
        <div className="border-t border-green-500/30 px-4 py-2">
          <div className="flex items-center justify-between text-xs font-mono text-green-500/80">
            <span>Press Esc to close</span>
            <span>Use ↑↓ to navigate, ↵ to select</span>
          </div>
        </RetroWindow>
      </div>
    </Command.Dialog>
  )
}
