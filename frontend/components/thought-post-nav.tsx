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
                  'block px-4 py-3 text-accent no-underline transition-colors lg:px-8 lg:py-3',
                  'hover:bg-[var(--color-wash-hover)]',
                  active && 'bg-[var(--color-wash-active)] font-medium',
                )}
              >
                <span className="andy-post-title mb-1 block truncate font-body">
                  {post.title}
                </span>
                <span className="block truncate text-[0.98rem] text-inkMuted">
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
