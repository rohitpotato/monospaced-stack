'use client'

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { Link } from 'next-view-transitions'
import { useBengaluruTime } from '@/hooks/use-bengaluru-time'
import { useClusterStatus } from '@/hooks/use-cluster-status'

const POSTER_W = 1024
const POSTER_H = 1280
const PARALLAX_PX = 8

interface BengaluruWindowProps {
  /** Size from the parent's height (a sticky sidebar) instead of its width. */
  fillHeight?: boolean
}

export function BengaluruWindow({ fillHeight = false }: BengaluruWindowProps) {
  const { label } = useBengaluruTime()
  const { status, ready, total, healthy } = useClusterStatus()
  const reduceMotion = useReducedMotion()

  // Gentle parallax: the poster drifts a few pixels against the cursor.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const x = useSpring(px, { stiffness: 120, damping: 20 })
  const y = useSpring(py, { stiffness: 120, damping: 20 })

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (reduceMotion || e.pointerType !== 'mouse')
      return
    const r = e.currentTarget.getBoundingClientRect()
    px.set(-((e.clientX - r.left) / r.width - 0.5) * PARALLAX_PX * 2)
    py.set(-((e.clientY - r.top) / r.height - 0.5) * PARALLAX_PX * 2)
  }

  function onPointerLeave() {
    px.set(0)
    py.set(0)
  }

  const nodes = status?.nodes ?? []

  return (
    <figure className={fillHeight ? 'flex h-full flex-col items-end' : 'mx-auto w-full max-w-[24rem]'}>
      <Link
        href="/homelab"
        aria-label="Bengaluru at sunset. Go to the homelab"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="relative block w-full overflow-hidden rounded-2xl bg-[#f2603f]"
        style={{
          aspectRatio: `${POSTER_W} / ${POSTER_H}`,
          // In the sidebar: as wide as the column allows, but never taller than the sidebar minus the caption.
          ...(fillHeight && { width: `min(100%, calc((100dvh - 104px - 2.5rem) * ${POSTER_W} / ${POSTER_H}))` }),
        }}
      >
        {/* The sidebar only shows from 1100px, so smaller screens never download the poster. */}
        <motion.picture className="absolute inset-0 block scale-[1.04]" style={{ x, y }}>
          <source media="(min-width: 1100px)" srcSet="/bengaluru/poster-640.webp 640w, /bengaluru/poster-1024.webp 1024w" sizes="32rem" />
          <img
            src={fillHeight ? 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' : '/bengaluru/poster-640.webp'}
            width={POSTER_W}
            height={POSTER_H}
            alt=""
            decoding="async"
            draggable={false}
            className="size-full object-cover select-none"
          />
        </motion.picture>
      </Link>
      <figcaption className="mt-4 flex shrink-0 items-center gap-2 font-mono text-xs text-inkSubtle">
        <span>
          Bengaluru
          {label && `, ${label}`}
        </span>
        <span aria-hidden="true">·</span>
        <Link href="/homelab" className="inline-flex items-center gap-1.5 transition-colors hover:text-ink">
          <span className="inline-flex gap-1" aria-hidden="true">
            {[0, 1, 2].map((i) => {
              const node = nodes[i]
              return (
                <span
                  key={i}
                  className="size-1.5 rounded-full"
                  style={{ background: !node ? 'var(--color-ink-subtle)' : node.ready ? 'var(--color-status-ok)' : 'var(--color-status-bad)' }}
                />
              )
            })}
          </span>
          {total ? `${ready}/${total} nodes ${healthy ? 'ready' : 'degraded'}` : 'homelab'}
          {' →'}
        </Link>
      </figcaption>
    </figure>
  )
}
