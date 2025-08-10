import { Badge } from "@/components/ui/badge"

const techTags = [
  { name: "JAVASCRIPT", color: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20" },
  { name: "PERFORMANCE", color: "bg-red-400/10 text-red-400 border-red-400/20" },
  { name: "REACT", color: "bg-blue-400/10 text-blue-400 border-blue-400/20" },
  { name: "STATE MANAGEMENT", color: "bg-purple-400/10 text-purple-400 border-purple-400/20" },
  { name: "THREE.JS", color: "bg-green-400/10 text-green-400 border-green-400/20" },
  { name: "KUBERNETES", color: "bg-cyan-400/10 text-cyan-400 border-cyan-400/20" },
  { name: "DEVOPS", color: "bg-orange-400/10 text-orange-400 border-orange-400/20" },
  { name: "NEXT.JS", color: "bg-slate-400/10 text-slate-400 border-slate-400/20" },
]

export function TechTags() {
  return (
    <section className="py-16 px-6 border-t border-slate-800/50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-lg font-mono font-semibold text-slate-300 mb-8 text-center">Topics I write about</h2>

        <div className="flex flex-wrap justify-center gap-3">
          {techTags.map((tag) => (
            <Badge
              key={tag.name}
              variant="outline"
              className={`${tag.color} font-mono text-xs px-4 py-2 hover:scale-105 transition-transform cursor-pointer`}
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}
