import Link from 'next/link'
import React from 'react'
import Typography from './typography'

const Header: React.FC = () => {
  return (
    <header className="bg-transparent mb-8 px-2">
      <div className="flex justify-between items-center p-2">
        <Link href="/">
          <h2 className="md:text-6xl text-3xl text-white font-extrabold" style={{ textShadow: '0 0 5px #fff, 0 0 10px #39FF14' }}>
            rohitpotato.xyz
          </h2>
        </Link>
        <Link href="/about" className="md:flex space-x-6 shrink-0">
          <Typography variant="bodyLarge" color="primary" className="hover:text-green-200 hover:underline">about me</Typography>
        </Link>
      </div>
    </header>
  )
}

export default Header
