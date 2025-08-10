"use client"

import { useState, useEffect } from "react"

export function ReadingProgress() {
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setReadingProgress(Math.min(progress, 100))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-slate-800 z-50">
      <div
        className="h-full bg-gradient-to-r from-theme-primary to-theme-secondary transition-all duration-150"
        style={{ width: `${readingProgress}%` }}
      />
    </div>
  )
}
