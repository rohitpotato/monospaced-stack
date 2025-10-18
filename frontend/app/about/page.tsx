import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/components/markdown/mapping'
import MinimalHeader from '@/components/minimal-header'
import { getAbout } from '@/lib/posts'

export default async function About() {
  const content = await getAbout()
  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-50 bg-gray-50/80 backdrop-blur-sm border-b border-gray-200">
        <div className="w-full">
          <MinimalHeader />
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-orange-600 prose-a:no-underline hover:prose-a:text-orange-700 prose-strong:text-gray-900 prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200">
          <MDXRemote source={content} components={mdxComponents} />
        </div>
      </div>
    </div>
  )
}
