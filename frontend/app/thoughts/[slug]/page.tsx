import { Header } from "@/components/header"
import { EnhancedBlogPost } from "@/components/enhanced-blog-post"
import { TableOfContents } from "@/components/table-of-contents"
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
        <div className="min-h-screen bg-slate-950 text-slate-100">
          <Header />
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
              <aside className="lg:col-span-1 order-2 lg:order-1">
                <TableOfContents headings={post.headings} title={post.title} />
              </aside>
              <main className="lg:col-span-3 order-1 lg:order-2">
                <EnhancedBlogPost post={post} />
              </main>
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  } catch {
    notFound()
  }
}
