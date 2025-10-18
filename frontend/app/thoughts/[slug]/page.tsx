import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { EnhancedBlogPost } from '@/components/enhanced-blog-post'
import MinimalHeader from '@/components/minimal-header'
import { generateBlogPostMetadata, generateNotFoundMetadata } from '@/lib/metadata'
import { getPostBySlug, getPostSlugs } from '@/lib/posts'
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
    const post = await getPostBySlug(slug)

    const structuredData = generateBlogPostStructuredData(post)

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <div className="min-h-screen">
          <div className="sticky top-0 z-50 bg-gray-50/80 backdrop-blur-sm border-b border-gray-200">
            <div className="w-full">
              <MinimalHeader />
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 py-8">
            <EnhancedBlogPost post={post} />
          </div>
        </div>
      </>
    )
  }
  catch {
    notFound()
  }
}
