import type { Post } from '@/lib/posts'
import { format } from 'date-fns'
import Link from 'next/link'

interface PostFeedItemProps {
  post: Post
}

export function PostFeedItem({ post }: PostFeedItemProps) {
  const date = format(new Date(post.publishedAt), 'MMM d, yyyy')

  return (
    <li>
      <Link
        href={`/thoughts/${post.slug}`}
        className="group block rounded-xl px-4 py-5 transition-colors hover:bg-[var(--color-wash-hover)] sm:px-5 sm:py-6"
      >
        <span className="editorial-tag">{post.category}</span>
        <h2 className="editorial-chapter-title mt-3 max-w-[48ch] group-hover:text-[var(--color-accent-purple-soft)]">
          {post.title}
        </h2>
        <p className="editorial-post-list-summary mt-2 max-w-[62ch]">
          {post.summary}
        </p>
        <p className="editorial-meta mt-3">
          {date}
          {' '}
          ·
          {' '}
          {post.readingTime}
        </p>
      </Link>
    </li>
  )
}
