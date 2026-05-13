import type { Post } from '@/lib/posts'
import Link from 'next/link'
import { EnhancedBlogPost } from '@/components/enhanced-blog-post'
import MinimalHeader from '@/components/minimal-header'
import { ThoughtPostNav } from '@/components/thought-post-nav'

interface ThoughtsArticleLayoutProps {
  post: Post
  allPosts: Post[]
}

export function ThoughtsArticleLayout({ post, allPosts }: ThoughtsArticleLayoutProps) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-page text-accent lg:h-[min(100dvh,100svh)]">
      <div className="w-full shrink-0 border-divider border-b bg-page lg:hidden">
        <MinimalHeader />
      </div>

      <div className="flex min-h-0 flex-1 flex-col lg:h-[min(100dvh,100svh)] lg:flex-row lg:overflow-hidden">
        <aside className="hidden border-divider lg:flex lg:h-full lg:min-h-0 lg:w-[26rem] lg:shrink-0 lg:flex-col lg:overflow-y-auto lg:border-r">
          <div className="border-divider border-b px-8 pb-7 pt-8">
            <Link href="/" className="andy-home-heading block no-underline">
              rohitpotato.xyz
            </Link>
            <p className="andy-description-text mt-3 max-w-[18ch]">
              Notes on frontend, infrastructure, and practical systems.
            </p>
            <div className="mt-5 flex items-center gap-5 text-[0.98rem] text-accent">
              <Link href="/about" className="andy-link">
                About
              </Link>
              <Link href="/rss.xml" className="andy-link">
                RSS
              </Link>
            </div>
          </div>
          <ThoughtPostNav posts={allPosts} />
        </aside>

        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto">
          <div className="px-5 py-8 sm:px-8 lg:px-11 lg:py-9">
            <EnhancedBlogPost post={post} />
          </div>
        </main>
      </div>
    </div>
  )
}
