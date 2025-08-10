import { Header } from "@/components/header"
import { EnhancedBlogPost } from "@/components/enhanced-blog-post"
import { TableOfContents } from "@/components/table-of-contents"
import { Footer } from "@/components/footer"

export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      <div className="container mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <TableOfContents />
          </aside>
          <main className="lg:col-span-3 order-1 lg:order-2">
            <EnhancedBlogPost />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
}
