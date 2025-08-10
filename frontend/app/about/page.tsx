import { Header } from "@/components/header"
import { ArtisticAbout } from "@/components/artistic-about"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      <ArtisticAbout />
      <Footer />
    </div>
  )
}
