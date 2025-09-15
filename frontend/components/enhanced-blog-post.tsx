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
    <article className="w-full py-8">
      {/* Header */}
      <header className="mb-12">
        <Typography variant="h1" className="mb-6">
          {post.title}
        </Typography>
        <div className="flex items-center gap-4 text-green-500 text-sm">
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>
        {post.summary && (
          <p className="mt-6 text-lg text-green-500 leading-relaxed">
            {post.summary}
          </p>
        )}
      </header>

      {/* Content */}
      <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </article>
  )
}
