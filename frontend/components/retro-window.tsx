'use client'
import React from 'react'
import { cn } from '@/lib/utils'

interface RetroWindowProps {
  children: React.ReactNode
  title: string
  className?: string
  contentClassName?: string
  showWindowControls?: boolean
  variant?: 'default' | 'compact' | 'full'
}

export function RetroWindow({ 
  children, 
  title,
  className,
  contentClassName,
  showWindowControls = true,
  variant = 'default'
}: RetroWindowProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          container: 'p-1',
          content: 'p-2',
          title: 'text-xs',
          controls: 'w-1.5 h-1.5'
        }
      case 'full':
        return {
          container: 'p-2',
          content: 'p-6',
          title: 'text-sm',
          controls: 'w-2 h-2'
        }
      default:
        return {
          container: 'p-1',
          content: 'p-4',
          title: 'text-xs',
          controls: 'w-2 h-2'
        }
    }
  }

  const styles = getVariantStyles()

  return (
    <div className={cn(
      'bg-black border-2 border-green-500 shadow-[0_0_15px_rgba(0,255,0,0.5)]',
      styles.container,
      className
    )}>
      {/* Window title bar */}
      <div className="text-green-500 flex justify-between items-center p-1 select-none border-b border-green-500/30">
        <span className={cn('font-mono', styles.title)}>
          {title}
        </span>
        {showWindowControls && (
          <div className="flex space-x-1">
            <div className={cn('bg-green-500/50 rounded-full', styles.controls)}></div>
            <div className={cn('bg-green-500/50 rounded-full', styles.controls)}></div>
            <div className={cn('bg-green-500/50 rounded-full', styles.controls)}></div>
          </div>
        )}
      </div>
      
      {/* Content area */}
      <div className={cn('bg-black', styles.content, contentClassName)}>
        {children}
      </div>
    </div>
  )
}
