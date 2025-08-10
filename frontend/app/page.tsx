import { Header } from "@/components/header"
import { OptimizedHero } from "@/components/optimized-hero"
import { BlogGrid } from "@/components/blog-grid"
import { InfiniteStrip } from "@/components/infinite-strip"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      <main>
        <OptimizedHero />
        <BlogGrid />
        <InfiniteStrip />
      </main>
      <Footer />
    </div>
  )
}
