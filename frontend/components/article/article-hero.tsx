import type { Post } from '@/lib/posts'
import { format } from 'date-fns'

interface ArticleHeroProps {
  post: Post
}

export function ArticleHero({ post }: ArticleHeroProps) {
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
      </p>
    </header>
  )
}
