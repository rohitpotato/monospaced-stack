import { MDXRemote } from "next-mdx-remote/rsc"
import { mdxComponents } from "@/components/mdx-components"

interface MDXContentProps {
  content: string
}

export async function MDXContent({ content }: MDXContentProps) {
  return (
    <div className="prose prose-invert prose-slate max-w-none">
      <MDXRemote source={content} components={mdxComponents} />
    </div>
  )
}
