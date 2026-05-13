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
        className="group relative block overflow-hidden px-[var(--space-column-x)] py-4 transition-colors hover:bg-[var(--color-wash-hover)]"
      >
        {post.backgroundIllustration && (
          <>
            <div
              className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.22] transition-opacity duration-150 group-hover:opacity-[0.3]"
              style={{ backgroundImage: `url(${post.backgroundIllustration})` }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(253,243,251,0.45),rgba(253,243,251,0.88))]" />
          </>
        )}
        <p className="andy-post-title font-body relative z-[1]">
          {post.title}
        </p>
        <p className="andy-post-summary relative z-[1] mt-2 line-clamp-3">
          {post.summary}
        </p>
      </Link>
    </li>
  )
}
