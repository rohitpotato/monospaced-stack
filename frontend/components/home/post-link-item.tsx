import type { Post } from '@/lib/posts'
import Link from 'next/link'

interface PostLinkItemProps {
  post: Post
}

export function PostLinkItem({ post }: PostLinkItemProps) {
  return (
    <li className="border-divider border-b last:border-b-0">
      <Link
        href={`/thoughts/${post.slug}`}
        className="group block px-[var(--space-column-x)] py-4 transition-colors hover:bg-[var(--color-wash-hover)]"
      >
        <p className="andy-post-title font-body">
          {post.title}
        </p>
        <p className="mt-1.5 line-clamp-3 text-[1rem] leading-snug text-inkMuted">
          {post.summary}
        </p>
      </Link>
    </li>
  )
}
