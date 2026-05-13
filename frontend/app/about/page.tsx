import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/components/markdown/mapping'
import MinimalHeader from '@/components/minimal-header'
import { getAbout } from '@/lib/posts'

export default async function About() {
  const content = await getAbout()
  return (
    <div className="min-h-screen bg-page text-accent">
      <div className="sticky top-0 z-50 border-divider border-b bg-page/95 backdrop-blur-sm">
        <div className="w-full">
          <MinimalHeader />
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <div className="andy-prose prose max-w-none prose-headings:font-display prose-headings:text-accent prose-strong:text-accent prose-hr:border-divider">
          <MDXRemote source={content} components={mdxComponents} />
        </div>
      </div>
    </div>
  )
}
