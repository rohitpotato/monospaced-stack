import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { topicsWithPosts } from '@/lib/topics'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://rohitpotato.xyz'
  const posts = await getAllPosts()
  const newest = new Date(posts[0]?.publishedAt ?? Date.now())

  // Static pages. The RSS feed isn't a page, so it isn't listed here.
  const staticPages = [
    {
      url: baseUrl,
      lastModified: newest,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/archive`,
      lastModified: newest,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/topics`,
      lastModified: newest,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date('2026-11-04'),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/uses`,
      lastModified: new Date('2026-11-04'),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/homelab`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
  ]

  // Topic pages, dated by their newest post
  const topicPages = topicsWithPosts(posts).map(topic => ({
    url: `${baseUrl}/topics/${topic.slug}`,
    lastModified: new Date(topic.posts[0].publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Blog post pages
  const blogPages = posts.map(post => ({
    url: `${baseUrl}/thoughts/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...topicPages, ...blogPages]
}
