import type { Metadata } from 'next'
import { TraceArchive } from '@/components/archive/trace-archive'
import { SiteNav } from '@/components/site/site-nav'
import { SiteFooter } from '@/components/site/social-links'
import { toPostSummary } from '@/lib/post-summary'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Archive',
  description: 'Every post on rohitpotato.xyz, laid out as spans in a single trace.',
  alternates: { canonical: '/archive' },
}

export default async function ArchivePage() {
  const posts = (await getAllPosts()).map(toPostSummary)

  return (
    <div className="min-h-[100dvh] bg-page text-inkBody">
      <div className="mx-auto w-full max-w-[var(--layout-wide-max)] px-[var(--space-page-x)] pb-16">
        <SiteNav />
        <h1 className="font-serif text-4xl font-medium text-ink sm:text-5xl">Archive</h1>
        <div className="mt-3">
          <TraceArchive posts={posts} />
        </div>
        <SiteFooter />
      </div>
    </div>
  )
}
