import { EnhancedBlogPost } from "@/components/enhanced-blog-post"
import TableOfContents from "@/components/table-of-contents"
import MobileTableOfContents from "@/components/mobile-table-of-contents"
import { Footer } from "@/components/footer"
import { getPostBySlug, getPostSlugs } from "@/lib/posts"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { generateBlogPostMetadata, generateNotFoundMetadata } from "@/lib/metadata"
import { generateBlogPostStructuredData } from "@/lib/structured-data"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const post = await getPostBySlug(slug)
    return generateBlogPostMetadata(post)
  } catch {
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 max-w-7xl mx-auto px-1">
          <div className="lg:col-span-1">
            <EnhancedBlogPost post={post} />
          </div>
          <div className="hidden lg:block lg:col-span-1">
            <TableOfContents headings={post.headings} title={post.title} />
          </div>
        </div>
        <MobileTableOfContents headings={post.headings} title={post.title} />
      </>
    )
  } catch {
    notFound()
  }
}
