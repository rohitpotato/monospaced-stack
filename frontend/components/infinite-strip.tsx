"use client"

const techTags = [
  { name: "JAVASCRIPT", color: "text-yellow-400", bg: "bg-yellow-400/10" },
  { name: "PERFORMANCE", color: "text-red-400", bg: "bg-red-400/10" },
  { name: "REACT", color: "text-blue-400", bg: "bg-blue-400/10" },
  { name: "STATE MANAGEMENT", color: "text-purple-400", bg: "bg-purple-400/10" },
  { name: "THREE.JS", color: "text-green-400", bg: "bg-green-400/10" },
  { name: "KUBERNETES", color: "text-cyan-400", bg: "bg-cyan-400/10" },
  { name: "DEVOPS", color: "text-orange-400", bg: "bg-orange-400/10" },
  { name: "NEXT.JS", color: "text-slate-400", bg: "bg-slate-400/10" },
  { name: "TYPESCRIPT", color: "text-blue-300", bg: "bg-blue-300/10" },
  { name: "NODE.JS", color: "text-green-300", bg: "bg-green-300/10" },
]

export function InfiniteStrip() {
  // Duplicate the array for seamless infinite scroll
  const duplicatedTags = [...techTags, ...techTags]

  return (
    <section className="py-8 border-t border-slate-800/50 overflow-hidden">
      <div className="relative">
        <div className="flex animate-scroll space-x-6">
          {duplicatedTags.map((tag, index) => (
            <div
              key={`${tag.name}-${index}`}
              className={`
                flex-shrink-0 px-4 py-2 rounded-full border border-slate-700/50 
                ${tag.bg} ${tag.color} font-mono text-sm font-medium
                hover:scale-105 transition-transform cursor-pointer
                backdrop-blur-sm
              `}
            >
              {tag.name}
            </div>
          ))}
        </div>

        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  )
}
