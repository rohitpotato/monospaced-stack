'use client'

import { Search, X } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  showClearButton?: boolean
  onClear?: () => void
  onFocus?: () => void
  onBlur?: () => void
  autoFocus?: boolean
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search articles...',
  className,
  disabled = false,
  showClearButton = true,
  onClear,
  onFocus,
  onBlur,
  autoFocus = false,
}: SearchInputProps) {
  const handleClear = () => {
    onChange('')
    onClear?.()
  }

  return (
    <div className={cn('relative', className)}>
      {/* Search icon */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Search className="w-4 h-4 text-green-400" />
      </div>

      {/* Input field */}
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus={autoFocus}
        className={cn(
          'w-full bg-black/50 border-2 border-green-500/50 rounded-lg py-2 pl-10 pr-10',
          'text-green-300 placeholder:text-green-500/60 font-mono text-sm',
          'focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500',
          'transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'hover:border-green-500/70',
          className,
        )}
        aria-label="Search articles"
      />

      {/* Clear button */}
      {showClearButton && value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-green-500/20 rounded transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4 text-green-400" />
        </button>
      )}

      {/* Loading indicator */}
      {disabled && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-green-500/30 border-t-green-400 rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}

interface SearchInputWithLabelProps extends SearchInputProps {
  label?: string
  description?: string
}

export function SearchInputWithLabel({
  label = 'Search Database',
  description,
  ...props
}: SearchInputWithLabelProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-mono font-semibold text-green-400">
          {label}
        </label>
      )}
      {description && (
        <p className="text-xs font-mono text-green-500/80">
          {description}
        </p>
      )}
      <SearchInput {...props} />
    </div>
  )
}
