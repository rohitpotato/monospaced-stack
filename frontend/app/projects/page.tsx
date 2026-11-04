import type { Metadata } from 'next'
import { SiteNav } from '@/components/site/site-nav'
import { SiteFooter } from '@/components/site/social-links'
import { generateBaseMetadata } from '@/lib/metadata'
import { PROJECT_GROUPS } from '@/lib/projects'
import { SITE } from '@/lib/site'

export const metadata: Metadata = generateBaseMetadata({
  title: 'Projects',
  description: 'Open-source projects by Rohit: a GitOps homelab, a PromQL playground, Grafana dashboards and Svelte components.',
  url: `${SITE.url}/projects`,
})

export default function ProjectsPage() {
  return (
    <div className="min-h-[100dvh] bg-page text-inkBody">
      <div className="mx-auto w-full max-w-[44rem] px-[var(--space-page-x)] pb-16">
        <SiteNav />
        <h1 className="font-serif text-4xl font-medium text-ink sm:text-5xl">Projects</h1>
        <p className="mt-4 max-w-[52ch] font-serif text-lg leading-relaxed text-inkBody">
          Things I've built and open-sourced. More on
          {' '}
          <a href="https://github.com/rohitpotato" target="_blank" rel="noopener noreferrer me" className="editorial-link">GitHub</a>
          .
        </p>
        {PROJECT_GROUPS.map(group => (
          <section key={group.title} className="mt-12" aria-labelledby={`group-${group.title}`}>
            <h2 id={`group-${group.title}`} className="font-serif text-xl font-medium text-ink">{group.title}</h2>
            <ul className="mt-3 list-none p-0">
              {group.projects.map(project => (
                <li key={project.repo} className="border-t border-divider last:border-b">
                  <a href={`https://github.com/${project.repo}`} target="_blank" rel="noopener noreferrer" className="group block py-4">
                    <span className="flex items-baseline justify-between gap-4">
                      <span className="font-serif text-lg text-ink transition-colors group-hover:text-accent">{project.name}</span>
                      <span className="shrink-0 font-mono text-xs text-inkSubtle">{project.stack}</span>
                    </span>
                    <span className="mt-1 block font-serif text-base text-inkBody">{project.description}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <SiteFooter />
      </div>
    </div>
  )
}
