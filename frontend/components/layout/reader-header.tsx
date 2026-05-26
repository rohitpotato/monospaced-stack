'use client'

import type { Post } from '@/lib/posts'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface PostIndexDrawerProps {
  posts: Post[]
  open: boolean
  onClose: () => void
}

export function PostIndexDrawer({ posts, open, onClose }: PostIndexDrawerProps) {
  useEffect(() => {
    if (!open) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        aria-label="Close index"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Post index"
        className="absolute top-0 right-0 flex h-full w-full max-w-md flex-col border-divider border-l bg-surface shadow-2xl"
      >
        <div className="flex items-center justify-between border-divider border-b px-5 py-4">
          <p className="editorial-section-label">Index</p>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-inkMuted transition-colors hover:text-accent"
          >
            Close
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="list-none space-y-1 p-0">
            {posts.map(post => (
              <li key={post.slug}>
                <Link
                  href={`/thoughts/${post.slug}`}
                  onClick={onClose}
                  className={cn(
                    'block rounded-md px-3 py-2.5 transition-colors hover:bg-[var(--color-wash-hover)]',
                  )}
                >
                  <span className="editorial-section-label text-[0.62rem]">{post.category}</span>
                  <span className="editorial-post-list-title mt-1 block">{post.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  )
}

interface ReaderHeaderProps {
  posts: Post[]
}

export function ReaderHeader({ posts }: ReaderHeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 bg-page/90 backdrop-blur-md">
        <div className="site-shell flex items-center justify-between gap-4 py-3.5">
          <Link href="/" className="text-sm font-medium text-accent transition-opacity hover:opacity-80">
            rohitpotato.xyz
          </Link>
          <div className="hidden min-w-0 flex-1 px-6 sm:block">
            <div className="h-px w-full bg-divider">
              <div
                className="h-px bg-accentCta transition-[width] duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="shrink-0 text-sm text-inkMuted transition-colors hover:text-accent"
          >
            Index
          </button>
        </div>
      </header>
      <PostIndexDrawer
        posts={posts}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  )
}
