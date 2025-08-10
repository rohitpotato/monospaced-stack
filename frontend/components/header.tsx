"use client"

import { useState } from "react"
import { BarChart3, Rss, User, Palette, Menu, X, Clover, Drum } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ColorPicker } from "@/components/color-picker"
import Link from "next/link"

export function Header() {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-theme-primary to-theme-secondary rounded-lg flex items-center justify-center shadow-theme-primary">
                <div className="w-4 h-4 bg-slate-950 rounded-sm">
                  <Clover className="w-4 h-4" />
                </div>
              </div>
              <Link href="/">
                <h1 className="text-lg sm:text-xl font-mono font-semibold tracking-tight">DIGITAL BACKYARD</h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <a href={process.env.NEXT_PUBLIC_ANALYTICS_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100 hover:bg-slate-800/50">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </a>
              <Link href="/rss">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100 hover:bg-slate-800/50">
                  <Rss className="w-4 h-4 mr-2" />
                  RSS
                </Button>
              </Link>
              <Link href={process.env.NEXT_PUBLIC_SPOTIFY_URL || ''} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100 hover:bg-slate-800/50">
                  <Drum className="w-4 h-4 mr-2" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100 hover:bg-slate-800/50">
                  <User className="w-4 h-4 mr-2" />
                  About
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsColorPickerOpen(true)}
                className="text-theme-primary hover:text-theme-primary/80 hover:bg-theme-primary/10"
              >
                <Palette className="w-4 h-4" />
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsColorPickerOpen(true)}
                className="text-theme-primary hover:text-theme-primary/80 hover:bg-theme-primary/10"
              >
                <Palette className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-slate-800/50 pt-4">
              <div className="flex flex-col space-y-2">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
                <Link href="/rss">
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 justify-start w-full">
                    <Rss className="w-4 h-4 mr-2" />
                    RSS
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 justify-start w-full">
                    <User className="w-4 h-4 mr-2" />
                    About
                  </Button>
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      <ColorPicker isOpen={isColorPickerOpen} onClose={() => setIsColorPickerOpen(false)} />
    </>
  )
}
