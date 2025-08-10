"use client"

import { X, RotateCcw, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "@/lib/theme-context"

interface ColorPickerProps {
  isOpen: boolean
  onClose: () => void
}

export function ColorPicker({ isOpen, onClose }: ColorPickerProps) {
  const { currentTheme, setTheme, themes } = useTheme()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />

      <Card className="relative bg-slate-900/95 border-slate-700/50 backdrop-blur-md w-80 mt-16 animate-in slide-in-from-right-2 duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-sm font-mono text-slate-200 flex items-center">
            <Palette className="w-4 h-4 mr-2" />
            Theme Customization
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <p className="text-xs text-slate-400 font-mono mb-3">Choose your accent color:</p>
            <div className="grid grid-cols-1 gap-2">
              {themes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => setTheme(theme)}
                  className={`
                    flex items-center space-x-3 p-3 rounded-lg border transition-all
                    ${
                      currentTheme.name === theme.name
                        ? "border-slate-600 bg-slate-800/50 ring-1 ring-theme-primary/50"
                        : "border-slate-800/50 hover:border-slate-700/50 hover:bg-slate-800/30"
                    }
                  `}
                >
                  <div className="flex space-x-1">
                    <div
                      className="w-4 h-4 rounded-full border border-slate-600/50"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <div
                      className="w-4 h-4 rounded-full border border-slate-600/50"
                      style={{ backgroundColor: theme.colors.secondary }}
                    />
                    <div
                      className="w-4 h-4 rounded-full border border-slate-600/50"
                      style={{ backgroundColor: theme.colors.accent }}
                    />
                  </div>
                  <span className="text-sm font-mono text-slate-300">{theme.name}</span>
                  {currentTheme.name === theme.name && (
                    <div className="ml-auto w-2 h-2 bg-theme-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/50">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(themes[0])}
              className="w-full text-slate-400 hover:text-slate-200 font-mono text-xs"
            >
              <RotateCcw className="w-3 h-3 mr-2" />
              Reset to Default
            </Button>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            <p>💡 Your theme preference is saved locally</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
