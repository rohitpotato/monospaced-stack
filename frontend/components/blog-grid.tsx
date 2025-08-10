import { Calendar, Clock, ArrowRight } from "lucide-react"
import { DynamicIcon } from 'lucide-react/dynamic';

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Link from "next/link"
import { Post } from "@/lib/posts"
import { format } from "date-fns"

interface BlogGridProps {
  posts: Post[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 grid-auto-rows-[1fr]">
          {posts.map((post) => (
            <Link key={post.slug} href={`/thoughts/${post.slug}`}>
              <Card className="bg-slate-900/50 border-slate-800/50 hover:border-slate-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/5 group cursor-pointer h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    {post.icon && <DynamicIcon name={post.icon || ''} className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />}
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <h3 className="text-lg font-mono font-semibold text-slate-100 group-hover:text-emerald-400 transition-colors leading-tight">
                    {post.title}
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{post.summary}</p>

                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono pt-2 border-t border-slate-800/50">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{format(new Date(post.publishedAt), "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
