'use client'

import type { Post } from '@/lib/posts'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface ThoughtPostNavProps {
  posts: Post[]
}

export function ThoughtPostNav({ posts }: ThoughtPostNavProps) {
  const pathname = usePathname()

  return (
    <nav aria-label="All posts">
      <ul className="m-0 list-none divide-y divide-divider border-divider border-b p-0 lg:border-0">
        {posts.map((post) => {
          const href = `/thoughts/${post.slug}`
          const active = pathname === href

          return (
            <li key={post.slug} className="list-none">
              <Link
                href={href}
                prefetch
                className={cn(
                  'relative block overflow-hidden px-4 py-3 text-accent no-underline transition-colors lg:px-8 lg:py-3',
                  'hover:bg-[var(--color-wash-hover)]',
                  active && 'bg-[var(--color-wash-active)] font-medium',
                )}
              >
                {post.backgroundIllustration && (
                  <>
                    <span
                      className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.18]"
                      style={{ backgroundImage: `url(${post.backgroundIllustration})` }}
                    />
                    <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(253,243,251,0.52),rgba(253,243,251,0.9))]" />
                  </>
                )}
                <span className="andy-post-title relative z-[1] mb-1 block truncate font-body">
                  {post.title}
                </span>
                <span className="andy-post-summary relative z-[1] block truncate">
                  {post.summary}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
