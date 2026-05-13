import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ThoughtsArticleLayout } from '@/components/thoughts-article-layout'
import { generateBlogPostMetadata, generateNotFoundMetadata } from '@/lib/metadata'
import { getAllPosts, getPostBySlug, getPostSlugs } from '@/lib/posts'
import { generateBlogPostStructuredData } from '@/lib/structured-data'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return slugs.map(slug => ({
    slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const post = await getPostBySlug(slug)
    return generateBlogPostMetadata(post)
  }
  catch {
    return generateNotFoundMetadata()
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { slug } = await params
    const [post, allPosts] = await Promise.all([getPostBySlug(slug), getAllPosts()])

    const structuredData = generateBlogPostStructuredData(post)

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <ThoughtsArticleLayout post={post} allPosts={allPosts} />
      </>
    )
  }
  catch {
    notFound()
  }
}
