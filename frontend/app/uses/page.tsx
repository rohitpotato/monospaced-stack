import type { Metadata } from 'next'
import { Link } from 'next-view-transitions'
import { SiteNav } from '@/components/site/site-nav'
import { SiteFooter } from '@/components/site/social-links'
import { generateBaseMetadata } from '@/lib/metadata'
import { SITE } from '@/lib/site'

export const metadata: Metadata = generateBaseMetadata({
  title: 'Uses',
  description: 'The tools, services and infrastructure Rohit uses: editor and AI tools, the k3s homelab cluster, and how this site is built and served.',
  url: `${SITE.url}/uses`,
})

const SECTIONS: { title: string, items: [string, string][] }[] = [
  {
    title: 'Writing code',
    items: [
      ['Machine', 'A Mac'],
      ['Editor', 'Cursor'],
      ['AI', 'Claude Code, in the terminal and from my phone with Remote Control'],
    ],
  },
  {
    title: 'The homelab',
    items: [
      ['Servers', '3 rented VPS nodes, ~4 vCPU and 4 GB each'],
      ['Kubernetes', 'k3s: one server, two workers'],
      ['GitOps', 'Argo CD, app of apps, from rohitpotato/k8s-apps'],
      ['Deploys', 'Argo Rollouts canaries'],
      ['Ingress', 'Traefik with the Gateway API, cert-manager for TLS'],
      ['Secrets', 'Vault and External Secrets'],
      ['Monitoring', 'kube-prometheus-stack, with alerts to Slack'],
      ['Agents', 'Claude Code in Kata microVMs, read-only RBAC'],
    ],
  },
  {
    title: 'This site',
    items: [
      ['Framework', 'Next.js, exported as static files'],
      ['Server', 'nginx, in the same cluster'],
      ['CDN', 'Cloudflare'],
      ['CI', 'GitHub Actions builds the image and bumps the tag in Git'],
      ['Analytics', 'GoatCounter, self-hosted'],
      ['Type', 'Newsreader, Inter and JetBrains Mono'],
    ],
  },
]

export default function UsesPage() {
  return (
    <div className="min-h-[100dvh] bg-page text-inkBody">
      <div className="mx-auto w-full max-w-[44rem] px-[var(--space-page-x)] pb-16">
        <SiteNav />
        <h1 className="font-serif text-4xl font-medium text-ink sm:text-5xl">Uses</h1>
        <p className="mt-4 max-w-[52ch] font-serif text-lg leading-relaxed text-inkBody">
          What I use to write code and run things. The cluster has its own page:
          {' '}
          <Link href="/homelab" className="editorial-link">the homelab</Link>
          .
        </p>
        {SECTIONS.map(section => (
          <section key={section.title} className="mt-12">
            <h2 className="font-serif text-xl font-medium text-ink">{section.title}</h2>
            <dl className="mt-3">
              {section.items.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[8rem_minmax(0,1fr)] gap-4 border-t border-divider py-3 last:border-b sm:grid-cols-[10rem_minmax(0,1fr)]">
                  <dt className="font-mono text-xs leading-6 text-inkSubtle">{k}</dt>
                  <dd className="font-serif text-base text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
        <SiteFooter />
      </div>
    </div>
  )
}
