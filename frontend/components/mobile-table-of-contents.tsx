'use client'

import React, { useState } from 'react'
import { Heading } from "@/lib/posts"
import { List, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MobileTableOfContentsProps {
    headings: Heading[]
    title: string
}

const MobileTableOfContents = ({ headings, title }: MobileTableOfContentsProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleHeadingClick = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })

            // Update URL hash
            window.history.pushState(null, '', `#${id}`)

            // Close the mobile menu
            setIsOpen(false)
        }
    }

    if (headings.length === 0) {
        return null
    }

    return (
        <>
            {/* Floating button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                aria-label="Open table of contents"
            >
                <List className="w-5 h-5" />
            </button>

            {/* Mobile overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
                    <div className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-xl overflow-y-auto">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900">Table of Contents</h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                                    aria-label="Close"
                                >
                                    <X className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>

                        <nav className="p-4 space-y-1">
                            {headings.map((heading) => {
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
                                            'w-full text-left px-2 py-2 rounded text-sm transition-colors hover:bg-gray-50',
                                            indentClass,
                                            heading.level === 1
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
                    </div>
                </div>
            )}
        </>
    )
}

export default MobileTableOfContents
