import type { Post } from '@/lib/posts'
import { PostFeed } from '@/components/home/post-feed'
import { SiteHero } from '@/components/home/site-hero'

interface HomePageProps {
  posts: Post[]
}

export default function HomePage({ posts }: HomePageProps) {
  return (
    <div className="min-h-[100dvh] bg-page text-inkBody">
      <div className="site-shell">
        <SiteHero />
        <PostFeed posts={posts} />
      </div>
    </div>
  )
}
