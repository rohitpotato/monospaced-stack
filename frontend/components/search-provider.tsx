'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Post } from '@/lib/posts'
import CommandPalette from './command-palette'
import StaticSearchBar from './static-search-bar'

interface SearchContextType {
  isOpen: boolean
  openSearch: () => void
  closeSearch: () => void
  posts: Post[]
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

interface SearchProviderProps {
  children: React.ReactNode
  posts: Post[]
}

export const SearchProvider = ({ children, posts }: SearchProviderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const openSearch = () => setIsOpen(true)
  const closeSearch = () => setIsOpen(false)

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        openSearch()
      }
      
      // Escape to close search
      if (e.key === 'Escape' && isOpen) {
        closeSearch()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const value = {
    isOpen,
    openSearch,
    closeSearch,
    posts
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
      <CommandPalette 
        posts={posts} 
        isOpen={isOpen} 
        onClose={closeSearch} 
      />
    </SearchContext.Provider>
  )
}

// Wrapper component for the search bar
export const SearchBar = () => {
  const { openSearch } = useSearch()
  return <StaticSearchBar onSearchClick={openSearch} />
}
