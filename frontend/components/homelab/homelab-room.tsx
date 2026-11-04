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

type HotspotId = 'node-0' | 'node-1' | 'node-2' | 'cables' | 'router' | 'window' | 'plant' | 'notepad' | 'potato'

// Missing metrics come back as null; show a dash rather than a misleading 0.
const pct = (n: number | null) => (n == null ? '—' : `${Math.round(n * 100)}%`)
const days = (s: number | null) => (s == null ? '—' : `${Math.floor(s / 86400)}d`)

// Hotspots over the poster, in percent of the 800x1000 artwork.
const HOTSPOTS: { id: HotspotId, label: string, box: [number, number, number, number] }[] = [
  { id: 'window', label: 'The view: GitOps', box: [11, 8.6, 78.5, 47] },
  { id: 'plant', label: 'Plant: uptime', box: [3, 57, 25, 37] },
  { id: 'cables', label: 'Cables: how a request gets in', box: [30, 63.5, 34, 11] },
  { id: 'router', label: 'Router: DNS and ingress', box: [54, 73.5, 15, 9.5] },
  { id: 'potato', label: 'Napping potato: wake it up', box: [31, 74, 18, 11] },
  { id: 'notepad', label: 'Filter coffee: lab notebook', box: [77, 67, 12, 16] },
  { id: 'node-0', label: 'Server 1', box: [27.5, 56.6, 14, 6] },
  { id: 'node-1', label: 'Server 2', box: [42.5, 56.6, 14, 6] },
  { id: 'node-2', label: 'Server 3', box: [57.5, 56.6, 14, 6] },
]

// The servers' status lights, drawn live over the artwork.
const LEDS: [number, number][] = [[29.75, 60], [44.75, 60], [59.75, 60]]

function PosterRoom({ onSelect, onPotato }: { onSelect: (id: HotspotId) => void, onPotato: () => void }) {
  const { status } = useClusterStatus()
  const reduceMotion = useReducedMotion()
  const nodes = status?.nodes ?? []

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-[#1c2a4a]" style={{ aspectRatio: '800 / 1000' }}>
      <img
        src="/homelab/room-800.webp"
        srcSet="/homelab/room-800.webp 800w, /homelab/room-1600.webp 1600w"
        sizes="(min-width: 1100px) 32rem, 100vw"
        width={800}
        height={1000}
        alt="A screen-printed room: three servers on a windowsill at sunset, cables to a router, a monstera, filter coffee and a sleeping potato"
        className="absolute inset-0 size-full select-none"
        draggable={false}
      />
      {LEDS.map(([x, y], i) => {
        const node = nodes[i]
        const color = !node ? '#6f6c78' : node.ready ? 'var(--color-status-ok)' : 'var(--color-status-bad)'
        return (
          <motion.span
            key={i}
            aria-hidden="true"
            className="pointer-events-none absolute size-[1.6%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ left: `${x}%`, top: `${y}%`, background: color, boxShadow: `0 0 10px 2px ${color}` }}
            animate={reduceMotion || !node ? undefined : { opacity: [1, 0.35, 1] }}
            transition={{ duration: 1.4, delay: i * 0.4, repeat: Infinity, ease: 'linear' }}
          />
        )
      })}
      {HOTSPOTS.map(({ id, label, box: [left, top, width, height] }) => {
        const node = id.startsWith('node-') ? nodes[Number(id.at(-1))] : undefined
        const name = node ? `${node.name} · ${node.ready ? 'Ready' : 'NotReady'}` : label
        return (
          <Tooltip.Root key={id}>
            <Tooltip.Trigger asChild>
              <button
                type="button"
                aria-label={name}
                onClick={() => (id === 'potato' ? onPotato() : onSelect(id))}
                className="absolute rounded-lg transition-[background-color,box-shadow] duration-200 hover:bg-white/8 hover:shadow-[inset_0_0_0_1.5px_rgb(255_255_255_/_0.35)] focus-visible:bg-white/8"
                style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }}
              />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content side="top" sideOffset={6} className="z-50 rounded-md border border-divider-strong bg-[var(--color-tooltip-bg)] px-2.5 py-1.5 font-mono text-xs text-ink">
                {name}
                <Tooltip.Arrow className="fill-[var(--color-tooltip-bg)]" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        )
      })}
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

function Panel({ id, status, posts }: { id: HotspotId, status?: ClusterStatus, posts: PostSummary[] }) {
  const bySlug = (slug: string) => posts.find(p => p.slug === slug)

  switch (id) {
    case 'node-0':
    case 'node-1':
    case 'node-2':
      return <NodePanel node={status?.nodes[Number(id.at(-1))]} />
    case 'cables':
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
          <p className="mt-4 font-serif text-inkBody">The delivery receipt on the home page shows which node and pod packed the page you're reading.</p>
          <PostLink post={bySlug('the-journey-of-a-packet')} />
        </>
      )
    case 'router':
      return (
        <>
          <p className="font-serif text-inkBody">Public DNS points at the workers, and Cloudflare sits in front. Traefik runs two replicas, one per worker, so either can take the traffic.</p>
          <PostLink post={bySlug('you-dont-need-vercel')} />
        </>
      )
    case 'window':
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
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="editorial-link mt-4 inline-block font-serif">rohitpotato/k8s-apps on GitHub →</a>
        </>
      )
    case 'plant': {
      const reported = (status?.nodes ?? []).map(n => n.uptimeSeconds).filter((u): u is number => u != null)
      const minUptime = reported.length ? Math.min(...reported) : undefined
      return minUptime == null
        ? <Unavailable />
        : (
            <>
              <p className="font-serif text-inkBody">The plant grows with the time since the most recent node reboot.</p>
              <p className="mt-4 font-serif text-3xl text-ink">
                {days(minUptime)}
                <span className="ml-2 font-mono text-xs text-inkSubtle">since the last reboot</span>
              </p>
            </>
          )
    }
    case 'potato':
      return null
    case 'notepad':
      return <NotebookPanel />
  }
}

const TITLES: Record<HotspotId, string> = {
  'node-0': 'Node',
  'node-1': 'Node',
  'node-2': 'Node',
  'cables': 'How a request gets in',
  'router': 'DNS and ingress',
  'window': 'GitOps',
  'plant': 'Uptime',
  'notepad': 'Lab notebook',
  'potato': 'Potato',
}

export function HomelabRoom({ builtHere }: { builtHere: PostSummary[] }) {
  const [active, setActive] = useState<HotspotId | null>(null)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { status, healthy, ready, total } = useClusterStatus()

  const title = active?.startsWith('node-')
    ? status?.nodes[Number(active.at(-1))]?.name ?? TITLES[active]
    : active ? TITLES[active] : ''

  // Random quip, never the same one twice in a row; live ones skip themselves when data is missing.
  const lastQuip = useRef(-1)
  function wakePotato() {
    const ctx = { nodes: status?.nodes ?? [], argo: status?.argo ?? null }
    const options = POTATO_QUIPS.map((quip, i) => [i, quip(ctx)] as const).filter(([i, text]) => text && i !== lastQuip.current)
    const [index, text] = options[Math.floor(Math.random() * options.length)]
    lastQuip.current = index
    toast('The potato wakes up', { description: text })
  }

  const room = <PosterRoom onSelect={setActive} onPotato={wakePotato} />

  return (
    <Tooltip.Provider delayDuration={100}>
      <div className="min-w-0 min-[1100px]:max-w-[38rem] min-[1400px]:max-w-[44rem]">
        <h1 className="font-serif text-4xl font-medium text-ink sm:text-5xl">My homelab</h1>
        <p className="mt-4 font-serif text-lg leading-relaxed text-inkBody">
          Three small rented servers run everything on this site. I've drawn them on a windowsill in Bengaluru. Click anything in the room.
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
        <div className="mt-8 max-w-[28rem] min-[1100px]:hidden">{room}</div>

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
        <div style={{ width: 'min(100%, calc((100dvh - 104px) * 800 / 1000))' }}>{room}</div>
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
            <Drawer.Description className="sr-only">Details for the selected object in the homelab room.</Drawer.Description>
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
