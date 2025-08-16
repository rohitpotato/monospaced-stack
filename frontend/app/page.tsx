
import { getRecentPosts, getAllPosts } from "@/lib/posts"
import { Metadata } from "next"
import { generateHomePageMetadata } from "@/lib/metadata"
import { generateWebsiteStructuredData, generateBlogStructuredData } from "@/lib/structured-data"
import About from "@/components/about"
import PageWrapper from "@/components/page-wrapper"

export async function generateMetadata(): Promise<Metadata> {
  return generateHomePageMetadata()
}

export default async function HomePage() {
  const [recentPosts] = await Promise.all([getRecentPosts(2)])

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
      <PageWrapper>
        <div className="min-h-screen">
          <main>
            <About />
          </main>
        </div>
      </PageWrapper>
    </>
  )
}
