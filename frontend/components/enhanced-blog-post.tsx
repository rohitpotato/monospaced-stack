import type { Post } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from './markdown/mapping'

interface EnhancedBlogPostProps {
  post: Post
}

export function EnhancedBlogPost({ post }: EnhancedBlogPostProps) {
  return (
    <article className="w-full">
      <div className="editorial-prose max-w-none">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </article>
  )
}
