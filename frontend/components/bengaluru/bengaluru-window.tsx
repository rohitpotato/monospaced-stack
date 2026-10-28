'use client'

import type { SkyPhase } from '@/hooks/use-bengaluru-time'
import type { PostSummary, Topic } from '@/lib/post-summary'
import * as Tooltip from '@radix-ui/react-tooltip'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'next-view-transitions'
import { useBengaluruTime } from '@/hooks/use-bengaluru-time'
import { useClusterStatus } from '@/hooks/use-cluster-status'
import { TOPIC_COLOR } from '@/lib/post-summary'

// Art lives in public/bengaluru (scripts/generate-bengaluru-art.py); the sky is drawn here.
const VIEW_W = 380
const VIEW_H = 440
const SKY_H = 306

const SKIES: Record<SkyPhase, { bands: string[], sun: { cy: number, color: string, glow: number } | null, moon: boolean }> = {
  dawn: { bands: ['#4d5a8a', '#7a6f9e', '#b88aa6', '#e2a7a0', '#f2c2a0', '#f7d6b0', '#f9e2bf'], sun: { cy: 262, color: '#fde7b8', glow: 0.3 }, moon: false },
  day: { bands: ['#6fa6d6', '#7fb2dd', '#90bde2', '#a2c8e6', '#b4d2ea', '#c5dcee', '#d4e5f0'], sun: { cy: 96, color: '#fff2c4', glow: 0.25 }, moon: false },
  sunset: { bands: ['#5e4474', '#7d4f7c', '#a65a7a', '#cc6a72', '#e4806a', '#f09a6c', '#f6b77a'], sun: { cy: 258, color: '#fde0a0', glow: 0.35 }, moon: false },
  night: { bands: ['#14152b', '#191a35', '#1f2040', '#26264a', '#2d2c52', '#35325a', '#3d3862'], sun: null, moon: true },
}

const BAND_TOPS = [0, 46, 92, 136, 176, 212, 246]

function Sky({ phase, topic }: { phase: SkyPhase, topic: Topic | null }) {
  const sky = SKIES[phase]
  return (
    <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="absolute inset-0 size-full" aria-hidden="true">
      {sky.bands.map((color, i) => (
        <motion.rect key={BAND_TOPS[i]} x={0} y={BAND_TOPS[i]} width={VIEW_W} height={60} initial={false} animate={{ fill: color }} transition={{ duration: 1.2 }} />
      ))}
      {sky.sun && (
        <>
          <circle cx={214} cy={sky.sun.cy} r={58} fill={sky.sun.color} opacity={sky.sun.glow} />
          <circle cx={214} cy={sky.sun.cy} r={34} fill={sky.sun.color} />
        </>
      )}
      {sky.moon && (
        <>
          <circle cx={300} cy={70} r={16} fill="#f2e3b3" />
          <circle cx={306} cy={65} r={14} fill={sky.bands[1]} />
          {[[40, 40], [90, 90], [140, 30], [190, 70], [250, 120], [330, 140], [60, 150], [120, 180]].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={1.2} fill="#efecf3" opacity={0.7} />
          ))}
        </>
      )}
      <motion.rect
        x={0}
        y={0}
        width={VIEW_W}
        height={SKY_H}
        style={{ mixBlendMode: 'color' }}
        initial={false}
        animate={{ fill: topic ? TOPIC_COLOR[topic] : '#000000', opacity: topic ? 0.45 : 0 }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      />
    </svg>
  )
}

function Sill() {
  const { status, ready, total, healthy } = useClusterStatus()
  const nodes = status?.nodes ?? []
  const reduceMotion = useReducedMotion()
  return (
    <svg viewBox="0 0 160 22" className="absolute bottom-3 left-1/2 w-[42%] -translate-x-1/2" aria-hidden="true">
      {[0, 1, 2].map((i) => {
        const node = nodes[i]
        const led = !node ? '#6f6c78' : node.ready ? 'var(--color-status-ok)' : 'var(--color-status-bad)'
        return (
          <g key={i} transform={`translate(${i * 56} 0)`}>
            <rect width={48} height={22} rx={3} fill={i === 2 ? '#94507a' : '#5a6f99'} />
            <motion.circle
              cx={10}
              cy={15}
              r={3}
              fill={led}
              animate={reduceMotion || !node ? undefined : { opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, delay: i * 0.4, repeat: Infinity, ease: 'linear' }}
            />
          </g>
        )
      })}
      <title>{total ? `${ready} of ${total} nodes ready${healthy ? '' : ', degraded'}` : 'Cluster status unavailable'}</title>
    </svg>
  )
}

export function BengaluruWindow({ newest, topic }: { newest?: PostSummary, topic: Topic | null }) {
  const { phase, label } = useBengaluruTime()
  const { ready, total } = useClusterStatus()
  const reduceMotion = useReducedMotion()
  const night = phase === 'night'

  return (
    <Tooltip.Provider delayDuration={120}>
      <figure className="mx-auto w-full max-w-[24rem]">
        <div className="relative">
          <div className="relative overflow-hidden rounded-xl border-[6px] border-[#2b2636] bg-[#2b2636]" style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}>
            <Link href="/homelab" aria-label="A window onto Bengaluru. Go to the homelab" className="absolute inset-0 block">
              <Sky phase={phase} topic={topic} />
              <img src="/bengaluru/city.svg" alt="" className="absolute inset-0 size-full" draggable={false} />
              <motion.div
                className="absolute inset-0 bg-[#141533]"
                style={{ mixBlendMode: 'multiply' }}
                initial={false}
                animate={{ opacity: night ? 0.55 : phase === 'dawn' ? 0.15 : 0 }}
                transition={{ duration: 1.2 }}
              />
              <motion.img
                src="/bengaluru/train.svg"
                alt=""
                className="absolute inset-0 size-full"
                draggable={false}
                initial={reduceMotion ? false : { x: '18%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 2.4, ease: [0.2, 0.8, 0.2, 1], delay: 0.4 }}
              />
              <motion.img
                src="/bengaluru/lights.svg"
                alt=""
                className="absolute inset-0 size-full"
                draggable={false}
                initial={false}
                animate={{ opacity: night ? 1 : phase === 'sunset' ? 0.35 : 0 }}
                transition={{ duration: 1.2 }}
              />
            </Link>
            {newest && (
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Link
                    href={`/thoughts/${newest.slug}`}
                    aria-label={`Newest post, on the metro: ${newest.title}`}
                    className="absolute rounded-md"
                    style={{ left: '46%', top: '70.5%', width: '54%', height: '7%' }}
                  />
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content side="top" sideOffset={6} className="z-50 max-w-72 rounded-lg border border-divider-strong bg-[var(--color-tooltip-bg)] px-3 py-2 shadow-lg">
                    <p className="font-mono text-[11px] text-accent uppercase">On the metro · newest</p>
                    <p className="font-serif text-base text-ink">{newest.title}</p>
                    <Tooltip.Arrow className="fill-[var(--color-tooltip-bg)]" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            )}
          </div>
          <div className="h-3 rounded-b bg-divider-strong" />
          <Sill />
        </div>
        <figcaption className="mt-5 font-mono text-xs text-inkSubtle">
          Bengaluru
          {label && `, ${label}`}
          {' · '}
          <Link href="/homelab" className="transition-colors hover:text-ink">
            {total ? `${ready}/${total} nodes ready` : 'homelab'}
            {' →'}
          </Link>
        </figcaption>
      </figure>
    </Tooltip.Provider>
  )
}
