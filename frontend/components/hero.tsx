export function Hero() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-400/20">
              <svg className="w-6 h-6 text-slate-950" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-mono font-bold tracking-tight bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 bg-clip-text text-transparent">
            Digital Backyard
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 font-mono max-w-2xl mx-auto leading-relaxed">
            Notes about web dev, infrastructure, and some other stuff.
          </p>

          <div className="flex items-center justify-center space-x-2 text-sm text-slate-500 font-mono">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span>Currently exploring Kubernetes networking</span>
          </div>
        </div>
      </div>
    </section>
  )
}
