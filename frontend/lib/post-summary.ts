import type { Post } from '@/lib/posts'

export type Topic = 'frontend' | 'infra' | 'journey'

/** The slice of a post that client components need; keeps MDX bodies out of the bundle. */
export interface PostSummary {
  slug: string
  title: string
  category: string
  topic: Topic
  publishedAt: string
  summary: string
  readingMinutes: number
}

export const TOPIC_COLOR: Record<Topic, string> = {
  frontend: 'var(--color-topic-frontend)',
  infra: 'var(--color-topic-infra)',
  journey: 'var(--color-topic-journey)',
}

export function topicFor(category: string): Topic {
  const c = category.toLowerCase()
  if (c.startsWith('front'))
    return 'frontend'
  if (c.startsWith('infra'))
    return 'infra'
  return 'journey'
}

export function toPostSummary(post: Post): PostSummary {
  return {
    slug: post.slug,
    title: post.title,
    category: post.category,
    topic: topicFor(post.category),
    publishedAt: post.publishedAt,
    summary: post.summary,
    readingMinutes: Number.parseInt(post.readingTime, 10) || 1,
  }
}
