import type { Post } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { mdxComponents } from './markdown/mapping'

// GitHub-flavoured Markdown: tables, strikethrough, task lists, autolinks.
const mdxOptions = { mdxOptions: { remarkPlugins: [remarkGfm] } }

interface EnhancedBlogPostProps {
  post: Post
}

export function EnhancedBlogPost({ post }: EnhancedBlogPostProps) {
  return (
    <article className="w-full">
      <div className="editorial-prose max-w-none">
        <MDXRemote source={post.content} components={mdxComponents} options={mdxOptions} />
      </div>
    </article>
  )
}
