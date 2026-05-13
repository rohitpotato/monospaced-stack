import Link from 'next/link'
import React from 'react'

const MinimalHeader: React.FC = () => {
  return (
    <header className="border-divider border-b py-4">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="font-display text-xl font-bold text-accent transition-colors hover:text-accentSoft">
            rohitpotato.xyz
          </Link>
          <nav className="flex space-x-6">
            <Link href="/" className="text-inkMuted transition-colors hover:text-accent">
              Home
            </Link>
            <Link href="/about" className="text-inkMuted transition-colors hover:text-accent">
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default MinimalHeader
