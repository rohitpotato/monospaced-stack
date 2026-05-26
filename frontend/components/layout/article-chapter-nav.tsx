import type { Post } from '@/lib/posts'
import Link from 'next/link'

interface ArticleChapterNavProps {
  prev: Post | null
  next: Post | null
}

export function ArticleChapterNav({ prev, next }: ArticleChapterNavProps) {
  return (
    <nav
      aria-label="Article navigation"
      className="mt-12 pt-8"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {prev
          ? (
              <Link
                href={`/thoughts/${prev.slug}`}
                className="group block rounded-xl p-5 transition-colors hover:bg-[var(--color-wash-hover)]"
              >
                <span className="editorial-section-label">Previous</span>
                <span className="editorial-post-list-title mt-2 block group-hover:text-accent">
                  {prev.title}
                </span>
              </Link>
            )
          : <div />}
        {next
          ? (
              <Link
                href={`/thoughts/${next.slug}`}
                className="group block rounded-xl p-5 text-right transition-colors hover:bg-[var(--color-wash-hover)] sm:col-start-2"
              >
                <span className="editorial-section-label">Next</span>
                <span className="editorial-post-list-title mt-2 block group-hover:text-accent">
                  {next.title}
                </span>
              </Link>
            )
          : <div />}
      </div>
      <div className="mt-8 text-center">
        <Link href="/" className="editorial-link text-sm">
          ← All posts
        </Link>
      </div>
    </nav>
  )
}
