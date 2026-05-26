import type { PostCategoryGroup } from '@/lib/post-grouping'
import { formatChapterLabel } from '@/lib/post-grouping'
import { ChapterPostListItem } from './chapter-post-list-item'
import { FeaturedPostCard } from './featured-post-card'

interface ChapterSectionProps {
  group: PostCategoryGroup
}

export function ChapterSection({ group }: ChapterSectionProps) {
  const [featured, ...rest] = group.posts

  return (
    <section
      id={`chapter-${group.category.toLowerCase().replace(/\s+/g, '-')}`}
      className="border-divider border-b px-[var(--space-page-x)] py-[var(--space-section-y)]"
    >
      <div className="mx-auto max-w-page">
        <p className="editorial-section-label">
          {formatChapterLabel(group.chapterIndex, group.category)}
        </p>
        <hr className="editorial-rule my-6" />

        {featured && (
          <FeaturedPostCard post={featured} />
        )}

        {rest.length > 0 && (
          <ul className="mt-8 list-none divide-y divide-divider border-divider border-t p-0">
            {rest.map(post => (
              <ChapterPostListItem key={post.slug} post={post} />
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
