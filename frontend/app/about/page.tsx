import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { ReaderHeader } from '@/components/layout/reader-header'
import { mdxComponents } from '@/components/markdown/mapping'
import { getAbout } from '@/lib/posts'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description: 'Rohit Kashyap manages web infra, productivity and performance at Zepto. Who he is, what he has worked on, and how to reach him.',
  openGraph: {
    type: 'profile',
    url: '/about',
    siteName: SITE.name,
    title: 'About Rohit Kashyap',
    description: 'Rohit Kashyap manages web infra, productivity and performance at Zepto. Who he is, what he has worked on, and how to reach him.',
    images: [SITE.ogImage],
  },
  alternates: { canonical: '/about' },
}

export default async function About() {
  const content = await getAbout()
  return (
    <div className="min-h-screen bg-page text-inkBody">
      <ReaderHeader />
      <div className="site-shell py-12">
        <p className="editorial-section-label">About</p>
        <h1 className="editorial-display mt-4">Who writes here</h1>
        <hr className="editorial-rule my-8 max-w-[10rem]" />
        <div className="editorial-prose max-w-none">
          <MDXRemote source={content} components={mdxComponents} />
        </div>
        <p className="mt-10">
          <Link href="/" className="editorial-link text-sm">← Back to index</Link>
        </p>
      </div>
    </div>
  )
}
