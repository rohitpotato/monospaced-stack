import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { ReaderHeader } from '@/components/layout/reader-header'
import { mdxComponents } from '@/components/markdown/mapping'
import { getAbout, getAllPosts } from '@/lib/posts'

export default async function About() {
  const [content, allPosts] = await Promise.all([getAbout(), getAllPosts()])
  return (
    <div className="min-h-screen bg-page text-inkBody">
      <ReaderHeader posts={allPosts} />
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
