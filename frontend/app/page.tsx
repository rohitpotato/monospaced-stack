import type { Metadata } from 'next'
import { generateHomePageMetadata } from '@/lib/metadata'
import { getAllPosts } from '@/lib/posts'
import { generateBlogStructuredData, generateWebsiteStructuredData } from '@/lib/structured-data'
import HomePage from './__new/home-page'

export async function generateMetadata(): Promise<Metadata> {
  return generateHomePageMetadata()
}

export default async function Home() {
  const [allPosts] = await Promise.all([getAllPosts()])

  const websiteStructuredData = generateWebsiteStructuredData()
  const blogStructuredData = generateBlogStructuredData(allPosts)

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

      <div className="min-h-screen">
        <main>
          <HomePage posts={allPosts} />
        </main>
      </div>

    </>
  )
}
