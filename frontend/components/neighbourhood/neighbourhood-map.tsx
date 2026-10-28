'use client'

import type { PostSummary } from '@/lib/post-summary'
import * as Tooltip from '@radix-ui/react-tooltip'
import { differenceInDays } from 'date-fns'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'next-view-transitions'
import { toast } from 'sonner'
import { useCopyToClipboard, useIsClient } from 'usehooks-ts'
import { useClusterStatus } from '@/hooks/use-cluster-status'
import { iso, isoBox, isoQuad, onLeftFace, onRightFace, toPoints } from '@/lib/iso'
import { TOPIC_COLOR } from '@/lib/post-summary'
import { Lamp, MapLabel, Parcel, Potato, Tree } from './map-parts'

const O = { x: 600, y: 190 }
const N = 440
const FEED_URL = 'https://rohitpotato.xyz/rss.xml'
const RECENT_DAYS = 200

const hover = { y: -5, transition: { type: 'spring', stiffness: 400, damping: 22 } } as const

function Box({ u, v, w, d, h, z = 0, top, right, left }: { u: number, v: number, w: number, d: number, h: number, z?: number, top: string, right: string, left: string }) {
  const f = isoBox(O, u, v, w, d, h, z)
  return (
    <>
      <polygon points={f.right} fill={right} />
      <polygon points={f.left} fill={left} />
      <polygon points={f.top} fill={top} />
    </>
  )
}

function TooltipBody({ eyebrow, title }: { eyebrow: string, title: string }) {
  return (
    <Tooltip.Portal>
      <Tooltip.Content
        side="top"
        sideOffset={6}
        className="z-50 max-w-72 rounded-lg border border-divider-strong bg-[var(--color-tooltip-bg)] px-3 py-2 shadow-lg data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
      >
        <p className="font-mono text-[11px] text-accent uppercase">{eyebrow}</p>
        <p className="font-serif text-base text-ink">{title}</p>
        <Tooltip.Arrow className="fill-[var(--color-tooltip-bg)]" />
      </Tooltip.Content>
    </Tooltip.Portal>
  )
}

function Ground() {
  const dashes = []
  for (let t = 10; t < N; t += 34) {
    if (t > 190 && t < 255)
      continue
    const a = iso(O, t, 225)
    const b = iso(O, t + 16, 225)
    const c = iso(O, 225, t)
    const d = iso(O, 225, t + 16)
    dashes.push(
      <line key={`u${t}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#d9cfb8" strokeWidth={2} opacity={0.5} />,
      <line key={`v${t}`} x1={c[0]} y1={c[1]} x2={d[0]} y2={d[1]} stroke="#d9cfb8" strokeWidth={2} opacity={0.5} />,
    )
  }
  const kerb = (a: [number, number], b: [number, number], k: string) => (
    <line key={k} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#8a8478" strokeWidth={3} opacity={0.6} />
  )
  return (
    <g aria-hidden="true">
      <polygon points={toPoints([iso(O, 0, N), iso(O, N, N), iso(O, N, N, -16), iso(O, 0, N, -16)])} fill="#3e2c22" />
      <polygon points={toPoints([iso(O, N, 0), iso(O, N, N), iso(O, N, N, -16), iso(O, N, 0, -16)])} fill="#4a3426" />
      <polygon points={isoQuad(O, 0, 0, N, N)} fill="#4f7a43" />
      <polygon points={isoQuad(O, 0, 200, N, 250)} fill="#3b3a3e" />
      <polygon points={isoQuad(O, 200, 0, 250, N)} fill="#3b3a3e" />
      <polygon points={isoQuad(O, 200, 200, 250, 250)} fill="#444348" />
      {dashes}
      {kerb(iso(O, 0, 196), iso(O, N, 196), 'k1')}
      {kerb(iso(O, 0, 254), iso(O, N, 254), 'k2')}
      {kerb(iso(O, 196, 0), iso(O, 196, N), 'k3')}
      {kerb(iso(O, 254, 0), iso(O, 254, N), 'k4')}
    </g>
  )
}

function Library({ posts, night }: { posts: PostSummary[], night: boolean }) {
  const windows = posts.slice(0, 9)
  const [labelX, labelY] = iso(O, 105, 100, 84)
  const [signX, signY] = iso(O, 60, 160, 76)
  return (
    <g>
      <Link href="/#writing" aria-label="Writing: jump to all posts">
        <motion.g whileHover={hover} whileFocus={hover}>
          <Box u={40} v={40} w={130} d={120} h={84} top="#c9b48a" right="#8a6a4f" left="#a3815e" />
          <polygon points={onLeftFace(O, 40, 160, 74, 130, 10)} fill="#7a5c41" />
          <polygon points={onRightFace(O, 170, 52, 0, 34, 40)} fill="#4d3c2c" />
          <text transform={`matrix(0.866 0.5 0 1 ${signX} ${signY})`} className="font-mono" fontSize={9} fill="#f2e3b3">WRITING</text>
        </motion.g>
      </Link>
      {windows.map((post, i) => {
        const col = i % 3
        const row = 2 - Math.floor(i / 3)
        const recent = differenceInDays(new Date(), new Date(post.publishedAt)) < RECENT_DAYS
        const lit = recent || night
        return (
          <Tooltip.Root key={post.slug}>
            <Tooltip.Trigger asChild>
              <Link href={`/thoughts/${post.slug}`} prefetch={false} aria-label={post.title}>
                <motion.polygon
                  points={onLeftFace(O, 54 + col * 38, 160, 12 + row * 22, 22, 14)}
                  fill={lit ? '#f6d28b' : '#4d3c2c'}
                  stroke={TOPIC_COLOR[post.topic]}
                  strokeWidth={0}
                  whileHover={{ strokeWidth: 2 }}
                  whileFocus={{ strokeWidth: 2 }}
                />
              </Link>
            </Tooltip.Trigger>
            <TooltipBody eyebrow={`${post.category} · ${post.readingMinutes} min`} title={post.title} />
          </Tooltip.Root>
        )
      })}
      <MapLabel x={labelX} y={labelY - 108} width={210} title="Writing" subtitle={`library · ${posts.length} posts`} />
    </g>
  )
}

function Observatory({ posts }: { posts: PostSummary[] }) {
  const [cx, cy] = iso(O, 345, 95, 66)
  const sorted = [...posts].sort((a, b) => +new Date(a.publishedAt) - +new Date(b.publishedAt))
  const first = +new Date(sorted[0]?.publishedAt ?? Date.now())
  const span = Math.max(1, Date.now() - first)
  const bars = sorted.slice(-6)
  return (
    <Link href="/archive" aria-label="Archive: every post as a trace">
      <motion.g whileHover={hover} whileFocus={hover}>
        <Box u={290} v={40} w={110} d={110} h={66} top="#d6d3dd" right="#8b8798" left="#a8a4b3" />
        <path d={`M${cx - 44} ${cy} A44 44 0 0 1 ${cx + 44} ${cy} Z`} fill="#e8e5ef" />
        <ellipse cx={cx} cy={cy} rx={44} ry={12} fill="#bdb8c9" />
        <path d={`M${cx - 6} ${cy - 43} L${cx + 6} ${cy - 43} L${cx + 8} ${cy - 4} L${cx - 8} ${cy - 4}Z`} fill="#2b2636" />
        <motion.line
          x1={cx}
          y1={cy - 26}
          x2={cx + 40}
          y2={cy - 62}
          stroke="#8b8798"
          strokeWidth={6}
          strokeLinecap="round"
          style={{ transformOrigin: `${cx}px ${cy - 26}px` }}
          whileHover={{ rotate: -12 }}
        />
        <polygon points={onLeftFace(O, 300, 150, 10, 90, 46)} fill="#141519" />
        {bars.map((post, i) => {
          const u = 304 + ((+new Date(post.publishedAt) - first) / span) * 70
          return (
            <polygon
              key={post.slug}
              points={onLeftFace(O, u, 150, 48 - i * 6.5, Math.max(6, post.readingMinutes * 1.2), 3.5)}
              fill={TOPIC_COLOR[post.topic]}
            />
          )
        })}
        <polygon points={onRightFace(O, 400, 60, 0, 30, 34)} fill="#5d596a" />
      </motion.g>
      <MapLabel x={cx + 40} y={cy - 128} width={190} title="Archive" subtitle="observatory · trace view" />
    </Link>
  )
}

function House() {
  const { status, ready, total, healthy } = useClusterStatus()
  const reduceMotion = useReducedMotion()
  const roof = (pts: [number, number, number][]) => toPoints(pts.map(([u, v, h]) => iso(O, u, v, h)))
  const [sx, sy] = iso(O, 68, 318, 110)
  const [mx, my] = iso(O, 175, 395)
  const [labelX, labelY] = iso(O, 100, 345, 98)
  const statusText = total ? `${ready}/${total}` : '–'
  const dot = !total ? 'var(--color-ink-subtle)' : healthy ? 'var(--color-status-ok)' : 'var(--color-status-warn)'
  const nodes = status?.nodes ?? []

  return (
    <Link href="/homelab" aria-label={`Homelab: ${total ? `${ready} of ${total} nodes ready` : 'cluster status'}`}>
      <motion.g whileHover={hover} whileFocus={hover}>
        <Box u={40} v={290} w={120} d={110} h={58} top="#efe6d6" right="#b9a98f" left="#d6c8ae" />
        <polygon points={roof([[34, 284, 58], [166, 284, 58], [166, 345, 98], [34, 345, 98]])} fill="#7a3b22" />
        <polygon points={roof([[34, 406, 58], [166, 406, 58], [166, 345, 98], [34, 345, 98]])} fill="#a0522d" />
        <polygon points={roof([[166, 284, 58], [166, 406, 58], [166, 345, 98]])} fill="#c96e5a" />
        <Box u={60} v={310} w={16} d={16} h={30} z={78} top="#8a6a4f" right="#6e533d" left="#7a5c41" />
        {['#e3a15b', '#7fb8a4', '#c49bd6', '#e3a15b'].map((color, i) => (
          <motion.rect
            key={i}
            x={sx + 4}
            y={sy - 8}
            width={7}
            height={5}
            rx={1.5}
            fill={color}
            initial={{ opacity: 0, y: 0, x: 0 }}
            animate={reduceMotion ? { opacity: 0.6, y: -14 * i, x: 3 * i } : { opacity: [0, 0.9, 0], y: [0, -56], x: [0, 10] }}
            transition={{ duration: 3.2, delay: i * 0.8, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
        <polygon points={onLeftFace(O, 60, 400, 12, 64, 34)} fill="#2b2636" />
        {[0, 1, 2].map((j) => {
          const node = nodes[j]
          const led = !node ? '#6f6a63' : node.ready ? 'var(--color-status-ok)' : 'var(--color-status-bad)'
          const [lx, ly] = iso(O, 70 + j * 20, 400, 34)
          return (
            <g key={j}>
              <polygon points={onLeftFace(O, 66 + j * 20, 400, 16, 14, 24)} fill={j === 2 ? '#6e3a5b' : '#3c4d73'} />
              <motion.circle
                cx={lx}
                cy={ly}
                r={1.8}
                fill={led}
                animate={reduceMotion || !node ? undefined : { opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.4, delay: j * 0.4, repeat: Infinity, ease: 'linear' }}
              />
            </g>
          )
        })}
        <polygon points={onLeftFace(O, 132, 400, 0, 18, 32)} fill="#7a3b2a" />
        <polygon points={onRightFace(O, 160, 300, 14, 34, 22)} fill="#f6d28b" />
        <rect x={mx - 2} y={my - 22} width={3} height={22} fill="#6e533d" />
        <rect x={mx - 10} y={my - 33} width={26} height={13} rx={2} fill="#1d2b26" />
        <text x={mx + 3} y={my - 23.5} textAnchor="middle" className="font-mono" fontSize={7.5} fill={dot}>{statusText}</text>
      </motion.g>
      <MapLabel
        x={labelX - 40}
        y={labelY - 92}
        width={226}
        dot={dot}
        title="Homelab"
        subtitle={total ? `${ready}/${total} nodes ready · go inside →` : 'cluster · go inside →'}
      />
    </Link>
  )
}

function PostOffice({ count }: { count: number }) {
  const [, copy] = useCopyToClipboard()
  const [signX, signY] = iso(O, 300, 380, 32)
  const [labelX, labelY] = iso(O, 340, 335, 48)
  const parcels = Math.min(3, Math.max(1, Math.ceil(count / 3)))

  async function onClick() {
    const ok = await copy(FEED_URL)
    if (ok)
      toast('Parcel shipped', { description: 'RSS feed URL copied. New posts will be delivered.' })
    else
      window.location.href = '/rss.xml'
  }

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label="Post office: copy the RSS feed URL"
      className="cursor-pointer"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      <motion.g whileHover={hover} whileFocus={hover} whileTap={{ scale: 0.98 }}>
        <Box u={290} v={290} w={100} d={90} h={48} top="#c49bd6" right="#7f5a99" left="#a37fb8" />
        <polygon points={onLeftFace(O, 296, 380, 40, 88, 10)} fill="#f2e3b3" />
        {[0, 1, 2, 3].map(k => (
          <polygon key={k} points={onLeftFace(O, 296 + k * 22, 380, 38, 11, 3)} fill="#e94f37" />
        ))}
        <polygon points={onLeftFace(O, 330, 380, 0, 22, 30)} fill="#4b3560" />
        <polygon points={onRightFace(O, 390, 300, 10, 30, 22)} fill="#f6d28b" />
        <text transform={`matrix(0.866 0.5 0 1 ${signX} ${signY})`} x={34} className="font-mono" fontSize={9} fill="#2a1a3a">RSS</text>
      </motion.g>
      <Parcel origin={O} u={400} v={330} s={16} />
      {parcels > 1 && <Parcel origin={O} u={400} v={350} s={14} />}
      {parcels > 2 && <Parcel origin={O} u={402} v={333} s={12} z={12} />}
      <MapLabel x={labelX + 150} y={labelY - 40} width={190} title="Post office" subtitle="RSS · get posts delivered" />
    </g>
  )
}

function Scooter({ post }: { post: PostSummary }) {
  const reduceMotion = useReducedMotion()
  const [x0, y0] = iso(O, 225, 20)
  const [xp, yp] = iso(O, 225, 330)
  const [x1, y1] = iso(O, 225, 430)

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Link href={`/thoughts/${post.slug}`} aria-label={`Out for delivery, newest post: ${post.title}`}>
          <motion.g
            initial={{ x: x0, y: y0, opacity: 0 }}
            animate={reduceMotion
              ? { x: xp, y: yp, opacity: 1 }
              : { x: [x0, xp, xp, x1], y: [y0, yp, yp, y1], opacity: [0, 1, 1, 0] }}
            transition={{
              default: { duration: 14, times: [0, 0.5, 0.7, 1], repeat: Infinity, ease: 'linear' },
              opacity: { duration: 14, times: [0, 0.06, 0.94, 1], repeat: Infinity, ease: 'linear' },
            }}
          >
            <rect x={-28} y={-40} width={56} height={54} fill="transparent" />
            <ellipse cx={0} cy={6} rx={22} ry={6} fill="#000" opacity={0.25} />
            <g transform="scale(-1 1)">
              <path d="M-14 0 L14 -8" stroke="#e8e5df" strokeWidth={3} strokeLinecap="round" />
              <circle cx={-14} cy={0} r={5} fill="none" stroke="#e8e5df" strokeWidth={2.5} />
              <circle cx={14} cy={-8} r={5} fill="none" stroke="#e8e5df" strokeWidth={2.5} />
              <path d="M10 -8 L6 -26 L12 -28" stroke="#e8e5df" strokeWidth={2.5} fill="none" strokeLinecap="round" />
              <rect x={-24} y={-26} width={18} height={16} rx={2} fill="#a77bd6" />
            </g>
            <g transform="translate(0 -30) scale(.28)">
              <Potato />
            </g>
          </motion.g>
        </Link>
      </Tooltip.Trigger>
      <TooltipBody eyebrow="Out for delivery · newest" title={post.title} />
    </Tooltip.Root>
  )
}

export function NeighbourhoodMap({ posts }: { posts: PostSummary[] }) {
  const isClient = useIsClient()
  const hour = isClient ? new Date().getHours() : 12
  const night = hour >= 18 || hour < 7

  return (
    <Tooltip.Provider delayDuration={120}>
      <figure className="relative">
        <svg
          viewBox="180 70 840 600"
          className="h-auto w-full select-none"
          role="group"
          aria-label="A small isometric neighbourhood. Each building is a section of the site."
        >
          <Ground />
          <Tree origin={O} u={20} v={20} r={13} h={24} />
          <Tree origin={O} u={180} v={175} r={11} color="#6fa55c" />
          <Tree origin={O} u={275} v={20} />
          <Library posts={posts} night={night} />
          <Observatory posts={posts} />
          <House />
          <Tree origin={O} u={20} v={270} />
          <Tree origin={O} u={430} v={270} />
          <Lamp origin={O} u={192} v={192} lit={night} />
          <Lamp origin={O} u={258} v={192} lit={night} />
          <Lamp origin={O} u={192} v={258} lit={night} />
          {posts[0] && <Scooter post={posts[0]} />}
          <PostOffice count={posts.length} />
          <Lamp origin={O} u={258} v={258} lit={night} />
          <Tree origin={O} u={180} v={430} r={13} h={24} color="#6fa55c" />
          <Tree origin={O} u={275} v={425} r={11} h={20} />
        </svg>
        <figcaption className="sr-only">
          The library leads to all posts, the observatory to the archive, the house to the homelab, and the post office copies the RSS feed URL.
        </figcaption>
      </figure>
    </Tooltip.Provider>
  )
}
