import type { Post } from '@/lib/posts'
import type { Topic } from '@/lib/topics'
import { format } from 'date-fns'
import Link from 'next/link'

interface ArticleHeroProps {
  post: Post
  /** Topic pages this post belongs to; linked under the date. */
  topics?: Topic[]
}

export function ArticleHero({ post, topics = [] }: ArticleHeroProps) {
  const date = format(new Date(post.publishedAt), 'MMMM d, yyyy')

  return (
    <header className="site-shell pb-3 pt-6 sm:pt-8">
      <span className="editorial-tag">{post.category}</span>
      <h1 className="editorial-display mt-4 max-w-[22ch]">
        {post.title}
      </h1>
      <hr className="editorial-rule my-5 max-w-[10rem]" />
      <p className="editorial-post-list-summary max-w-[46ch]">
        {post.summary}
      </p>
      <p className="editorial-meta mt-4">
        {date}
        {' '}
        ·
        {' '}
        {post.readingTime}
        {post.updatedAt && (
          <>
            {' · '}
            <time dateTime={post.updatedAt}>
              Updated
              {' '}
              {format(new Date(post.updatedAt), 'MMMM d, yyyy')}
            </time>
          </>
        )}
      </p>
      {topics.length > 0 && (
        <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs">
          {topics.map(topic => (
            <Link key={topic.slug} href={`/topics/${topic.slug}`} className="text-inkSubtle transition-colors hover:text-accent">
              #
              {topic.name}
            </Link>
          ))}
        </p>
      )}
    </header>
  )
}
