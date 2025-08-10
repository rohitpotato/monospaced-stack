"use client"

import { useState } from "react"
import { BarChart3, Rss, User, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ColorPicker } from "@/components/color-picker"

export function Header() {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)

  return (
    <>
      <header className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-theme-primary to-theme-secondary rounded-lg flex items-center justify-center shadow-theme-primary">
                <div className="w-4 h-4 bg-slate-950 rounded-sm"></div>
              </div>
              <h1 className="text-xl font-mono font-semibold tracking-tight">DIGITAL BACKYARD</h1>
            </div>

            <nav className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100 hover:bg-slate-800/50">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100 hover:bg-slate-800/50">
                <Rss className="w-4 h-4 mr-2" />
                RSS
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100 hover:bg-slate-800/50">
                <User className="w-4 h-4 mr-2" />
                About
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsColorPickerOpen(true)}
                className="text-theme-primary hover:text-theme-primary/80 hover:bg-theme-primary/10"
              >
                <Palette className="w-4 h-4" />
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <ColorPicker isOpen={isColorPickerOpen} onClose={() => setIsColorPickerOpen(false)} />
    </>
  )
}
