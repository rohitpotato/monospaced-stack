'use client'

import type { Light } from './room-picture'
import type { Target } from './stops'
import { format, parseISO } from 'date-fns'
import { useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { useClusterStatus } from '@/hooks/use-cluster-status'
import { useLabNotebook } from '@/hooks/use-lab-notebook'
import { RoomPicture } from './room-picture'
import { STOPS } from './stops'

function shortDate(iso: string) {
  const d = parseISO(iso)
  return Number.isNaN(d.getTime()) ? iso : format(d, 'MMM d')
}

/**
 * The homelab as a walk through one illustrated room. Each chapter on the left
 * is a stop; scrolling pans and zooms the picture from one to the next. The
 * picture sits fixed on the right on wide screens and pinned above the text
 * on narrow ones.
 */
export function Journey({ onTarget }: { onTarget: (t: Target) => void }) {
  const list = useRef<HTMLOListElement>(null)
  const reduceMotion = !!useReducedMotion()
  const { status, ready, total, healthy } = useClusterStatus()
  const { entries } = useLabNotebook()

  // Progress through the chapter list, as a position between stops.
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 62%', 'end 62%'] })
  const N = STOPS.length
  const position = useTransform(scrollYProgress, p => Math.min(Math.max(p * N - 0.5, 0), N - 1))
  const [active, setActive] = useState(0)
  useMotionValueEvent(position, 'change', x => setActive(Math.round(x)))

  const latest = entries[0]
  const light: Light = !total ? 'unknown' : healthy ? 'ok' : 'warn'
  const lightText = total ? `${ready} of ${total} servers ready` : 'Live status unavailable'

  // A live line under some chapters, from the same data as the detail drawers.
  function liveLine(id: string) {
    if (id === 'desk' && latest)
      return `Latest: ${latest.note} · ${shortDate(latest.date)}`
    if (id === 'shelf' && total)
      return `Right now ${ready} of ${total} servers are ready${status?.argo ? `, and Argo CD has ${status.argo.synced} of ${status.argo.apps} apps in sync` : ''}.`
    return null
  }

  return (
    <div className="relative">
      {/* Pinned above the chapters on narrow screens; fixed beside the text from 1100px. */}
      <div className="sticky top-0 z-10 -mx-[var(--space-page-x)] h-[min(46dvh,100vw)] bg-page pt-1 pb-3 min-[1100px]:fixed min-[1100px]:top-1/2 min-[1100px]:right-[72px] min-[1100px]:left-[calc(72px+42rem)] min-[1100px]:mx-0 min-[1100px]:aspect-square min-[1100px]:h-auto min-[1100px]:max-h-[calc(100dvh-104px)] min-[1100px]:-translate-y-1/2 min-[1100px]:p-0 min-[1400px]:left-[calc(72px+48rem)]">
        <div className="relative size-full overflow-hidden bg-[#201d27] min-[1100px]:rounded-2xl" style={{ viewTransitionName: 'homelab-window' }}>
          <RoomPicture position={position} reduceMotion={reduceMotion} light={light} lightText={lightText} onTarget={onTarget} />
          <div aria-hidden="true" className="pointer-events-none absolute bottom-3 left-3 flex gap-1">
            {STOPS.map((s, i) => (
              <span key={s.id} className={`h-[3px] w-4 rounded-full transition-colors sm:w-5 ${i <= active ? 'bg-accent' : 'bg-white/35'}`} />
            ))}
          </div>
        </div>
      </div>

      <ol ref={list} className="relative mt-2 list-none p-0">
        {STOPS.map((stop, i) => {
          const live = liveLine(stop.id)
          return (
            <li
              key={stop.id}
              className={`flex min-h-[56dvh] flex-col justify-center py-8 transition-opacity duration-500 min-[1100px]:min-h-[72dvh] ${i === active ? 'opacity-100' : 'opacity-35'}`}
            >
              <p className="font-mono text-xs text-accent">{stop.kicker}</p>
              <h2 className="mt-2 font-serif text-3xl font-medium text-ink sm:text-4xl">{stop.title}</h2>
              {stop.text.map(t => (
                <p key={t} className="mt-3 font-serif text-lg leading-relaxed text-inkBody">{t}</p>
              ))}
              {live && <p className="mt-3 font-mono text-[13px] leading-relaxed text-inkSubtle">{live}</p>}
              {stop.id === 'cloud' && (
                <button type="button" onClick={() => onTarget('path')} className="editorial-link mt-3 self-start font-serif">The whole route, step by step →</button>
              )}
              {stop.id === 'desk' && (
                <button type="button" onClick={() => onTarget('deploys')} className="editorial-link mt-3 self-start font-serif">See recent changes →</button>
              )}
              {stop.id === 'shelf' && (
                <button type="button" onClick={() => onTarget('nodes')} className="editorial-link mt-3 self-start font-serif">Open the server details →</button>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
