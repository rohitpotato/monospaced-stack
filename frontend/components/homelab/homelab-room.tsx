'use client'

import type { FigureName } from './hairline-figure'
import type { ClusterNode, ClusterStatus } from '@/hooks/use-cluster-status'
import type { PostSummary } from '@/lib/post-summary'
import { format, formatDistanceToNowStrict, parseISO } from 'date-fns'
import { useReducedMotion } from 'framer-motion'
import { Link } from 'next-view-transitions'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { useMediaQuery } from 'usehooks-ts'
import { Drawer } from 'vaul'
import { useClusterStatus } from '@/hooks/use-cluster-status'
import { useLabNotebook } from '@/hooks/use-lab-notebook'
import { HairlineFigure } from './hairline-figure'
import { POTATO_QUIPS, REPO_URL, STACK } from './homelab-content'
import { Sparkline } from './sparkline'

type SectionId = 'nodes' | 'deploys' | 'path' | 'stack' | 'potato'

// Missing metrics come back as null; show a dash rather than a misleading 0.
const pct = (n: number | null) => (n == null ? '—' : `${Math.round(n * 100)}%`)
const days = (s: number | null) => (s == null ? '—' : `${Math.floor(s / 86400)}d`)

// The five things you can open.
const SECTIONS: { id: SectionId, n: number, title: string }[] = [
  { id: 'nodes', n: 1, title: 'The nodes' },
  { id: 'deploys', n: 2, title: 'What changed lately' },
  { id: 'path', n: 3, title: 'How this page got to you' },
  { id: 'stack', n: 4, title: 'What runs here' },
  { id: 'potato', n: 5, title: 'The potato' },
]
const TITLE = Object.fromEntries(SECTIONS.map(s => [s.id, s.title])) as Record<SectionId, string>

// Each section is drawn as one Hairline figure.
const FIGURE: Record<SectionId, FigureName> = { nodes: 'rack', deploys: 'spindle', path: 'route', stack: 'trays', potato: 'potato' }

function FigureTile({ id, n, title, summary, data, play, onSelect }: {
  id: SectionId
  n: number
  title: string
  summary: string
  data?: Record<string, string>
  play: boolean
  onSelect: (id: SectionId) => void
}) {
  const [readout, setReadout] = useState('rest')
  const wide = id === 'potato'
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      aria-label={`${title}: ${summary}. ${id === 'potato' ? 'Wake it' : 'Open the details'}`}
      className={`group flex w-full flex-col overflow-hidden rounded-2xl border border-divider bg-surface text-left transition-colors hover:border-divider-strong focus-visible:border-accent ${wide ? 'sm:col-span-2' : ''}`}
    >
      <span className="flex items-baseline gap-2 px-4 pt-3">
        <span className="font-mono text-[11px] text-accent">{String(n).padStart(2, '0')}</span>
        <span className="truncate font-serif text-[1.0625rem] text-ink">{title}</span>
      </span>
      <HairlineFigure name={FIGURE[id]} data={data} play={play} onRead={setReadout} className={`homelab-figure w-full ${wide ? 'sm:mx-auto sm:w-1/2' : ''}`} />
      {/* While the pointer is on the figure, its read-out stands in for the summary. */}
      <span className="flex items-end justify-between gap-3 px-4 pb-3">
        <span className={`min-w-0 truncate font-mono text-xs ${readout === 'rest' ? 'text-inkSubtle' : 'text-ink'}`}>{readout === 'rest' ? summary : readout}</span>
        <span aria-hidden="true" className="flex-none font-sans text-xs text-inkMuted transition-colors group-hover:text-accent">
          {id === 'potato' ? 'wake it' : 'open'}
          {' '}
          →
        </span>
      </span>
    </button>
  )
}

function shortDate(iso: string) {
  const d = parseISO(iso)
  return Number.isNaN(d.getTime()) ? iso : format(d, 'MMM d').toLowerCase()
}

/** The five sections as figure tiles, each with a live one-line summary. */
function FigureGrid({ onSelect, className }: { onSelect: (id: SectionId) => void, className?: string }) {
  const { status, ready, total } = useClusterStatus()
  const { entries } = useLabNotebook()
  const reduceMotion = useReducedMotion()
  // Screens that can't hover get the figures playing their own tour.
  const canHover = useMediaQuery('(hover: hover)')
  const nodes = status?.nodes ?? []
  const busiest = Math.max(...nodes.map(n => n.cpu ?? 0))
  const summary: Record<SectionId, string> = {
    nodes: total ? `${ready}/${total} ready${busiest > 0 ? ` · busiest at ${pct(busiest)} CPU` : ''}` : 'status unavailable',
    deploys: entries[0]?.note ?? 'recent changes',
    path: 'Cloudflare → Traefik → nginx',
    stack: 'k3s · Argo CD · Vault · Traefik',
    potato: 'it powers everything, allegedly',
  }
  const data: Partial<Record<SectionId, Record<string, string>>> = {
    nodes: nodes.length ? { nodes: nodes.map(n => (n.role === 'control-plane' ? 'c' : 'w') + (n.ready ? '1' : '0')).join(',') } : undefined,
    deploys: entries.length ? { dates: entries.slice(0, 8).map(e => shortDate(e.date)).join(',') } : undefined,
  }
  return (
    <div className={`grid grid-cols-1 gap-3 sm:grid-cols-2 ${className ?? ''}`}>
      {SECTIONS.map(({ id, n, title }) => (
        <FigureTile key={id} id={id} n={n} title={title} summary={summary[id]} data={data[id]} play={!canHover && !reduceMotion} onSelect={onSelect} />
      ))}
    </div>
  )
}

function Stat({ label, value, tone }: { label: string, value: string, tone?: 'ok' | 'bad' }) {
  return (
    <div className="rounded-lg bg-page p-3">
      <dt className="font-mono text-[11px] text-inkSubtle">{label}</dt>
      <dd className={tone === 'ok' ? 'mt-1 text-lg text-ok' : tone === 'bad' ? 'mt-1 text-lg text-bad' : 'mt-1 text-lg text-ink'}>{value}</dd>
    </div>
  )
}

function Unavailable() {
  return <p className="font-serif text-inkBody">Live status isn't reachable right now. The room is showing its last known look.</p>
}

function PostLink({ post }: { post?: PostSummary }) {
  if (!post)
    return null
  return (
    <Link href={`/thoughts/${post.slug}`} className="editorial-link mt-4 inline-block font-serif">
      Read “
      {post.title}
      ” →
    </Link>
  )
}

function NodePanel({ node }: { node?: ClusterNode }) {
  if (!node)
    return <Unavailable />
  return (
    <div className="space-y-5">
      <p className="font-serif text-inkBody">
        {node.role === 'control-plane'
          ? 'The k3s server: the API, the scheduler and Argo CD live here. If it goes down, running apps keep serving from the workers.'
          : 'A worker. Traefik, CoreDNS and the site itself are scheduled on the workers.'}
      </p>
      {node.cpu == null && (
        <p className="font-mono text-xs text-warn">No CPU, memory or uptime data for this node right now: Prometheus isn't receiving node-exporter metrics from it.</p>
      )}
      <dl className="grid grid-cols-2 gap-2">
        <Stat label="status" value={node.ready ? 'Ready' : 'NotReady'} tone={node.ready ? 'ok' : 'bad'} />
        <Stat label="running pods" value={String(node.pods)} />
        <Stat label="cpu" value={pct(node.cpu)} />
        <Stat label="memory" value={pct(node.memory)} />
        <Stat label="uptime" value={days(node.uptimeSeconds)} />
        <Stat label="role" value={node.role} />
      </dl>
      <div>
        <p className="mb-2 font-mono text-[11px] text-inkSubtle">memory · last 24 hours</p>
        <Sparkline points={node.memoryHistory} color="var(--color-accent)" label={`Memory use on ${node.name} over the last 24 hours`} />
      </div>
    </div>
  )
}

function NotebookPanel() {
  const { entries, live } = useLabNotebook()
  return (
    <>
      <p className="font-serif text-inkBody">
        {live ? 'The latest changes to my GitOps repo, straight from GitHub.' : 'Recent changes to the cluster.'}
      </p>
      <ol className="mt-4 list-none space-y-4 p-0">
        {entries.map(entry => (
          <li key={entry.date + entry.note}>
            <time className="font-mono text-xs text-accent">{entry.date}</time>
            {entry.url
              ? <a href={entry.url} target="_blank" rel="noopener noreferrer" className="mt-1 block font-serif text-inkBody transition-colors hover:text-ink">{entry.note}</a>
              : <p className="mt-1 font-serif text-inkBody">{entry.note}</p>}
          </li>
        ))}
      </ol>
      <a href={`${REPO_URL}/commits/main`} target="_blank" rel="noopener noreferrer" className="editorial-link mt-5 inline-block font-serif">All commits →</a>
    </>
  )
}

function Panel({ id, status, posts }: { id: SectionId, status?: ClusterStatus, posts: PostSummary[] }) {
  const bySlug = (slug: string) => posts.find(p => p.slug === slug)

  switch (id) {
    case 'nodes':
      return status?.nodes.length
        ? (
            <div className="space-y-10">
              {status.nodes.map(node => (
                <section key={node.name}>
                  <h3 className="mb-3 font-mono text-sm text-accent">{node.name}</h3>
                  <NodePanel node={node} />
                </section>
              ))}
            </div>
          )
        : <Unavailable />
    case 'deploys':
      return (
        <>
          <p className="font-serif text-inkBody">Nothing is applied by hand if it can help it. Argo CD watches the repo and syncs every app, including itself.</p>
          {status?.argo
            ? (
                <dl className="mt-4 grid grid-cols-3 gap-2">
                  <Stat label="apps" value={String(status.argo.apps)} />
                  <Stat label="synced" value={String(status.argo.synced)} tone={status.argo.synced === status.argo.apps ? 'ok' : 'bad'} />
                  <Stat label="healthy" value={String(status.argo.healthy)} tone={status.argo.healthy === status.argo.apps ? 'ok' : 'bad'} />
                </dl>
              )
            : <p className="mt-4 font-mono text-xs text-inkSubtle">Argo CD metrics aren't available right now.</p>}
          <h3 className="mt-8 font-serif text-lg font-medium text-ink">Lab notebook</h3>
          <NotebookPanel />
        </>
      )
    case 'path':
      return (
        <>
          <ol className="space-y-2 font-mono text-sm text-ink">
            {['your browser', 'Cloudflare edge', 'Traefik on a worker', 'Gateway API route, canary-aware', 'nginx in a monospaced-frontend pod'].map((hop, i) => (
              <li key={hop} className="flex gap-3">
                <span className="text-inkSubtle">{String(i + 1).padStart(2, '0')}</span>
                {hop}
              </li>
            ))}
          </ol>
          <p className="mt-4 font-serif text-inkBody">Public DNS points at the workers, and Cloudflare sits in front. Traefik runs two replicas, one per worker, so either can take the traffic.</p>
          <p className="mt-3 font-serif text-inkBody">The delivery receipt on the home page shows which node and pod packed the page you're reading.</p>
          <PostLink post={bySlug('the-journey-of-a-packet')} />
        </>
      )
    case 'stack':
      return (
        <>
          <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 font-mono text-[13px]">
            {STACK.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-inkSubtle">{k}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="editorial-link mt-5 inline-block font-serif">rohitpotato/k8s-apps on GitHub →</a>
          <PostLink post={bySlug('you-dont-need-vercel')} />
        </>
      )
    case 'potato':
      return null
  }
}

export function HomelabRoom({ builtHere }: { builtHere: PostSummary[] }) {
  const [active, setActive] = useState<SectionId | null>(null)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { status, healthy, ready, total } = useClusterStatus()

  const title = active ? TITLE[active] : ''

  // Random quip, never the same one twice in a row; live ones skip themselves when data is missing.
  const lastQuip = useRef(-1)
  function wakePotato() {
    const ctx = { nodes: status?.nodes ?? [], argo: status?.argo ?? null }
    const options = POTATO_QUIPS.map((quip, i) => [i, quip(ctx)] as const).filter(([i, text]) => text && i !== lastQuip.current)
    const [index, text] = options[Math.floor(Math.random() * options.length)]
    lastQuip.current = index
    toast('The potato wakes up', { description: text })
  }

  const select = (id: SectionId) => (id === 'potato' ? wakePotato() : setActive(id))
  return (
    <>
      <div className="min-w-0 min-[1100px]:max-w-[38rem] min-[1400px]:max-w-[44rem]">
        <h1 className="font-serif text-4xl font-medium text-ink sm:text-5xl">My homelab</h1>
        <p className="mt-4 font-serif text-lg leading-relaxed text-inkBody">
          Three small rented servers run everything on this site. Each part of the cluster is drawn as a little machine below. Hover over one to play with it (on a phone they play by themselves), and tap or click it for the live details.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 font-mono text-xs">
            <span className="size-2 rounded-full" style={{ background: !total ? 'var(--color-ink-subtle)' : healthy ? 'var(--color-status-ok)' : 'var(--color-status-warn)' }} />
            <span className={!total ? 'text-inkSubtle' : healthy ? 'text-ok' : 'text-warn'}>
              {total ? `${ready}/${total} nodes ready` : 'status unavailable'}
            </span>
          </span>
          {status && (
            <span className="font-mono text-[11px] text-inkSubtle">
              {status.stale ? 'last known · ' : 'live · '}
              checked
              {' '}
              {formatDistanceToNowStrict(new Date(status.generatedAt))}
              {' '}
              ago
            </span>
          )}
        </div>

        {/* Below 1100px the figures sit in the page flow; above it, they're fixed beside the text. */}
        <FigureGrid onSelect={select} className="mt-8 max-w-[40rem] min-[1100px]:hidden" />

        <h2 className="mt-10 font-serif text-xl font-medium text-ink">The stack</h2>
        <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 font-mono text-[13px]">
          {STACK.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-inkSubtle">{k}</dt>
              <dd className="text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <h2 className="mt-10 font-serif text-xl font-medium text-ink">Built here</h2>
        <ul className="mt-2 list-none p-0">
          {builtHere.map(post => (
            <li key={post.slug}>
              <Link href={`/thoughts/${post.slug}`} className="block border-t border-divider py-2 font-serif text-inkBody transition-colors hover:text-ink">{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <aside className="hidden min-[1100px]:fixed min-[1100px]:top-[52px] min-[1100px]:right-[72px] min-[1100px]:bottom-[52px] min-[1100px]:left-[calc(72px+42rem)] min-[1100px]:flex min-[1100px]:items-start min-[1100px]:justify-end min-[1400px]:left-[calc(72px+48rem)]">
        {/* Three rows of 5:4 tiles, sized to fit the viewport's height. */}
        <div className="max-h-full overflow-y-auto" style={{ width: 'min(100%, calc((100dvh - 128px - 3 * 84px) / 3 * 2.5 + 12px))' }}>
          <FigureGrid onSelect={select} />
        </div>
      </aside>

      <Drawer.Root open={active !== null} onOpenChange={open => !open && setActive(null)} direction={isDesktop ? 'right' : 'bottom'}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-40 bg-black/50" />
          <Drawer.Content
            className={isDesktop
              ? 'fixed inset-y-3 right-3 z-50 flex w-[min(26rem,calc(100vw-1.5rem))] flex-col overflow-y-auto rounded-2xl border border-divider bg-surface p-6 outline-none'
              : 'fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col overflow-y-auto rounded-t-2xl border-t border-divider bg-surface p-5 pb-8 outline-none'}
          >
            {!isDesktop && <Drawer.Handle className="mb-4 !bg-divider-strong" />}
            <Drawer.Title className="font-serif text-2xl font-medium text-ink">{title}</Drawer.Title>
            <Drawer.Description className="sr-only">Details for the selected part of the homelab.</Drawer.Description>
            <div className="mt-4">
              {active && <Panel id={active} status={status} posts={builtHere} />}
            </div>
            <Drawer.Close className="mt-8 self-start rounded-lg border border-divider-strong px-4 py-2 font-sans text-sm text-ink hover:bg-[var(--color-wash-hover)]">
              Close
            </Drawer.Close>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  )
}
