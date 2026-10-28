import type { PostSummary } from '@/lib/post-summary'
import { HomeFeed } from '@/components/home/home-feed'
import { SiteNav } from '@/components/site/site-nav'
import { SiteFooter, SocialLinks } from '@/components/site/social-links'

interface HomePageProps {
  posts: PostSummary[]
}

export default function HomePage({ posts }: HomePageProps) {
  return (
    <div className="min-h-[100dvh] bg-page text-inkBody">
      <div className="mx-auto w-full max-w-[64rem] px-[var(--space-page-x)] pb-16">
        <SiteNav />
        <p className="max-w-[46ch] font-serif text-lg leading-relaxed text-inkBody sm:text-xl">
          Currently at
          {' '}
          <a href="https://zeptonow.com" target="_blank" rel="noopener noreferrer" className="editorial-link">Zepto</a>
          , managing web infra, productivity and performance.
        </p>
        <SocialLinks className="mt-4" />
        <HomeFeed posts={posts} />
        <SiteFooter />
      </div>
    </div>
  )
}
