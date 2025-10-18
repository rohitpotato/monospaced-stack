import Link from 'next/link'
import React from 'react'

const MinimalHeader: React.FC = () => {
  return (
    <header className="py-4 border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-gray-900 hover:text-orange-600 transition-colors">
            rohitpotato.xyz
          </Link>
          <nav className="flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-orange-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-orange-600 transition-colors">
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default MinimalHeader
