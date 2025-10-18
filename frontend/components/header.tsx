import Link from 'next/link'
import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="py-6">
      <div className="flex flex-col space-y-4">
        {/* Site title and navigation */}
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-semibold text-gray-900 hover:text-orange-600 transition-colors">
            rohitpotato.xyz
          </Link>
          <nav className="flex space-x-6">
            <Link href="/about" className="text-gray-600 hover:text-orange-600 transition-colors">
              About
            </Link>
            <Link href="/thoughts" className="text-gray-600 hover:text-orange-600 transition-colors">
              Thoughts
            </Link>
          </nav>
        </div>

        {/* Bio section */}
        <div className=" pt-1">
          <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
            Current working at:
            {' '}
            <a href="https://zeptonow.com" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 transition-colors">Zepto</a>

          </p>
          <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
            Exploring: Frontend, Infrastructure, and some other stuff.
          </p>

          {/* Social links */}
          <div className="flex space-x-4 mt-5">
            <a
              href="https://twitter.com/rohitpotato"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-orange-600 transition-colors text-sm"
            >
              Twitter
            </a>
            <a
              href="https://github.com/rohitpotato"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-orange-600 transition-colors text-sm"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/rohitpotato"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-orange-600 transition-colors text-sm"
            >
              LinkedIn
            </a>
            <a
              href="/rss"
              className="text-gray-500 hover:text-orange-600 transition-colors text-sm"
            >
              RSS
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
