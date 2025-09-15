import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/components/markdown/mapping'
import { getAbout } from '@/lib/posts'

export default async function About() {
  const content = await getAbout()
  return (
    <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200">
      <MDXRemote source={content} components={mdxComponents} />
    </div>
  )
}
