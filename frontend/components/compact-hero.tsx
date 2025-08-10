"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function CompactHero() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="py-12 px-6 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "20px 20px",
            animation: "grid-move 20s linear infinite",
          }}
        />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-400/20 animate-pulse">
              <svg className="w-5 h-5 text-slate-950" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-mono font-bold tracking-tight bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 bg-clip-text text-transparent">
            Digital Backyard
          </h1>

          <p className="text-lg text-slate-400 font-mono max-w-2xl mx-auto">
            Notes about web dev, infrastructure, and some other stuff.
          </p>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center space-x-2 text-sm text-slate-500 hover:text-emerald-400 transition-colors font-mono group"
          >
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span>Currently exploring Kubernetes networking</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
          </button>

          {isExpanded && (
            <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-800/50 text-left max-w-2xl mx-auto animate-in slide-in-from-top-2 duration-300">
              <p className="text-sm text-slate-400 font-mono leading-relaxed">
                Welcome to my digital garden where I document my journey through the ever-evolving landscape of web
                development and infrastructure. From frontend frameworks to Kubernetes clusters, this is where I plant
                seeds of knowledge and watch them grow.
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(20px, 20px); }
        }
      `}</style>
    </section>
  )
}
