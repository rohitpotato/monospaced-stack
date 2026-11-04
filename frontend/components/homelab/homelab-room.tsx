'use client'

import type { ClusterNode, ClusterStatus } from '@/hooks/use-cluster-status'
import type { PostSummary } from '@/lib/post-summary'
import * as Tooltip from '@radix-ui/react-tooltip'
import { formatDistanceToNowStrict } from 'date-fns'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'next-view-transitions'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { useMediaQuery } from 'usehooks-ts'
import { Drawer } from 'vaul'
import { useClusterStatus } from '@/hooks/use-cluster-status'
import { useLabNotebook } from '@/hooks/use-lab-notebook'
import { POTATO_QUIPS, REPO_URL, STACK } from './homelab-content'
import { Sparkline } from './sparkline'

type SectionId = 'nodes' | 'deploys' | 'path' | 'stack' | 'potato'

// Missing metrics come back as null; show a dash rather than a misleading 0.
const pct = (n: number | null) => (n == null ? '—' : `${Math.round(n * 100)}%`)
const days = (s: number | null) => (s == null ? '—' : `${Math.floor(s / 86400)}d`)

// The five things you can open, numbered as in the sketch's red-pen notes.
const SECTIONS: { id: SectionId, n: number, title: string }[] = [
  { id: 'nodes', n: 1, title: 'The nodes' },
  { id: 'deploys', n: 2, title: 'What changed lately' },
  { id: 'path', n: 3, title: 'How this page got to you' },
  { id: 'stack', n: 4, title: 'What runs here' },
  { id: 'potato', n: 5, title: 'The potato' },
]
const TITLE = Object.fromEntries(SECTIONS.map(s => [s.id, s.title])) as Record<SectionId, string>

// Click targets over the sketch, in percent of the 800x900 artwork: the object and its red-pen note.
const HOTSPOTS: { id: SectionId, label: string, box: [number, number, number, number] }[] = [
  { id: 'nodes', label: 'The nodes: live CPU, memory and uptime', box: [11, 43.4, 27, 19] },
  { id: 'nodes', label: 'The nodes: live CPU, memory and uptime', box: [9.5, 87.5, 31, 6.5] },
  { id: 'deploys', label: 'What changed lately', box: [56, 45.8, 21.8, 10.2] },
  { id: 'deploys', label: 'What changed lately', box: [78.2, 45.8, 21, 6.6] },
  { id: 'path', label: 'How this page got to you', box: [53.5, 12, 39, 32.8] },
  { id: 'path', label: 'How this page got to you', box: [45.8, 55, 9.6, 7.4] },
  { id: 'path', label: 'How this page got to you', box: [56.5, 5, 28.5, 4.4] },
  { id: 'stack', label: 'What runs here', box: [5.5, 14.8, 37.8, 27.4] },
  { id: 'stack', label: 'What runs here', box: [43.4, 24, 9.4, 7.4] },
  { id: 'potato', label: 'The potato: poke it', box: [77, 51.6, 17.8, 10.8] },
  { id: 'potato', label: 'The potato: poke it', box: [74.2, 87.5, 15, 6.5] },
]

// The first status light on each server is left blank in the sketch and drawn live here.
const LEDS: [number, number][] = [[31.25, 48.11], [31.25, 53.33], [31.25, 58.56]]

function SketchRoom({ onSelect }: { onSelect: (id: SectionId) => void }) {
  const { status } = useClusterStatus()
  const reduceMotion = useReducedMotion()
  const nodes = status?.nodes ?? []

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-[#f6f0e1]" style={{ aspectRatio: '800 / 900' }}>
      <picture>
        {/* Phones get the version without handwritten notes: they'd be unreadable that small. */}
        <source media="(max-width: 639px)" srcSet="/homelab/sketch-compact-800.webp 800w, /homelab/sketch-compact-1600.webp 1600w" sizes="100vw" />
        <img
          src="/homelab/sketch-800.webp"
          srcSet="/homelab/sketch-800.webp 800w, /homelab/sketch-1600.webp 1600w"
          sizes="(min-width: 1100px) 36rem, 28rem"
          width={800}
          height={900}
          alt="An ink and watercolour sketch of a desk: three servers in a rack, a corkboard of recent changes, a window looking out on a city with a cable running up to a cloud, a shelf of labelled boxes, and a potato asleep on a cushion. Red-pen notes number each one."
          className="absolute inset-0 size-full select-none"
          draggable={false}
        />
      </picture>
      {LEDS.map(([x, y], i) => {
        const node = nodes[i]
        const color = !node ? '#8a8390' : node.ready ? '#2fa36b' : '#d0452e'
        return (
          <motion.span
            key={i}
            aria-hidden="true"
            className="pointer-events-none absolute size-[1.4%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ left: `${x}%`, top: `${y}%`, background: color, boxShadow: `0 0 8px 1px ${color}` }}
            animate={reduceMotion || !node ? undefined : { opacity: [1, 0.35, 1] }}
            transition={{ duration: 1.4, delay: i * 0.4, repeat: Infinity, ease: 'linear' }}
          />
        )
      })}
      {HOTSPOTS.map(({ id, label, box: [left, top, width, height] }, i) => (
        <Tooltip.Root key={i}>
          <Tooltip.Trigger asChild>
            <button
              type="button"
              aria-label={label}
              tabIndex={HOTSPOTS.findIndex(h => h.id === id) === i ? 0 : -1}
              onClick={() => onSelect(id)}
              className="absolute rounded-lg transition-[background-color,box-shadow] duration-200 hover:bg-[#c8432b]/8 hover:shadow-[inset_0_0_0_1.5px_rgb(200_67_43_/_0.55)] focus-visible:bg-[#c8432b]/8 focus-visible:shadow-[inset_0_0_0_2px_rgb(200_67_43)] focus-visible:outline-none"
              style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }}
            />
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content side="top" sideOffset={6} className="z-50 rounded-md border border-divider-strong bg-[var(--color-tooltip-bg)] px-2.5 py-1.5 font-mono text-xs text-ink">
              {label}
              <Tooltip.Arrow className="fill-[var(--color-tooltip-bg)]" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      ))}
    </div>
  )
}

/** The same five sections as a list, so nobody has to hunt for click targets on a small screen. */
function SectionCards({ onSelect }: { onSelect: (id: SectionId) => void }) {
  const { status, ready, total } = useClusterStatus()
  const { entries } = useLabNotebook()
  const busiest = Math.max(...(status?.nodes ?? []).map(n => n.cpu ?? 0))
  const summary: Record<SectionId, string> = {
    nodes: total ? `${ready}/${total} ready${busiest > 0 ? ` · busiest at ${pct(busiest)} CPU` : ''}` : 'status unavailable',
    deploys: entries[0]?.note ?? 'recent changes',
    path: 'Cloudflare → Traefik → nginx',
    stack: 'k3s · Argo CD · Vault · Traefik',
    potato: 'tap to wake it',
  }
  return (
    <ul className="mt-3 list-none p-0" aria-label="Things in the room">
      {SECTIONS.map(({ id, n, title }) => (
        <li key={id}>
          <button
            type="button"
            onClick={() => onSelect(id)}
            className="flex w-full items-center gap-3 border-t border-divider py-3 text-left transition-colors hover:bg-[var(--color-wash-hover)]"
          >
            <span className="grid size-7 flex-none place-items-center rounded-full border-2 border-[#c8432b] font-mono text-xs font-semibold text-[#ff8d76]">{n}</span>
            <span className="min-w-0 flex-1">
              <span className="block font-serif text-[1.0625rem] text-ink">{title}</span>
              <span className="block truncate font-mono text-xs text-inkSubtle">{summary[id]}</span>
            </span>
            <span aria-hidden="true" className="text-inkSubtle">›</span>
          </button>
        </li>
      ))}
    </ul>
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
  const room = <SketchRoom onSelect={select} />

  return (
    <Tooltip.Provider delayDuration={100}>
      <div className="min-w-0 min-[1100px]:max-w-[38rem] min-[1400px]:max-w-[44rem]">
        <h1 className="font-serif text-4xl font-medium text-ink sm:text-5xl">My homelab</h1>
        <p className="mt-4 font-serif text-lg leading-relaxed text-inkBody">
          Three small rented servers run everything on this site. I've sketched the desk they'd sit on if they lived with me. Click anything circled in red.
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

        {/* Below 1100px the room sits in the page flow; above it, it's fixed beside the text. */}
        <div className="mt-8 max-w-[28rem] min-[1100px]:hidden">
          {room}
          <SectionCards onSelect={select} />
        </div>

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
        <div style={{ width: 'min(100%, calc((100dvh - 104px) * 800 / 900))' }}>{room}</div>
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
    </Tooltip.Provider>
  )
}
