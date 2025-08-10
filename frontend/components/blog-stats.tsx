"use client"

import { useState, useEffect } from "react"
import { Heart, Eye, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getBlogStats, incrementViews, toggleLike } from "@/lib/blog-stats"

interface BlogStatsProps {
  slug: string
}

export function BlogStats({ slug }: BlogStatsProps) {
  const [stats, setStats] = useState({ views: 0, likes: 0, likedBy: [] })
  const [isLiked, setIsLiked] = useState(false)
  const [userId, setUserId] = useState("")

  useEffect(() => {
    // Generate or get user ID from localStorage
    let id = localStorage.getItem("digital-backyard-user-id")
    if (!id) {
      id = Math.random().toString(36).substring(2, 15)
      localStorage.setItem("digital-backyard-user-id", id)
    }
    setUserId(id)

    // Load initial stats and increment views
    const loadStats = async () => {
      try {
        const initialStats = await getBlogStats(slug)
        setStats(initialStats)
        setIsLiked(initialStats.likedBy.includes(id))

        // Increment views
        const updatedStats = await incrementViews(slug)
        setStats(updatedStats)
      } catch (error) {
        console.error("Failed to load blog stats:", error)
      }
    }

    loadStats()
  }, [slug])

  const handleLike = async () => {
    try {
      const updatedStats = await toggleLike(slug, userId)
      setStats(updatedStats)
      setIsLiked(updatedStats.likedBy.includes(userId))
    } catch (error) {
      console.error("Failed to toggle like:", error)
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLike}
        className={`${
          isLiked ? "text-red-400 hover:text-red-300" : "text-slate-400 hover:text-slate-100"
        } hover:bg-slate-800/50 transition-all`}
      >
        <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
        {stats.likes}
      </Button>

      <div className="flex items-center space-x-2 text-slate-400 text-sm font-mono">
        <Eye className="w-4 h-4" />
        <span>{stats.views.toLocaleString()}</span>
      </div>

      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100 hover:bg-slate-800/50">
        <MessageCircle className="w-4 h-4 mr-2" />
        12
      </Button>
    </div>
  )
}
