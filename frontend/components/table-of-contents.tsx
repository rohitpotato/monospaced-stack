"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heading } from "@/lib/posts"

interface TableOfContentsProps {
  headings: Heading[]
  title: string
}

export function TableOfContents({ headings, title }: TableOfContentsProps) {
  const [activeHeading, setActiveHeading] = useState<string>("")

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map((heading) => 
        document.getElementById(heading.id)
      ).filter(Boolean) as HTMLElement[]

      if (headingElements.length === 0) return

      const scrollPosition = window.scrollY + 100

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i]
        if (element.offsetTop <= scrollPosition) {
          setActiveHeading(headings[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check on mount

    return () => window.removeEventListener("scroll", handleScroll)
  }, [headings])

  const scrollToHeading = (headingId: string) => {
    const element = document.getElementById(headingId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }
      return (
      <Card className="bg-slate-900/50 border-slate-800/50 sticky top-24">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-mono text-slate-300">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={`block w-full text-left text-xs sm:text-sm font-mono transition-colors hover:text-theme-primary py-2 px-2 sm:px-3 rounded-md hover:bg-slate-800/50 ${
                activeHeading === heading.id 
                  ? "text-theme-primary bg-slate-800/50" 
                  : "text-slate-400"
              } ${
                heading.level === 1 ? "pl-2 sm:pl-3" : `pl-${Math.min((heading.level - 1) * 2 + 4, 8)} sm:pl-${(heading.level - 1) * 3 + 6}`
              }`}
            >
              <span className="line-clamp-2">{heading.title}</span>
            </button>
          ))}
        </CardContent>
      </Card>
    )
}
