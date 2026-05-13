import Link from 'next/link'

export function AboutColumn() {
  return (
    <section className="andy-column flex min-h-[18rem] flex-col md:h-[100dvh] md:w-[var(--column-width)] md:min-w-[var(--column-width)] md:overflow-y-auto">
      <div className="px-[var(--space-column-x)] py-[var(--space-column-y)]">
        <h1 className="andy-home-heading">
          rohitpotato.xyz
        </h1>

        <p className="andy-description-text mt-3 max-w-[22ch]">
          Portfolio notes on software engineering, frontend craftsmanship, and infrastructure that ships.
        </p>

        <div className="mt-8 space-y-2">
          <p className="andy-about-text">
            <span className="font-light text-[var(--color-ink-subtle)]">Current:</span>
            {' '}
            <a
              href="https://zeptonow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="andy-link"
            >
              Zepto
            </a>
          </p>
          <p className="andy-about-text">
            <span className="font-light text-[var(--color-ink-subtle)]">Focus:</span>
            {' '}
            Frontend, observability, and platform systems.
          </p>
        </div>
      </div>

      <div className="border-divider mt-auto border-t px-[var(--space-column-x)] py-4">
        <p className="andy-post-title mb-2 opacity-85">Socials</p>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <a href="https://github.com/rohitpotato" target="_blank" rel="noopener noreferrer" className="andy-link andy-post-title">GitHub</a>
          <a href="https://linkedin.com/in/rohitpotato" target="_blank" rel="noopener noreferrer" className="andy-link andy-post-title">LinkedIn</a>
          <a href="https://twitter.com/rohitpotato" target="_blank" rel="noopener noreferrer" className="andy-link andy-post-title">Twitter</a>
          <a href="mailto:rohitpotato@gmail.com" className="andy-link andy-post-title">Email</a>
          <a href="/rss.xml" className="andy-link andy-post-title">RSS</a>
          <Link href="/about" className="andy-link andy-post-title">About</Link>
        </nav>
      </div>
    </section>
  )
}
