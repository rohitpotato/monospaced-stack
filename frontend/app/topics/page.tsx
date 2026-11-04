import type { Metadata } from 'next'
import { Link } from 'next-view-transitions'
import { SiteNav } from '@/components/site/site-nav'
import { SiteFooter } from '@/components/site/social-links'
import { generateBaseMetadata } from '@/lib/metadata'
import { getAllPosts } from '@/lib/posts'
import { SITE } from '@/lib/site'
import { topicsWithPosts } from '@/lib/topics'

export const metadata: Metadata = generateBaseMetadata({
  title: 'Topics',
  description: 'Posts on rohitpotato.xyz grouped by topic: Kubernetes, observability, Next.js, performance and Prometheus.',
  url: `${SITE.url}/topics`,
})

export default async function TopicsPage() {
  const topics = topicsWithPosts(await getAllPosts())

  return (
    <div className="min-h-[100dvh] bg-page text-inkBody">
      <div className="mx-auto w-full max-w-[44rem] px-[var(--space-page-x)] pb-16">
        <SiteNav />
        <h1 className="font-serif text-4xl font-medium text-ink sm:text-5xl">Topics</h1>
        <ul className="mt-10 list-none p-0">
          {topics.map(topic => (
            <li key={topic.slug} className="border-t border-divider last:border-b">
              <Link href={`/topics/${topic.slug}`} className="group block py-5">
                <span className="flex items-baseline justify-between gap-4">
                  <span className="font-serif text-xl text-ink transition-colors group-hover:text-accent">{topic.name}</span>
                  <span className="shrink-0 font-mono text-xs text-inkSubtle">
                    {topic.posts.length}
                    {' '}
                    posts
                  </span>
                </span>
                <span className="mt-1 block max-w-[56ch] font-serif text-base text-inkBody">{topic.description}</span>
              </Link>
            </li>
          ))}
        </ul>
        <SiteFooter />
      </div>
    </div>
  )
}
