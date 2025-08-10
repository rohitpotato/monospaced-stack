import { Calendar, Clock } from "lucide-react"
import { BlogStats } from "@/components/blog-stats"
import { Post } from "@/lib/posts"
import { format } from "date-fns"
import { ReadingProgress } from "@/components/reading-progress"
import { MDXContent } from "@/components/mdx-content"
import ShareButton from "./share-button"

interface EnhancedBlogPostProps {
  post: Post
}

export function EnhancedBlogPost({ post }: EnhancedBlogPostProps) {

  return (
    <article className="max-w-4xl">
      <ReadingProgress />

      <header className="mb-12">

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-slate-100 mb-4 sm:mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-sm text-slate-400 font-mono space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <BlogStats slug={post.slug} stats={post.stats} />
            <ShareButton key={post.slug} post={post} />
          </div>
        </div>


      </header>

      {/* Article Content */}
      <div className="prose prose-invert prose-slate max-w-none">
        <div className="text-lg leading-relaxed text-slate-300 font-mono space-y-8">
          <div className="bg-slate-900/30 border-l-4 border-theme-primary p-6 rounded-r-lg backdrop-blur-sm">
            <p className="text-theme-primary font-semibold mb-2">TL;DR</p>
            <p className="text-slate-300">{post.summary}</p>
          </div>

          <MDXContent content={post.content} />
        </div>
      </div>
    </article>
  )
}
