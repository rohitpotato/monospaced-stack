import { Calendar, Clock, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function BlogPost() {
  return (
    <article className="max-w-4xl">
      <header className="mb-12">
        <div className="flex items-center space-x-2 mb-6">
          <Badge variant="secondary" className="bg-emerald-400/10 text-emerald-400 border-emerald-400/20 font-mono">
            Kubernetes
          </Badge>
          <Badge variant="secondary" className="bg-blue-400/10 text-blue-400 border-blue-400/20 font-mono">
            Networking
          </Badge>
        </div>

        <h1 className="text-4xl md:text-5xl font-mono font-bold text-slate-100 mb-6 leading-tight">
          The journey of a packet
        </h1>

        <div className="flex items-center justify-between flex-wrap gap-4 text-sm text-slate-400 font-mono">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>July 30, 2025</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>8 min read</span>
            </div>
          </div>

          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100 hover:bg-slate-800/50">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </header>

      <div className="prose prose-invert prose-slate max-w-none">
        <div className="text-lg leading-relaxed text-slate-300 font-mono space-y-6">
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
        </div>
      </div>
    </article>
  )
}
