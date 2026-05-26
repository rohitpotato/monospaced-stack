import Link from 'next/link'

export function SiteHero() {
  return (
    <section className="px-4 pt-[var(--space-section-y)] pb-[var(--space-section-gap)] sm:px-5">
      <p className="editorial-section-label">Portfolio</p>
      <h1 className="editorial-display mt-3 max-w-[16ch]">
        rohitpotato.xyz
      </h1>
      <hr className="editorial-rule my-5 max-w-[12rem]" />
      <p className="editorial-body max-w-[42ch] text-lg">
        Notes on software engineering, frontend craftsmanship, and infrastructure that ships.
      </p>

      <div className="mt-6 space-y-1.5">
        <p className="editorial-body">
          <span className="text-inkSubtle">Current:</span>
          {' '}
          <a
            href="https://zeptonow.com"
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link"
          >
            Zepto
          </a>
        </p>
        <p className="editorial-body">
          <span className="text-inkSubtle">Focus:</span>
          {' '}
          Frontend, observability, and platform systems.
        </p>
      </div>

      <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
        <Link href="/about" className="editorial-link text-sm">About</Link>
        <a href="/rss.xml" className="editorial-link text-sm">RSS</a>
        <a href="https://github.com/rohitpotato" target="_blank" rel="noopener noreferrer" className="editorial-link text-sm">GitHub</a>
        <a href="https://linkedin.com/in/rohitpotato" target="_blank" rel="noopener noreferrer" className="editorial-link text-sm">LinkedIn</a>
        <a href="https://twitter.com/rohitpotato" target="_blank" rel="noopener noreferrer" className="editorial-link text-sm">Twitter</a>
      </nav>
    </section>
  )
}
