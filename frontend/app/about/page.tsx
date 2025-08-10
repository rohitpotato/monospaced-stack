import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      <Card className="max-w-2xl mx-auto my-8">
        <CardContent>
          A personal space for sharing thoughts and learnings about software development.

          Welcome to my digital garden—a space where I document my journey through software development, infrastructure, and web technologies. Here, you'll find my thoughts, learnings, and experiences as I explore the ever-evolving tech landscape.
        </CardContent>
      </Card>
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <Footer />
      </div>
    </div>
  )
}
