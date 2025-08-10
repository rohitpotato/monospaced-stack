import { Post } from "@/lib/posts"
import { format } from "date-fns"

interface SimpleBlogPostProps {
  post: Post
}

export function SimpleBlogPost({ post }: SimpleBlogPostProps) {
  return (
    <article className="max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-100 mb-4">{post.title}</h1>
        <div className="flex items-center space-x-4 text-sm text-slate-400">
          <span>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</span>
          <span>{post.readingTime}</span>
        </div>
        <p className="text-slate-300 mt-4">{post.summary}</p>
      </header>

      <div className="prose prose-invert prose-slate max-w-none">
        <div 
          className="text-lg leading-relaxed text-slate-300"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  )
}
