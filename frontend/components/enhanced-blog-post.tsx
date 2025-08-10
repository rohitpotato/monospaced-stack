"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, Share2, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { BlogStats } from "@/components/blog-stats"

export function EnhancedBlogPost() {
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
    <article className="max-w-4xl">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-800 z-50">
        <div
          className="h-full bg-gradient-to-r from-theme-primary to-theme-secondary transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <header className="mb-12">
        <div className="flex items-center space-x-2 mb-6">
          <Badge
            variant="secondary"
            className="bg-theme-primary/10 text-theme-primary border-theme-primary/20 font-mono"
          >
            Kubernetes
          </Badge>
          <Badge
            variant="secondary"
            className="bg-theme-secondary/10 text-theme-secondary border-theme-secondary/20 font-mono"
          >
            Networking
          </Badge>
          <Badge variant="secondary" className="bg-theme-accent/10 text-theme-accent border-theme-accent/20 font-mono">
            Infrastructure
          </Badge>
        </div>

        <h1 className="text-4xl md:text-5xl font-mono font-bold text-slate-100 mb-6 leading-tight">
          The journey of a packet
        </h1>

        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center space-x-6 text-sm text-slate-400 font-mono">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>July 30, 2025</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>8 min read</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <BlogStats slug="journey-of-a-packet" />
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100 hover:bg-slate-800/50">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Author Card */}
        <Card className="bg-slate-900/30 border-slate-800/50 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-theme-primary to-theme-secondary rounded-full flex items-center justify-center">
                <span className="text-slate-950 font-mono font-bold">RK</span>
              </div>
              <div>
                <h3 className="font-mono font-semibold text-slate-200">Rohit Kumar</h3>
                <p className="text-sm text-slate-400 font-mono">
                  Full-stack developer exploring the depths of infrastructure
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </header>

      {/* Article Content */}
      <div className="prose prose-invert prose-slate max-w-none">
        <div className="text-lg leading-relaxed text-slate-300 font-mono space-y-8">
          <div className="bg-slate-900/30 border-l-4 border-theme-primary p-6 rounded-r-lg backdrop-blur-sm">
            <p className="text-theme-primary font-semibold mb-2">TL;DR</p>
            <p className="text-slate-300">
              Follow a data packet's journey through a Kubernetes cluster to understand networking fundamentals, from
              pods and services to DNS resolution and security policies.
            </p>
          </div>

          <p>
            Imagine you're a packet of data, zipping through a Kubernetes cluster, carrying a message from one app to
            another. Your journey is full of twists—finding the right destination, navigating secure paths, and avoiding
            dead ends. As a developer new to infrastructure, I found Kubernetes networking daunting, but tracing a
            packet's path made it click.
          </p>

          <p>
            In this post, we'll follow that packet to understand Kubernetes' core building blocks—pods, deployments, and
            services. We'll explore how they communicate, why their IPs shift like sand, how names keep things stable,
            and how tools like Cilium secure the journey. This is my story of unraveling Kubernetes networking, step by
            step, and I'm sharing it for anyone curious about how apps talk to each other in the cloud.
          </p>

          <Card className="bg-slate-900/30 border-slate-800/50 backdrop-blur-sm my-8">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <BookOpen className="w-5 h-5 text-theme-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-mono font-semibold text-slate-200 mb-2">What you'll learn</h4>
                  <ul className="text-sm text-slate-400 space-y-1 font-mono">
                    <li>• How packets navigate Kubernetes clusters</li>
                    <li>• The role of pods, services, and DNS</li>
                    <li>• Network policies and security</li>
                    <li>• Tools like Cilium for advanced networking</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-mono font-bold text-slate-100 mt-12 mb-6">
            Step 1: A Packet's Journey Begins—Entering the Cluster
          </h2>

          <p>
            Our story begins at the edge of a Kubernetes cluster. Picture a bustling digital city where our packet—let's
            call it "Packy"—arrives at the front gate. Packy carries a simple HTTP request: a user wants to check their
            account balance in a banking application.
          </p>

          <div className="bg-slate-900/50 border border-slate-800/50 rounded-lg p-4 my-6 font-mono text-sm">
            <div className="text-theme-primary mb-2"># Packet arrives at the cluster</div>
            <div className="text-slate-300">
              <span className="text-theme-secondary">Source:</span> 192.168.1.100:54321
              <br />
              <span className="text-theme-secondary">Destination:</span> banking-app.example.com:443
              <br />
              <span className="text-theme-secondary">Payload:</span> GET /api/balance HTTP/1.1
            </div>
          </div>

          <p>
            But here's the first challenge: Kubernetes doesn't know about "banking-app.example.com" directly. The
            cluster needs to translate this human-friendly name into something it can work with—an internal service
            address.
          </p>
        </div>
      </div>

      {/* Related Posts */}
      <div className="mt-16 pt-8 border-t border-slate-800/50">
        <h3 className="text-xl font-mono font-bold text-slate-200 mb-6">Related Posts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-slate-900/30 border-slate-800/50 hover:border-theme-primary/50 transition-all cursor-pointer">
            <CardContent className="p-4">
              <h4 className="font-mono font-semibold text-slate-200 mb-2">You don't need Vercel</h4>
              <p className="text-sm text-slate-400 font-mono">Deploy Next.js with GitOps and K3s</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/30 border-slate-800/50 hover:border-theme-primary/50 transition-all cursor-pointer">
            <CardContent className="p-4">
              <h4 className="font-mono font-semibold text-slate-200 mb-2">The quest for control</h4>
              <p className="text-sm text-slate-400 font-mono">From Frontend to Infrastructure</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </article>
  )
}
