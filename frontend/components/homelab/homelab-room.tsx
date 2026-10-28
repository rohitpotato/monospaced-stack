'use client'

import type { ReactNode } from 'react'
import type { ClusterNode, ClusterStatus } from '@/hooks/use-cluster-status'
import type { PostSummary } from '@/lib/post-summary'
import * as Tooltip from '@radix-ui/react-tooltip'
import { formatDistanceToNowStrict } from 'date-fns'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'next-view-transitions'
import { useState } from 'react'
import { toast } from 'sonner'
import { useIsClient, useMediaQuery } from 'usehooks-ts'
import { Drawer } from 'vaul'
import { Potato } from '@/components/neighbourhood/map-parts'
import { useClusterStatus } from '@/hooks/use-cluster-status'
import { LAB_NOTEBOOK, REPO_URL, STACK } from './homelab-content'
import { Sparkline } from './sparkline'

type HotspotId = 'node-0' | 'node-1' | 'node-2' | 'cables' | 'router' | 'gitops' | 'window' | 'plant' | 'rug' | 'notepad' | 'shelf'

const NODE_BOXES = [
  { top: '915,201 949.6,221 927.1,234 892.5,214', front: '892.5,236 927.1,256 927.1,234 892.5,214', side: '949.6,243 927.1,256 927.1,234 949.6,221', led: [900, 232], colors: ['#5a6f99', '#3c4d73', '#2f3d5e'] },
  { top: '963,229 997.6,249 975.1,262 940.5,242', front: '940.5,264 975.1,284 975.1,262 940.5,242', side: '997.6,271 975.1,284 975.1,262 997.6,249', led: [948, 260], colors: ['#5a6f99', '#3c4d73', '#2f3d5e'] },
  { top: '1011,257 1045.6,277 1023.1,290 988.5,270', front: '988.5,292 1023.1,312 1023.1,290 988.5,270', side: '1045.6,299 1023.1,312 1023.1,290 1045.6,277', led: [996, 288], colors: ['#94507a', '#6e3a5b', '#572e48'] },
] as const

const CABLES = [
  { d: 'M910 250 C 905 300 920 380 945 470', color: '#e3a15b' },
  { d: 'M958 278 C 955 330 960 400 962 476', color: '#7fb8a4' },
  { d: 'M1006 306 C 1004 360 1000 420 985 484', color: '#c49bd6' },
]

const pct = (n: number) => `${Math.round(n * 100)}%`
const days = (s: number) => `${Math.floor(s / 86400)}d`

function Hotspot({ id, label, onSelect, children }: { id: HotspotId, label: string, onSelect: (id: HotspotId) => void, children: ReactNode }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <motion.g
          role="button"
          tabIndex={0}
          aria-label={label}
          className="cursor-pointer outline-none"
          whileHover={{ y: -3 }}
          whileFocus={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onSelect(id)
            }
          }}
        >
          {children}
        </motion.g>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content side="top" sideOffset={6} className="z-50 rounded-md border border-divider-strong bg-[var(--color-tooltip-bg)] px-2.5 py-1.5 font-mono text-xs text-ink">
          {label}
          <Tooltip.Arrow className="fill-[var(--color-tooltip-bg)]" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )
}

function skyFor(status: ClusterStatus | undefined, healthy: boolean, hour: number) {
  if (status && !healthy)
    return { sky: '#8a909a', band: '#7a808a', sun: '#b9bec6', hill: '#4b4f5e', clouds: true }
  if (hour >= 7 && hour < 17)
    return { sky: '#8fc3e6', band: '#a6d0ec', sun: '#fbe7a1', hill: '#5f8f4e', clouds: false }
  if (hour >= 17 && hour < 20)
    return { sky: '#f0a77a', band: '#e9906b', sun: '#f8d48a', hill: '#5b4a7a', clouds: false }
  return { sky: '#26324f', band: '#2e3b5c', sun: '#f2e3b3', hill: '#1f2740', clouds: false }
}

function Room({ onSelect }: { onSelect: (id: HotspotId) => void }) {
  const { status, healthy } = useClusterStatus()
  const isClient = useIsClient()
  const reduceMotion = useReducedMotion()
  const sky = skyFor(status, healthy, isClient ? new Date().getHours() : 18)
  const nodes = status?.nodes ?? []

  function wakePotato() {
    const node = nodes[Math.floor(Math.random() * nodes.length)]
    toast('The potato wakes up', {
      description: node
        ? `${node.name} has been up for ${days(node.uptimeSeconds)} and is running ${node.pods} pods.`
        : 'It mumbles something about Prometheus and goes back to sleep.',
    })
  }

  return (
    <svg viewBox="560 60 570 580" className="h-auto w-full select-none" role="group" aria-label="An isometric room with the cluster's servers on a shelf. Each object opens a panel.">
      <g aria-hidden="true">
        <polygon points="840,300 1100,450 840,600 580,450" fill="#3a3346" />
        <g stroke="#433b51" strokeWidth={1}>
          <line x1={645} y1={412} x2={905} y2={562} />
          <line x1={710} y1={375} x2={970} y2={525} />
          <line x1={775} y1={337} x2={1035} y2={487} />
          <line x1={905} y1={337} x2={645} y2={487} />
          <line x1={970} y1={375} x2={710} y2={525} />
          <line x1={1035} y1={412} x2={775} y2={562} />
        </g>
        <polygon points="580,450 840,300 840,80 580,230" fill="#2b2636" />
        <polygon points="840,300 1100,450 1100,230 840,80" fill="#241f2e" />
        <polygon points="580,450 840,600 840,612 580,462" fill="#211d29" />
        <polygon points="840,600 1100,450 1100,462 840,612" fill="#1b1822" />
      </g>

      <Hotspot id="window" label="Window: cluster weather" onSelect={onSelect}>
        <clipPath id="window-clip"><polygon points="632,400 736,340 736,232 632,292" /></clipPath>
        <polygon points="632,400 736,340 736,232 632,292" fill={sky.sky} />
        <g clipPath="url(#window-clip)">
          <polygon points="632,320 736,260 736,232 632,292" fill={sky.band} />
          <circle cx={690} cy={318} r={16} fill={sky.sun} />
          {sky.clouds && (
            <motion.g animate={reduceMotion ? undefined : { x: [0, 14, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
              <ellipse cx={660} cy={300} rx={22} ry={8} fill="#d6d9de" />
              <ellipse cx={712} cy={276} rx={18} ry={7} fill="#c9cdd3" />
            </motion.g>
          )}
          <polygon points="632,400 736,340 736,312 700,320 670,350 632,360" fill={sky.hill} />
        </g>
        <polygon points="632,400 736,340 736,232 632,292" fill="none" stroke="#1b1822" strokeWidth={5} />
        <line x1={684} y1={370} x2={684} y2={262} stroke="#1b1822" strokeWidth={3} />
        <polygon points="626,406 742,340 748,344 632,410" fill="#4a4259" />
      </Hotspot>

      <Hotspot id="gitops" label="Poster: GitOps feed" onSelect={onSelect}>
        <polygon points="602,250 634,232 634,258 602,276" fill="#e3a15b" />
        <polygon points="606,252 630,238 630,256 606,270" fill="#2b2636" />
        <text x={610} y={264} className="font-mono" fontSize={7} fill="#e3a15b" transform="rotate(-30 610 264)">git push</text>
      </Hotspot>

      <Hotspot id="shelf" label="Shelf: hardware" onSelect={onSelect}>
        <polygon points="909,220 1065,310 1039,325 883,235" fill="#8a6a4f" />
        <polygon points="883,235 1039,325 1039,333 883,243" fill="#6e533d" />
      </Hotspot>

      {NODE_BOXES.map((box, i) => {
        const node = nodes[i]
        const led = !node ? '#6f6a63' : node.ready ? 'var(--color-status-ok)' : 'var(--color-status-bad)'
        return (
          <Hotspot key={box.top} id={`node-${i}` as HotspotId} label={node ? `${node.name} · ${node.ready ? 'Ready' : 'NotReady'}` : `Node ${i + 1}`} onSelect={onSelect}>
            <polygon points={box.top} fill={box.colors[0]} />
            <polygon points={box.front} fill={box.colors[1]} />
            <polygon points={box.side} fill={box.colors[2]} />
            <motion.circle
              cx={box.led[0]}
              cy={box.led[1]}
              r={2.2}
              fill={led}
              animate={reduceMotion || !node ? undefined : { opacity: [1, 0.25, 1] }}
              transition={{ duration: 1.4, delay: i * 0.35, repeat: Infinity, ease: 'linear' }}
            />
            <circle cx={box.led[0] + 7} cy={box.led[1] + 4} r={2.2} fill={led} opacity={0.5} />
          </Hotspot>
        )
      })}

      <Hotspot id="cables" label="Cables: how a request gets in" onSelect={onSelect}>
        {CABLES.map((cable, i) => (
          <g key={cable.d}>
            <path d={cable.d} stroke={cable.color} strokeWidth={2.5} fill="none" strokeLinecap="round" />
            <path d={cable.d} stroke="transparent" strokeWidth={12} fill="none" />
            {!reduceMotion && (
              <motion.path
                d={cable.d}
                stroke="#fff8e7"
                strokeWidth={3}
                strokeLinecap="round"
                fill="none"
                strokeDasharray="4 220"
                animate={{ strokeDashoffset: [224, 0] }}
                transition={{ duration: 2.4, delay: i * 0.6, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </g>
        ))}
      </Hotspot>

      <Hotspot id="router" label="Router: DNS and ingress" onSelect={onSelect}>
        <polygon points="960,458 1003.3,483 977.3,498 934,473" fill="#d6d3dd" />
        <polygon points="934,485 977.3,510 977.3,498 934,473" fill="#a8a4b3" />
        <polygon points="1003.3,495 977.3,510 977.3,498 1003.3,483" fill="#8b8798" />
        <g stroke="#a8a4b3" strokeWidth={2.5} strokeLinecap="round">
          <line x1={946} y1={476} x2={940} y2={446} />
          <line x1={992} y1={484} x2={998} y2={454} />
        </g>
        <circle cx={944} cy={487} r={1.8} fill="#7ee2b8" />
        <circle cx={952} cy={491} r={1.8} fill="#7ee2b8" />
        <circle cx={960} cy={496} r={1.8} fill="#f2c14e" />
      </Hotspot>

      <Hotspot id="rug" label="Rug: posts written about this setup" onSelect={onSelect}>
        <polygon points="800,440 880,486 820,520 740,474" fill="#c96e5a" opacity={0.9} />
        <polygon points="808,446 868,480 822,506 762,472" fill="none" stroke="#f0c0a8" strokeWidth={1.5} strokeDasharray="4 4" />
      </Hotspot>

      <Hotspot id="plant" label="Plant: uptime" onSelect={onSelect}>
        <g transform="translate(690 470)">
          <path d="M-18 0 L-14 30 Q0 38 14 30 L18 0Z" fill="#a0522d" />
          <ellipse cx={0} cy={0} rx={18} ry={7} fill="#b9673e" />
          <ellipse cx={0} cy={0} rx={14} ry={5} fill="#3e2c22" />
          <motion.g
            style={{ transformOrigin: '0px 0px' }}
            animate={reduceMotion ? undefined : { rotate: [-2, 2, -2] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M0 -2 C -6 -30 -28 -40 -34 -50 C -14 -46 -4 -30 0 -2Z" fill="#5f8f4e" />
            <path d="M0 -2 C 4 -34 22 -52 30 -60 C 30 -38 12 -20 0 -2Z" fill="#6fa55c" />
            <path d="M0 -2 C -2 -24 6 -44 2 -70 C 14 -50 8 -24 0 -2Z" fill="#7fb86a" />
            <path d="M0 -2 C -14 -14 -36 -14 -44 -20 C -26 -26 -10 -18 0 -2Z" fill="#6fa55c" />
          </motion.g>
        </g>
      </Hotspot>

      <Hotspot id="notepad" label="Notepad: lab notebook" onSelect={onSelect}>
        <g transform="translate(870 528)">
          <polygon points="0,0 22,13 0,26 -22,13" fill="#f2e3b3" />
          <polygon points="-22,13 0,26 0,30 -22,17" fill="#d3c493" />
          <polygon points="0,26 22,13 22,17 0,30" fill="#bfb183" />
        </g>
      </Hotspot>

      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <motion.g
            role="button"
            tabIndex={0}
            aria-label="Napping potato: wake it up"
            className="cursor-pointer outline-none"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={wakePotato}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                wakePotato()
              }
            }}
          >
            <g transform="translate(790 530) scale(.42)">
              <Potato hat="" asleep />
            </g>
            <motion.text
              x={812}
              y={506}
              className="font-serif"
              fontSize={12}
              fill="#8a8794"
              fontStyle="italic"
              animate={reduceMotion ? undefined : { opacity: [0, 1, 0], y: [0, -8, -14] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              z
            </motion.text>
          </motion.g>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side="top" sideOffset={6} className="z-50 rounded-md border border-divider-strong bg-[var(--color-tooltip-bg)] px-2.5 py-1.5 font-mono text-xs text-ink">
            Napping potato
            <Tooltip.Arrow className="fill-[var(--color-tooltip-bg)]" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </svg>
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

function Panel({ id, status, healthy, posts }: { id: HotspotId, status?: ClusterStatus, healthy: boolean, posts: PostSummary[] }) {
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
    case 'gitops':
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
    case 'window':
      return (
        <>
          <p className="font-serif text-inkBody">The sky follows your local time while everything is healthy. Clouds roll in when a node isn't ready or an app is out of sync.</p>
          <p className="mt-4 font-mono text-sm text-ink">
            Right now:
            {' '}
            <span className={healthy ? 'text-ok' : 'text-warn'}>{!status ? 'unknown' : healthy ? 'clear skies' : 'cloudy'}</span>
          </p>
        </>
      )
    case 'plant': {
      const minUptime = status?.nodes.length ? Math.min(...status.nodes.map(n => n.uptimeSeconds)) : undefined
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
    case 'rug':
      return (
        <ul className="list-none space-y-1 p-0">
          {posts.map(post => (
            <li key={post.slug}>
              <Link href={`/thoughts/${post.slug}`} className="block border-t border-divider py-2.5 font-serif text-ink hover:text-accent">{post.title}</Link>
            </li>
          ))}
        </ul>
      )
    case 'notepad':
      return (
        <ol className="list-none space-y-4 p-0">
          {LAB_NOTEBOOK.map(entry => (
            <li key={entry.date + entry.note}>
              <time className="font-mono text-xs text-accent">{entry.date}</time>
              <p className="mt-1 font-serif text-inkBody">{entry.note}</p>
            </li>
          ))}
        </ol>
      )
    case 'shelf':
      return (
        <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 font-mono text-sm">
          {STACK.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-inkSubtle">{k}</dt>
              <dd className="text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      )
  }
}

const TITLES: Record<HotspotId, string> = {
  'node-0': 'Node',
  'node-1': 'Node',
  'node-2': 'Node',
  'cables': 'How a request gets in',
  'router': 'DNS and ingress',
  'gitops': 'GitOps',
  'window': 'Cluster weather',
  'plant': 'Uptime',
  'rug': 'Built here',
  'notepad': 'Lab notebook',
  'shelf': 'Hardware and stack',
}

export function HomelabRoom({ builtHere }: { builtHere: PostSummary[] }) {
  const [active, setActive] = useState<HotspotId | null>(null)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { status, healthy, ready, total } = useClusterStatus()

  const title = active?.startsWith('node-')
    ? status?.nodes[Number(active.at(-1))]?.name ?? TITLES[active]
    : active ? TITLES[active] : ''

  return (
    <Tooltip.Provider delayDuration={100}>
      <div className="grid items-start gap-8 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:gap-10">
        <div>
          <h1 className="font-serif text-4xl font-medium text-ink sm:text-5xl">My homelab</h1>
          <p className="mt-4 font-serif text-lg leading-relaxed text-inkBody">
            Three small rented servers run everything on this site. I've drawn them as if they lived on my shelf. Click anything in the room.
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
          <dl className="mt-7 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 font-mono text-[13px]">
            {STACK.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-inkSubtle">{k}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <h2 className="mt-8 font-serif text-xl font-medium text-ink">Built here</h2>
          <ul className="mt-2 list-none p-0">
            {builtHere.map(post => (
              <li key={post.slug}>
                <Link href={`/thoughts/${post.slug}`} className="block border-t border-divider py-2 font-serif text-inkBody transition-colors hover:text-ink">{post.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="order-first md:sticky md:top-6 md:order-none">
          <Room onSelect={setActive} />
        </div>
      </div>

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
              {active && <Panel id={active} status={status} healthy={healthy} posts={builtHere} />}
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
