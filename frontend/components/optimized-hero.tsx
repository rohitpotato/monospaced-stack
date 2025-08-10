"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Clock, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const recentPosts = [
  {
    title: "The journey of a packet",
    excerpt: "Understanding Kubernetes networking through a packet's perspective",
    date: "2 days ago",
    views: "1.2k",
    trending: true,
  },
  {
    title: "You don't need Vercel",
    excerpt: "Deploy Next.js with GitOps and K3s for full control",
    date: "1 week ago",
    views: "856",
    trending: false,
  },
]

export function OptimizedHero() {
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-8 px-6 border-b border-slate-800/50">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left: Tagline & Status */}
          <div className="space-y-4">
            <p className="text-lg text-slate-400 font-mono leading-relaxed">
              Notes about web dev, infrastructure, and some other stuff.
            </p>

            <div className="flex items-center space-x-3 text-sm font-mono">
              <div className="flex items-center space-x-2 text-theme-primary">
                <div className="w-2 h-2 bg-theme-primary rounded-full animate-pulse"></div>
                <span>Live</span>
              </div>
              <div className="text-slate-500">{currentTime}</div>
            </div>
          </div>

          {/* Center: Recent Posts Preview */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-mono font-semibold text-slate-300 uppercase tracking-wide">Recent Posts</h2>
              <TrendingUp className="w-4 h-4 text-theme-primary" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentPosts.map((post, index) => (
                <Card
                  key={index}
                  className="bg-slate-900/30 border-slate-800/50 hover:border-theme-primary/50 transition-all duration-300 cursor-pointer group"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-mono font-semibold text-slate-200 text-sm group-hover:text-theme-primary transition-colors line-clamp-1">
                        {post.title}
                      </h3>
                      {post.trending && (
                        <Badge
                          variant="secondary"
                          className="bg-theme-primary/10 text-theme-primary border-theme-primary/20 text-xs ml-2"
                        >
                          Hot
                        </Badge>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 font-mono mb-3 line-clamp-2">{post.excerpt}</p>

                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
