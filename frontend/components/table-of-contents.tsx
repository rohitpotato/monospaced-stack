'use client'

import React, { useState, useEffect } from 'react'
import { Heading } from "@/lib/posts"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TableOfContentsProps {
  headings: Heading[]
  title: string
}

const TableOfContents = ({ headings, title }: TableOfContentsProps) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [activeHeading, setActiveHeading] = useState<string>('')

  // Handle scroll to update active heading
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map(h => ({
        id: h.id,
        element: document.getElementById(h.id)
      })).filter(h => h.element)

      if (headingElements.length === 0) return

      const scrollPosition = window.scrollY + 150 // Offset for better detection

      // Find the current active heading
      let currentActive = ''
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const { id, element } = headingElements[i]
        if (element && element.offsetTop <= scrollPosition) {
          currentActive = id
          break
        }
      }

      setActiveHeading(currentActive)
    }

    // Set initial active heading
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [headings])

  // Handle click on heading
  const handleHeadingClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })

      // Update URL hash
      window.history.pushState(null, '', `#${id}`)
    }
  }

  // Handle URL hash on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && headings.some(h => h.id === hash)) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        handleHeadingClick(hash)
      }, 100)
    }
  }, [headings])

  if (headings.length === 0) {
    return null
  }

  return (
    <div className="sticky top-24 w-full max-h-[calc(100vh-8rem)] overflow-y-auto lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Table of Contents</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Content */}
      {isExpanded && (
        <nav className="space-y-1">
          {headings.map((heading) => {
            const isActive = activeHeading === heading.id
            const indentClass = heading.level === 1 ? 'ml-0' :
              heading.level === 2 ? 'ml-3' :
                heading.level === 3 ? 'ml-6' :
                  heading.level === 4 ? 'ml-9' :
                    heading.level === 5 ? 'ml-12' : 'ml-15'

            return (
              <button
                key={heading.id}
                onClick={() => handleHeadingClick(heading.id)}
                className={cn(
                  'w-full text-left px-2 py-1 rounded text-sm transition-colors hover:bg-gray-50',
                  indentClass,
                  isActive
                    ? 'text-blue-600 bg-blue-50 font-medium'
                    : heading.level === 1
                      ? 'text-gray-900 font-medium'
                      : heading.level === 2
                        ? 'text-gray-800'
                        : 'text-gray-600'
                )}
                style={{
                  fontSize: heading.level === 1 ? '0.875rem' :
                    heading.level === 2 ? '0.8125rem' : '0.75rem'
                }}
              >
                {heading.title}
              </button>
            )
          })}
        </nav>
      )}
    </div>
  )
}

export default TableOfContents