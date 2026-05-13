import type { Post } from '@/lib/posts'
import { format } from 'date-fns'
import { MDXRemote } from 'next-mdx-remote/rsc'
import React from 'react'
import Typography from '@/components/typography'
import { mdxComponents } from './markdown/mapping'

interface EnhancedBlogPostProps {
  post: Post
}

export function EnhancedBlogPost({ post }: EnhancedBlogPostProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy')
  }

  return (
    <article className="andy-blog-body w-full pb-8 pt-4">
      <header className="mb-10 border-divider border-b pb-7">
        <Typography variant="h1" className="andy-blog-title mb-4">
          {post.title}
        </Typography>
        <div className="flex items-center gap-4 text-[0.98rem] text-[var(--color-reading-ink-subtle)]">
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>
        {post.summary && (
          <p className="mt-5 max-w-[70ch] text-[1.1rem] leading-snug text-[var(--color-reading-ink-soft)]">
            {post.summary}
          </p>
        )}
      </header>

      <div className="andy-prose prose max-w-none prose-headings:font-display prose-headings:text-accent prose-strong:text-accent prose-hr:border-divider">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </article>
  )
}
