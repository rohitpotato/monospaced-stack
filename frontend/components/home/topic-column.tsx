import type { PostCategoryGroup } from '@/lib/post-grouping'
import { PostLinkItem } from './post-link-item'

interface TopicColumnProps {
  group: PostCategoryGroup
}

export function TopicColumn({ group }: TopicColumnProps) {
  return (
    <section className="andy-column flex min-h-[18rem] flex-col md:h-[100dvh] md:w-[var(--column-width)] md:min-w-[var(--column-width)] md:overflow-y-auto">
      <header className="border-divider border-b px-[var(--space-column-x)] py-5">
        <h2 className="font-display text-2xl font-bold text-accent">
          {group.category}
        </h2>
      </header>
      <ul className="m-0 list-none p-0">
        {group.posts.map(post => (
          <PostLinkItem key={post.slug} post={post} />
        ))}
      </ul>
    </section>
  )
}
