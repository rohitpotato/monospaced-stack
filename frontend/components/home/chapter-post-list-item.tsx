import type { Post } from '@/lib/posts'
import { format } from 'date-fns'
import Link from 'next/link'

interface ChapterPostListItemProps {
  post: Post
}

export function ChapterPostListItem({ post }: ChapterPostListItemProps) {
  const date = format(new Date(post.publishedAt), 'MMM d, yyyy')

  return (
    <li className="border-divider border-b last:border-b-0">
      <Link
        href={`/thoughts/${post.slug}`}
        className="group block py-4 transition-colors hover:bg-[var(--color-wash-hover)] sm:py-5"
      >
        <p className="editorial-post-list-title group-hover:text-accent">
          {post.title}
        </p>
        <p className="editorial-post-list-summary mt-1.5 line-clamp-2 max-w-[52ch]">
          {post.summary}
        </p>
        <p className="editorial-meta mt-2">
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
