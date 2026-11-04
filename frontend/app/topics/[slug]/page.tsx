import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { WritingList } from '@/components/home/writing-list'
import { SiteNav } from '@/components/site/site-nav'
import { SiteFooter } from '@/components/site/social-links'
import { generateBaseMetadata } from '@/lib/metadata'
import { toPostSummary } from '@/lib/post-summary'
import { getAllPosts } from '@/lib/posts'
import { SITE } from '@/lib/site'
import { topicsWithPosts } from '@/lib/topics'

interface TopicPageProps {
  params: Promise<{ slug: string }>
}

async function getTopic(slug: string) {
  return topicsWithPosts(await getAllPosts()).find(t => t.slug === slug)
}

export async function generateStaticParams() {
  return topicsWithPosts(await getAllPosts()).map(topic => ({ slug: topic.slug }))
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const topic = await getTopic((await params).slug)
  if (!topic)
    return {}
  return generateBaseMetadata({
    title: `${topic.name} posts`,
    description: topic.description,
    url: `${SITE.url}/topics/${topic.slug}`,
    keywords: [topic.name],
  })
}

export default async function TopicPage({ params }: TopicPageProps) {
  const topic = await getTopic((await params).slug)
  if (!topic)
    notFound()

  const url = `${SITE.url}/topics/${topic.slug}`
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': `${topic.name} posts`,
      'description': topic.description,
      'url': url,
      'mainEntity': {
        '@type': 'ItemList',
        'itemListElement': topic.posts.map((post, i) => ({
          '@type': 'ListItem',
          'position': i + 1,
          'url': `${SITE.url}/thoughts/${post.slug}`,
          'name': post.title,
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': SITE.url },
        { '@type': 'ListItem', 'position': 2, 'name': 'Topics', 'item': `${SITE.url}/topics` },
        { '@type': 'ListItem', 'position': 3, 'name': topic.name, 'item': url },
      ],
    },
  ]

  return (
    <div className="min-h-[100dvh] bg-page text-inkBody">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="mx-auto w-full max-w-[44rem] px-[var(--space-page-x)] pb-16">
        <SiteNav />
        <p className="font-mono text-xs tracking-wide text-accent uppercase">
          <a href="/topics" className="hover:text-ink">Topics</a>
          {' / '}
          {topic.posts.length}
          {' '}
          posts
        </p>
        <h1 className="mt-3 font-serif text-4xl font-medium text-ink sm:text-5xl">{topic.name}</h1>
        <p className="mt-4 max-w-[52ch] font-serif text-lg leading-relaxed text-inkBody">{topic.description}</p>
        <div className="mt-10">
          <WritingList posts={topic.posts.map(toPostSummary)} />
        </div>
        <SiteFooter />
      </div>
    </div>
  )
}
