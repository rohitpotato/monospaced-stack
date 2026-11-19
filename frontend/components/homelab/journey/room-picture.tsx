'use client'

import type { MotionValue } from 'framer-motion'
import type { StopId, Target } from './stops'
import { useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { LABELS, PICTURE, STATUS_LIGHT, STOPS } from './stops'

export type Light = 'ok' | 'warn' | 'unknown'

const LIGHT_COLOR: Record<Light, string> = {
  ok: 'var(--color-status-ok)',
  warn: 'var(--color-status-warn)',
  unknown: 'var(--color-ink-subtle)',
}

const ease = (t: number) => t * t * (3 - 2 * t)

/** The part of the picture to show at a position between stops, kept inside the picture. */
function viewAt(x: number, W: number, H: number) {
  const last = STOPS.length - 1
  const xi = Math.min(Math.max(x, 0), last)
  const i = Math.min(Math.floor(xi), last - 1)
  const t = ease(xi - i)
  const [ax, ay, az] = STOPS[i].view
  const [bx, by, bz] = STOPS[i + 1].view
  const zoom = Math.exp(Math.log(az) + (Math.log(bz) - Math.log(az)) * t)
  const cover = Math.max(W / PICTURE.w, H / PICTURE.h)
  const vw = W / cover / zoom
  const vh = H / cover / zoom
  const cx = Math.max(vw / 2, Math.min(PICTURE.w - vw / 2, ax + (bx - ax) * t))
  const cy = Math.max(vh / 2, Math.min(PICTURE.h - vh / 2, ay + (by - ay) * t))
  return { sx: cx - vw / 2, sy: cy - vh / 2, scale: W / vw, stop: STOPS[Math.round(xi)].id }
}

/**
 * The room as one illustrated picture. Scrolling pans and zooms between the
 * stops; the labels and the status light are pinned to the picture and open
 * the same detail drawers as the chapter links.
 */
export function RoomPicture({ position, reduceMotion, light, lightText, onTarget }: {
  position: MotionValue<number>
  reduceMotion: boolean
  light: Light
  lightText: string
  onTarget: (t: Target) => void
}) {
  const box = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const labels = useRef<(HTMLElement | null)[]>([])
  const lightEl = useRef<HTMLSpanElement>(null)
  const [loaded, setLoaded] = useState(false)
  const smooth = useSpring(position, { stiffness: 80, damping: 22, restDelta: 0.0005 })

  useEffect(() => {
    const el = box.current
    const cv = canvas.current
    const g = cv?.getContext('2d')
    if (!el || !cv || !g)
      return
    const source = reduceMotion ? position : smooth
    const img = new Image()
    let ready = false
    let W = 0
    let H = 0

    function place(node: HTMLElement | null, [px, py]: [number, number], v: ReturnType<typeof viewAt>, show: boolean) {
      if (!node)
        return
      const x = (px - v.sx) * v.scale
      const y = (py - v.sy) * v.scale
      const inside = x > 40 && x < W - 40 && y > 36 && y < H - 8
      node.style.transform = `translate(${x}px, ${y}px)`
      node.style.opacity = show && inside ? '1' : '0'
      node.style.pointerEvents = show && inside ? 'auto' : 'none'
    }

    function draw() {
      if (!ready || !W || !H || !g || !cv)
        return
      const x = reduceMotion ? Math.round(source.get()) : source.get()
      const v = viewAt(x, W, H)
      const dpr = cv.width / W
      g.setTransform(1, 0, 0, 1, 0, 0)
      g.imageSmoothingEnabled = true
      g.imageSmoothingQuality = 'high'
      g.setTransform(v.scale * dpr, 0, 0, v.scale * dpr, -v.sx * v.scale * dpr, -v.sy * v.scale * dpr)
      g.drawImage(img, 0, 0, PICTURE.w, PICTURE.h)
      const shown = (stop: StopId) => v.stop === 'room' || v.stop === stop
      LABELS.forEach((l, i) => place(labels.current[i], l.at, v, shown(l.stop)))
      place(lightEl.current, STATUS_LIGHT, v, true)
    }

    function resize() {
      if (!el || !cv)
        return
      W = el.clientWidth
      H = el.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = Math.round(W * dpr)
      cv.height = Math.round(H * dpr)
      draw()
    }

    img.onload = () => {
      ready = true
      setLoaded(true)
      draw()
    }
    img.src = PICTURE.src
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    resize()
    const stop = source.on('change', draw)
    return () => {
      stop()
      ro.disconnect()
      img.onload = null
    }
  }, [position, smooth, reduceMotion])

  return (
    <div ref={box} className="absolute inset-0">
      {/* Shown until the full picture is ready, and to anyone without JavaScript. */}
      <img src={PICTURE.placeholder} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover" />
      <canvas
        ref={canvas}
        role="img"
        aria-label="An illustrated bedroom: a desk with a monitor by an open window, a dog asleep on the bed, and a metal shelf with a router, a switch and a server"
        className={`absolute inset-0 size-full transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
      {/* The chapters have the same links as text; these are a shortcut for pointers. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {LABELS.map((l, i) => {
          const pill = 'absolute top-0 left-0 -translate-x-1/2 -translate-y-[calc(100%+14px)] whitespace-nowrap rounded-full bg-[rgba(255,248,238,0.95)] px-2.5 py-1 font-mono text-[11px] text-[#1b1a22] opacity-0 shadow-[0_4px_14px_rgba(0,0,0,0.4)] transition-opacity duration-300 after:absolute after:top-full after:left-[calc(50%-0.75px)] after:h-3.5 after:w-[1.5px] after:bg-[rgba(255,248,238,0.85)] sm:text-xs'
          return l.target
            ? (
                <button
                  key={l.text}
                  ref={(n) => { labels.current[i] = n }}
                  type="button"
                  tabIndex={-1}
                  onClick={() => onTarget(l.target!)}
                  className={`${pill} cursor-pointer hover:bg-white focus-visible:outline-none`}
                >
                  {l.text}
                  <span className="ml-1 text-[#7a5a3a]">↗</span>
                </button>
              )
            : <span key={l.text} ref={(n) => { labels.current[i] = n }} className={pill}>{l.text}</span>
        })}
        <span
          ref={lightEl}
          title={lightText}
          className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300"
        >
          <span className="block size-3 rounded-full border-2 border-[rgba(255,248,238,0.9)] shadow-[0_0_12px_3px_currentColor] motion-safe:animate-pulse" style={{ background: LIGHT_COLOR[light], color: LIGHT_COLOR[light] }} />
        </span>
      </div>
    </div>
  )
}
