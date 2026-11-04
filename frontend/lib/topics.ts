import type { Post } from '@/lib/posts'

/**
 * Topics with their own page at /topics/[slug]. A post joins a topic when one
 * of its frontmatter `tags` slugifies to the topic's slug. A topic page is only
 * built once it has MIN_POSTS_PER_TOPIC posts, so there are no thin pages.
 */
export interface Topic {
  slug: string
  name: string
  description: string
}

export const MIN_POSTS_PER_TOPIC = 3

export const TOPICS: Topic[] = [
  {
    slug: 'kubernetes',
    name: 'Kubernetes',
    description: 'Running Kubernetes for real: networking, GitOps, service meshes, observability and the homelab cluster this site runs on.',
  },
  {
    slug: 'observability',
    name: 'Observability',
    description: 'Logs, metrics and traces for frontend and platform engineers: Prometheus, Loki, OpenTelemetry and real user monitoring.',
  },
  {
    slug: 'nextjs',
    name: 'Next.js',
    description: 'Deploying, debugging and monitoring Next.js in production, from SSR memory leaks to self-hosting without Vercel.',
  },
  {
    slug: 'performance',
    name: 'Performance',
    description: 'Web and server performance: Core Web Vitals, real user data, and tracking down memory leaks in Node.js.',
  },
  {
    slug: 'prometheus',
    name: 'Prometheus',
    description: 'Prometheus in practice: exporting metrics from nginx and apps, PromQL, and the monitoring stack behind a small cluster.',
  },
]

export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/\.js\b/g, 'js')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function postsForTopic(posts: Post[], slug: string): Post[] {
  return posts.filter(post => post.tags.some(tag => tagSlug(tag) === slug))
}

/** Topics that have enough posts for a page, with their posts (newest first). */
export function topicsWithPosts(posts: Post[]): (Topic & { posts: Post[] })[] {
  return TOPICS
    .map(topic => ({ ...topic, posts: postsForTopic(posts, topic.slug) }))
    .filter(topic => topic.posts.length >= MIN_POSTS_PER_TOPIC)
}

/** Topic pages a post links to: only its tags that have a page. */
export function topicsForPost(post: Post, posts: Post[]): Topic[] {
  const live = new Set(topicsWithPosts(posts).map(t => t.slug))
  return TOPICS.filter(topic => live.has(topic.slug) && post.tags.some(tag => tagSlug(tag) === topic.slug))
}
