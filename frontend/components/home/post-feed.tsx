import type { Post } from '@/lib/posts'
import { PostFeedItem } from './post-feed-item'

interface PostFeedProps {
  posts: Post[]
}

export function PostFeed({ posts }: PostFeedProps) {
  return (
    <section className="pb-[var(--space-section-y)] pt-[var(--space-section-gap)]">
      <p className="editorial-section-label mb-4 px-4 sm:px-5">Writing</p>
      <ul className="flex list-none flex-col gap-1 p-0">
        {posts.map(post => (
          <PostFeedItem key={post.slug} post={post} />
        ))}
      </ul>
    </section>
  )
}
