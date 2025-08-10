import { Header } from "@/components/header"
import { OptimizedHero } from "@/components/optimized-hero"
import { BlogGrid } from "@/components/blog-grid"
import { InfiniteStrip } from "@/components/infinite-strip"
import { Footer } from "@/components/footer"
import { getRecentPosts, getAllPosts } from "@/lib/posts"
import { Metadata } from "next"
import { generateHomePageMetadata } from "@/lib/metadata"
import { generateWebsiteStructuredData, generateBlogStructuredData } from "@/lib/structured-data"

export async function generateMetadata(): Promise<Metadata> {
  return generateHomePageMetadata()
}

export default async function HomePage() {
  const [recentPosts, allPosts] = await Promise.all([getRecentPosts(2), getAllPosts()])

  const websiteStructuredData = generateWebsiteStructuredData()
  const blogStructuredData = generateBlogStructuredData(recentPosts)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
      />
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Header />
        <main>
          <OptimizedHero recentPosts={recentPosts} />
          <BlogGrid posts={allPosts} />
          <InfiniteStrip />
        </main>
        <Footer />
      </div>
    </>
  )
}
