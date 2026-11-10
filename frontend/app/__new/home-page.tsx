import type { PostSummary } from '@/lib/post-summary'
import { HomeFeed } from '@/components/home/home-feed'
import { SiteNav } from '@/components/site/site-nav'
import { SocialLinks } from '@/components/site/social-links'

interface HomePageProps {
  posts: PostSummary[]
}

export default function HomePage({ posts }: HomePageProps) {
  return (
    <div className="min-h-[100dvh] bg-page text-inkBody">
      <div className="w-full px-[var(--space-page-x)] pb-16 min-[1100px]:px-[72px]">
        <HomeFeed
          posts={posts}
          intro={(
            <>
              <SiteNav />
              <h1 className="mt-4 max-w-[40ch] font-serif text-xl font-normal leading-relaxed text-inkBody sm:text-[1.375rem]">
                <span className="text-ink">Rohit Kashyap</span>
                , currently at
                {' '}
                <a href="https://zeptonow.com" target="_blank" rel="noopener noreferrer" className="editorial-link">Zepto</a>
                , managing web infra, productivity and performance.
              </h1>
              <SocialLinks className="mt-6" />
            </>
          )}
        />
      </div>
    </div>
  )
}
