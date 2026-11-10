import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/components/markdown/mapping'
import { SiteNav } from '@/components/site/site-nav'
import { SiteFooter } from '@/components/site/social-links'
import { generateBaseMetadata } from '@/lib/metadata'
import { getAbout } from '@/lib/posts'
import { SITE } from '@/lib/site'
import { generatePersonStructuredData } from '@/lib/structured-data'

export const metadata: Metadata = generateBaseMetadata({
  title: 'About Rohit Kashyap',
  description: 'Rohit Kashyap is a senior frontend engineer at Zepto in Bengaluru, working on web infra, productivity and performance, and running the k3s cluster this site is served from.',
  url: `${SITE.url}/about`,
})

export default async function About() {
  const content = await getAbout()
  return (
    <div className="min-h-[100dvh] bg-page text-inkBody">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePersonStructuredData()) }}
      />
      <div className="mx-auto w-full max-w-[44rem] px-[var(--space-page-x)] pb-16">
        <SiteNav />
        <h1 className="font-serif text-4xl font-medium text-ink sm:text-5xl">About</h1>
        <div className="editorial-prose mt-8 max-w-none">
          <MDXRemote source={content} components={mdxComponents} />
        </div>
        <SiteFooter />
      </div>
    </div>
  )
}
