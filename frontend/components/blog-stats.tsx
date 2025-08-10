"use client"

import { useState, useEffect } from "react"
import { Heart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface BlogStatsProps {
  slug: string
  stats: Stats
}

interface Stats {
  likes: number
  views: number
}

export function BlogStats({ slug, stats: initialStats }: BlogStatsProps) {
  const [stats, setStats] = useState<Stats>(initialStats)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAction = async (action: 'like' | 'view') => {
    try {
      const response = await fetch(`/api/stats/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      })
      const updatedStats = await response.json()
      setStats(updatedStats)
    } catch {
      console.error("Failed to record action")
    }
  }

  useEffect(() => {
    // Check if user has liked this post
    const likedPosts = JSON.parse(localStorage.getItem('liked-posts') || '[]')
    setIsLiked(likedPosts.includes(slug))

    // Check if this session has viewed this post
    const viewedPosts = JSON.parse(sessionStorage.getItem('viewed-posts') || '[]')
    const hasViewed = viewedPosts.includes(slug)
    if (!hasViewed) {
      handleAction('view')
    }
  }, [slug])

  const handleLike = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      await handleAction('like')
      setIsLiked(true)
      toast.success('Post liked!')
      // Store in localStorage
      const likedPosts = JSON.parse(localStorage.getItem('liked-posts') || '[]')
      if (!likedPosts.includes(slug)) {
        likedPosts.push(slug)
        localStorage.setItem('liked-posts', JSON.stringify(likedPosts))
      }
    } catch {
      console.error("Failed to like post")
      toast.error('Failed to like post')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLike}
        disabled={isLiked || isLoading}
        className={`${isLiked ? "text-red-400 hover:text-red-300" : "text-slate-400 hover:text-slate-100"
          } hover:bg-slate-800/50 transition-all`}
      >
        <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
        {stats.likes}
      </Button>

      <div className="flex items-center space-x-2 text-slate-400 text-sm font-mono">
        <Eye className="w-4 h-4" />
        <span>{stats.views.toLocaleString()}</span>
      </div>
    </div>
  )
}
