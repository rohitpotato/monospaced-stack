import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const blogPosts = [
  {
    id: 1,
    title: "The journey of a packet",
    description: "Understanding Kubernetes Building Blocks: Pods, Deployments, and Services",
    date: "July 30, 2025",
    readTime: "8 min read",
    tags: ["Kubernetes", "Networking"],
    icon: "🌐",
  },
  {
    id: 2,
    title: "You don't need vercel: Deploy a Next.js app with GitOps and K3s",
    description: "You don't need vercel: Deploy a Next.js app with GitOps and K3s",
    date: "July 22, 2025",
    readTime: "12 min read",
    tags: ["Next.js", "DevOps"],
    icon: "⚡",
  },
  {
    id: 3,
    title: "The quest for control",
    description: "From Frontend to Infrastructure: A Developer's Quest for Control",
    date: "July 18, 2025",
    readTime: "6 min read",
    tags: ["Infrastructure", "DevOps"],
    icon: "🎯",
  },
]

export function BlogGrid() {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="bg-slate-900/50 border-slate-800/50 hover:border-slate-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/5 group cursor-pointer"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-2xl">{post.icon}</div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                </div>
                <h3 className="text-lg font-mono font-semibold text-slate-100 group-hover:text-emerald-400 transition-colors leading-tight">
                  {post.title}
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{post.description}</p>

                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-slate-800/50 text-slate-300 hover:bg-emerald-400/10 hover:text-emerald-400 text-xs font-mono"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 font-mono pt-2 border-t border-slate-800/50">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
