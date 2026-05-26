import type { Post } from '@/lib/posts'
import { format } from 'date-fns'
import Link from 'next/link'

interface FeaturedPostCardProps {
  post: Post
}

export function FeaturedPostCard({ post }: FeaturedPostCardProps) {
  const date = format(new Date(post.publishedAt), 'MMM d, yyyy')

  return (
    <Link
      href={`/thoughts/${post.slug}`}
      className="group relative block overflow-hidden rounded-xl border border-divider bg-surface p-6 transition-colors hover:border-divider-strong sm:p-8"
    >
      {post.backgroundIllustration && (
        <>
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.14] transition-opacity group-hover:opacity-[0.22]"
            style={{ backgroundImage: `url(${post.backgroundIllustration})` }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface/40 via-surface/80 to-surface" />
        </>
      )}
      <div className="relative z-[1]">
        <span className="editorial-tag">{post.category}</span>
        <h3 className="editorial-chapter-title mt-5 max-w-[24ch]">
          {post.title}
        </h3>
        <p className="editorial-post-list-summary mt-3 max-w-[48ch]">
          {post.summary}
        </p>
        <p className="editorial-meta mt-5">
          {date}
          {' '}
          ·
          {' '}
          {post.readingTime}
        </p>
      </div>
    </Link>
  )
}
