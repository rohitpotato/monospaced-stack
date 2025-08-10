"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Theme = {
  name: string
  primary: string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  cssVars: {
    [key: string]: string
  }
}

const themes: Theme[] = [
  {
    name: "Default",
    primary: "emerald",
    colors: { primary: "#10b981", secondary: "#06b6d4", accent: "#3b82f6" },
    cssVars: {
      "--color-primary": "16 185 129",
      "--color-secondary": "6 182 212",
      "--color-accent": "59 130 246",
      "--color-primary-rgb": "#10b981",
      "--color-secondary-rgb": "#06b6d4",
      "--color-accent-rgb": "#3b82f6",
    },
  },
  {
    name: "Sunset",
    primary: "orange",
    colors: { primary: "#f97316", secondary: "#ef4444", accent: "#ec4899" },
    cssVars: {
      "--color-primary": "249 115 22",
      "--color-secondary": "239 68 68",
      "--color-accent": "236 72 153",
      "--color-primary-rgb": "#f97316",
      "--color-secondary-rgb": "#ef4444",
      "--color-accent-rgb": "#ec4899",
    },
  },
  {
    name: "Ocean",
    primary: "blue",
    colors: { primary: "#3b82f6", secondary: "#06b6d4", accent: "#8b5cf6" },
    cssVars: {
      "--color-primary": "59 130 246",
      "--color-secondary": "6 182 212",
      "--color-accent": "139 92 246",
      "--color-primary-rgb": "#3b82f6",
      "--color-secondary-rgb": "#06b6d4",
      "--color-accent-rgb": "#8b5cf6",
    },
  },
  {
    name: "Forest",
    primary: "green",
    colors: { primary: "#22c55e", secondary: "#84cc16", accent: "#10b981" },
    cssVars: {
      "--color-primary": "34 197 94",
      "--color-secondary": "132 204 22",
      "--color-accent": "16 185 129",
      "--color-primary-rgb": "#22c55e",
      "--color-secondary-rgb": "#84cc16",
      "--color-accent-rgb": "#10b981",
    },
  },
  {
    name: "Purple",
    primary: "purple",
    colors: { primary: "#8b5cf6", secondary: "#a855f7", accent: "#c084fc" },
    cssVars: {
      "--color-primary": "139 92 246",
      "--color-secondary": "168 85 247",
      "--color-accent": "192 132 252",
      "--color-primary-rgb": "#8b5cf6",
      "--color-secondary-rgb": "#a855f7",
      "--color-accent-rgb": "#c084fc",
    },
  },
]

type ThemeContextType = {
  currentTheme: Theme
  setTheme: (theme: Theme) => void
  themes: Theme[]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0])

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem("digital-backyard-theme")
    if (savedTheme) {
      const theme = themes.find((t) => t.name === savedTheme)
      if (theme) {
        setCurrentTheme(theme)
      }
    }
  }, [])

  useEffect(() => {
    // Apply CSS variables to document root
    const root = document.documentElement
    Object.entries(currentTheme.cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  }, [currentTheme])

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme)
    localStorage.setItem("digital-backyard-theme", theme.name)
  }

  return <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
