'use client'

import type { RoomSceneProps } from './room-scene'
import type { Target } from './stops'
import { format, parseISO } from 'date-fns'
import { useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useClusterStatus } from '@/hooks/use-cluster-status'
import { useLabNotebook } from '@/hooks/use-lab-notebook'
import { STOPS } from './stops'

// three.js only loads on this page, and only in the browser.
const RoomScene = dynamic<RoomSceneProps>(() => import('./room-scene'), { ssr: false, loading: () => null })

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  }
  catch {
    return false
  }
}

function shortDate(iso: string) {
  const d = parseISO(iso)
  return Number.isNaN(d.getTime()) ? iso : format(d, 'MMM d').toLowerCase()
}

/**
 * The homelab as a walk through one room. Each chapter on the left is a stop;
 * scrolling moves the camera from one to the next. The room sits fixed on the
 * right on wide screens and pinned above the text on narrow ones.
 */
export function Journey({ onTarget }: { onTarget: (t: Target) => void }) {
  const list = useRef<HTMLOListElement>(null)
  const reduceMotion = !!useReducedMotion()
  const { status, ready, total } = useClusterStatus()
  const { entries } = useLabNotebook()
  const [webgl, setWebgl] = useState<boolean | null>(null)
  useEffect(() => setWebgl(hasWebGL()), [])

  // Progress through the chapter list, as a position between stops.
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 62%', 'end 62%'] })
  const N = STOPS.length
  const position = useTransform(scrollYProgress, p => Math.min(Math.max(p * N - 0.5, 0), N - 1))
  const [active, setActive] = useState(0)
  useMotionValueEvent(position, 'change', x => setActive(Math.round(x)))

  const nodes = (status?.nodes ?? []).map(n => ({ ready: n.ready }))
  const readyText = total ? `${ready}/${total} ready` : 'status unknown'
  const latest = entries[0]
  const argo = status?.argo
  const screen = {
    date: latest ? shortDate(latest.date) : '',
    note: latest?.note ?? 'Waiting for the next change',
    synced: argo ? (argo.synced === argo.apps ? '● all apps synced by Argo CD' : `● ${argo.synced}/${argo.apps} apps synced`) : '● synced by Argo CD',
  }

  return (
    <div className="relative">
      {/* Pinned above the chapters on narrow screens; fixed beside the text from 1100px. */}
      <div className="sticky top-0 z-10 -mx-[var(--space-page-x)] h-[44dvh] bg-page px-[var(--space-page-x)] pt-2 pb-3 min-[1100px]:fixed min-[1100px]:top-[52px] min-[1100px]:right-[72px] min-[1100px]:bottom-[52px] min-[1100px]:left-[calc(72px+42rem)] min-[1100px]:mx-0 min-[1100px]:h-auto min-[1100px]:p-0 min-[1400px]:left-[calc(72px+48rem)]">
        <div className="relative size-full overflow-hidden rounded-2xl bg-[#201d27]" style={{ viewTransitionName: 'homelab-window' }}>
          {webgl === false && (
            <img src="/homelab/room.webp" alt="A small room with a desk, a rack of three servers and a potato on a shelf" className="size-full object-cover" />
          )}
          {webgl && (
            <RoomScene position={position} active={active} reduceMotion={reduceMotion} nodes={nodes} readyText={readyText} screen={screen} onTarget={onTarget} />
          )}
          <div aria-hidden="true" className="pointer-events-none absolute bottom-3 left-3 flex gap-1">
            {STOPS.map((s, i) => (
              <span key={s.id} className={`h-[3px] w-4 rounded-full transition-colors sm:w-5 ${i <= active ? 'bg-accent' : 'bg-[#3a3346]'}`} />
            ))}
          </div>
        </div>
      </div>

      <ol ref={list} className="relative mt-2 list-none p-0">
        {STOPS.map((stop, i) => (
          <li
            key={stop.id}
            className={`flex min-h-[56dvh] flex-col justify-center py-8 transition-opacity duration-500 min-[1100px]:min-h-[72dvh] ${i === active ? 'opacity-100' : 'opacity-35'}`}
          >
            <p className="font-mono text-xs text-accent">{stop.kicker}</p>
            <h2 className="mt-2 font-serif text-3xl font-medium text-ink sm:text-4xl">{stop.title}</h2>
            {stop.text.map(t => (
              <p key={t} className="mt-3 font-serif text-lg leading-relaxed text-inkBody">
                {stop.id === 'nodes' && t.startsWith('One runs') && total ? `${t} Right now ${ready} of ${total} are.` : t}
              </p>
            ))}
            {stop.id === 'nodes' && (
              <button type="button" onClick={() => onTarget('nodes')} className="editorial-link mt-3 self-start font-serif">Open the server details →</button>
            )}
            {stop.id === 'monitor' && (
              <button type="button" onClick={() => onTarget('deploys')} className="editorial-link mt-3 self-start font-serif">See recent changes →</button>
            )}
            {stop.id === 'potato' && (
              <button type="button" onClick={() => onTarget('potato')} className="editorial-link mt-3 self-start font-serif">Poke the potato →</button>
            )}
            {(stop.id === 'cloud' || stop.id === 'pod') && (
              <button type="button" onClick={() => onTarget('path')} className="editorial-link mt-3 self-start font-serif">The whole route, step by step →</button>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
