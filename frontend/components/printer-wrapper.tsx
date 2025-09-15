'use client'
import React, { useState, useEffect, useRef } from 'react'
import { RetroWindow } from '@/components/retro-window'
import { cn } from '@/lib/utils'

interface PrinterWrapperProps {
  children: React.ReactNode
  className?: string
  windowTitle?: string
  showProgress?: boolean
  animationDuration?: number
  steps?: number
}

export function PrinterWrapper({ 
  children, 
  className,
  windowTitle = "PRINTER.exe",
  showProgress = true,
  animationDuration = 2500, // 2.5 seconds
  steps = 50
}: PrinterWrapperProps) {
  const [isPrinting, setIsPrinting] = useState(true)
  const [printProgress, setPrintProgress] = useState(0)
  const [animatedHeight, setAnimatedHeight] = useState(0)
  const [fullHeight, setFullHeight] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Wait for content to render and get its natural height
    const timer = setTimeout(() => {
      if (contentRef.current) {
        const naturalHeight = contentRef.current.scrollHeight
        setFullHeight(naturalHeight)
        
        // Start printing effect
        const printInterval = setInterval(() => {
          setAnimatedHeight(prev => {
            const increment = naturalHeight / steps
            const newHeight = prev + increment
            
            if (newHeight >= naturalHeight) {
              setIsPrinting(false)
              clearInterval(printInterval)
              return naturalHeight
            }
            return newHeight
          })
          
          setPrintProgress(prev => {
            const increment = 100 / steps
            const newProgress = prev + increment
            return newProgress >= 100 ? 100 : newProgress
          })
        }, animationDuration / steps)

        return () => clearInterval(printInterval)
      }
    }, 100) // Small delay to ensure content is rendered

    return () => clearTimeout(timer)
  }, [animationDuration, steps])

  return (
    <div className={cn('my-6', className)}>
      <RetroWindow 
        title={isPrinting ? windowTitle : 'VIEWER.exe'}
        className="w-full"
      >
        <div 
          ref={containerRef}
          className="relative max-w-full overflow-hidden"
          style={{ height: `${fullHeight}px` }}
        >
          {/* Printer progress indicator */}
          {isPrinting && showProgress && (
            <div className="absolute top-2 right-2 z-20 text-green-400 text-xs font-mono">
              {Math.round(printProgress)}%
            </div>
          )}
          
          <div 
            ref={contentRef}
            className="w-full"
            style={{ 
              height: `${animatedHeight}px`,
              maxWidth: '100%',
              overflow: 'hidden'
            }}
          >
            {children}
          </div>
        </div>
      </RetroWindow>
    </div>
  )
}
