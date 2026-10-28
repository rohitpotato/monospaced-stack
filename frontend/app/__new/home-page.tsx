import type { PostSummary } from '@/lib/post-summary'
import { DeliveryReceipt } from '@/components/home/delivery-receipt'
import { WritingList } from '@/components/home/writing-list'
import { NeighbourhoodMap } from '@/components/neighbourhood/neighbourhood-map'
import { SiteNav } from '@/components/site/site-nav'
import { SiteFooter, SocialLinks } from '@/components/site/social-links'

interface HomePageProps {
  posts: PostSummary[]
}

export default function HomePage({ posts }: HomePageProps) {
  return (
    <div className="min-h-[100dvh] bg-page text-inkBody">
      <div className="mx-auto w-full max-w-[var(--layout-wide-max)] px-[var(--space-page-x)] pb-16">
        <SiteNav />
        <p className="max-w-[46ch] font-serif text-lg leading-relaxed text-inkBody">
          Currently at
          {' '}
          <a href="https://zeptonow.com" target="_blank" rel="noopener noreferrer" className="editorial-link">Zepto</a>
          , managing web infra, productivity and performance.
        </p>
        <SocialLinks className="mt-4" />

        <div className="mx-auto mt-2 max-w-[60rem] sm:-mt-6">
          <NeighbourhoodMap posts={posts} />
        </div>

        <div className="mt-8 grid gap-10 border-t border-divider pt-8 md:grid-cols-[minmax(0,1fr)_20rem] md:gap-12">
          <WritingList posts={posts} />
          <div className="md:pt-10">
            <DeliveryReceipt />
          </div>
        </div>
        <SiteFooter />
      </div>
    </div>
  )
}
