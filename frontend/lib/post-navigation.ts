import type { Post } from '@/lib/posts'

export interface AdjacentPosts {
  prev: Post | null
  next: Post | null
}

export function getAdjacentPosts(posts: Post[], slug: string): AdjacentPosts {
  const index = posts.findIndex(p => p.slug === slug)
  if (index === -1) {
    return { prev: null, next: null }
  }

  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  }
}
