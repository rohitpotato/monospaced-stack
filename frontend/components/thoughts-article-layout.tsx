import type { Post } from '@/lib/posts'
import { ArticleHero } from '@/components/article/article-hero'
import { EnhancedBlogPost } from '@/components/enhanced-blog-post'
import { ArticleChapterNav } from '@/components/layout/article-chapter-nav'
import { ReaderHeader } from '@/components/layout/reader-header'
import { getAdjacentPosts } from '@/lib/post-navigation'

interface ThoughtsArticleLayoutProps {
  post: Post
  allPosts: Post[]
}

export function ThoughtsArticleLayout({ post, allPosts }: ThoughtsArticleLayoutProps) {
  const { prev, next } = getAdjacentPosts(allPosts, post.slug)

  return (
    <div className="min-h-[100dvh] bg-page text-inkBody">
      <ReaderHeader posts={allPosts} />
      <ArticleHero post={post} />
      <main className="site-shell py-6 sm:py-8">
        <EnhancedBlogPost post={post} />
        <ArticleChapterNav prev={prev} next={next} />
      </main>
    </div>
  )
}
