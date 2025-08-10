import { Github, Twitter, Mail, Drum } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-slate-800/50 py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-slate-400 font-mono text-sm">
              © 2025 Digital Backyard. Built with Next.js and deployed on K3s.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <a href={process.env.NEXT_PUBLIC_GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-100 hover:bg-slate-800/50">
              <Github className="w-4 h-4" />
            </a>
            <a href={process.env.NEXT_PUBLIC_TWITTER_URL} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-100 hover:bg-slate-800/50">
              <Twitter className="w-4 h-4" />
            </a>
            <a href={`mailto:${process.env.NEXT_PUBLIC_MAIL_TO}`} className="text-slate-400 hover:text-slate-100 hover:bg-slate-800/50">
              <Mail className="w-4 h-4" />
            </a>
            <a href={process.env.NEXT_PUBLIC_SPOTIFY_URL} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-100 hover:bg-slate-800/50">
              <Drum className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer >
  )
}
