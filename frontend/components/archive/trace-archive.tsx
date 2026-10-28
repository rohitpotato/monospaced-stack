'use client'

import type { PostSummary } from '@/lib/post-summary'
import { AxisTop } from '@visx/axis'
import { ParentSize } from '@visx/responsive'
import { scaleTime } from '@visx/scale'
import { addDays, format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'next-view-transitions'
import { useMemo, useState } from 'react'
import { useEventListener } from 'usehooks-ts'
import { TOPIC_COLOR } from '@/lib/post-summary'
import { cn } from '@/lib/utils'

// Bars are sized by reading time, as a share of the track: 1 minute ≈ 1.1%.
const PERCENT_PER_MINUTE = 1.1

function traceId(posts: PostSummary[]) {
  let h = 2166136261
  for (const c of posts.map(p => p.slug).join('')) {
    h ^= c.charCodeAt(0)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0).toString(16).padStart(8, '0')
}

function Axis({ domain }: { domain: [Date, Date] }) {
  return (
    <ParentSize debounceTime={50}>
      {({ width }) => {
        if (!width)
          return null
        const scale = scaleTime({ domain, range: [0, width] })
        // Keep labels at least 76px apart and inside the right edge.
        const ticks = scale.ticks(6).filter(t => scale(t) < width - 64).reduce<Date[]>((kept, t) => {
          const prev = kept.at(-1)
          if (!prev || scale(t) - scale(prev) >= 76)
            kept.push(t)
          return kept
        }, [])
        return (
          <svg width={width} height={22} aria-hidden="true" className="overflow-visible">
            <AxisTop
              top={22}
              scale={scale}
              tickValues={ticks}
              tickFormat={d => format(d as Date, 'MMM yyyy')}
              hideAxisLine
              tickLength={0}
              tickStroke="transparent"
              tickLabelProps={() => ({
                fill: 'var(--color-ink-subtle)',
                fontSize: 11,
                fontFamily: 'var(--font-code-mono), ui-monospace, monospace',
                textAnchor: 'start',
                dy: -4,
              })}
            />
          </svg>
        )
      }}
    </ParentSize>
  )
}

export function TraceArchive({ posts }: { posts: PostSummary[] }) {
  const spans = useMemo(
    () => [...posts].sort((a, b) => +new Date(a.publishedAt) - +new Date(b.publishedAt)),
    [posts],
  )
  const [selected, setSelected] = useState(spans.length - 1)

  const domain = useMemo<[Date, Date]>(() => {
    const first = new Date(spans[0]?.publishedAt ?? Date.now())
    const last = new Date(spans.at(-1)?.publishedAt ?? Date.now())
    return [addDays(first, -20), addDays(last, 45)]
  }, [spans])
  const percent = useMemo(() => scaleTime({ domain, range: [0, 100] }), [domain])

  useEventListener('keydown', (e) => {
    if (e.target instanceof HTMLInputElement || e.metaKey || e.ctrlKey)
      return
    if (e.key === 'j')
      setSelected(i => Math.min(spans.length - 1, i + 1))
    if (e.key === 'k')
      setSelected(i => Math.max(0, i - 1))
  })

  const post = spans[selected]
  const first = spans[0]
  const last = spans.at(-1)
  if (!post || !first || !last)
    return null

  return (
    <div>
      <p className="font-mono text-xs text-inkSubtle">
        trace_id
        {' '}
        {traceId(spans)}
        {' · '}
        {spans.length}
        {' '}
        spans ·
        {' '}
        {first.publishedAt}
        {' → '}
        {last.publishedAt}
        {' · status OK'}
      </p>

      <div className="mt-5 rounded-xl border border-divider bg-surface p-3 sm:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-x-4">
          <div className="hidden sm:block" />
          <div className="h-[22px]">
            <Axis domain={domain} />
          </div>
        </div>

        <ol className="mt-1 list-none p-0" aria-label="Posts as spans, oldest first">
          <li className="grid grid-cols-1 items-center py-1.5 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-x-4">
            <span className="truncate px-2 font-serif text-[15px] text-inkSubtle">rohitpotato.xyz</span>
            <div className="relative h-5">
              <div className="absolute inset-y-0 left-0 flex w-full items-center rounded bg-elevated px-2 font-mono text-[11px] text-inkSubtle">
                GET / · root span
              </div>
            </div>
          </li>

          {spans.map((span, i) => {
            const left = percent(new Date(span.publishedAt))
            const width = Math.max(1.5, span.readingMinutes * PERCENT_PER_MINUTE)
            const active = i === selected
            return (
              <li key={span.slug}>
                <button
                  type="button"
                  onClick={() => setSelected(i)}
                  aria-pressed={active}
                  className={cn(
                    'relative grid w-full grid-cols-1 items-center gap-y-1 rounded-md py-1.5 text-left transition-colors sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-x-4',
                    active ? 'bg-elevated' : 'hover:bg-[var(--color-wash-hover)]',
                  )}
                >
                  {active && <motion.span layoutId="span-marker" className="absolute inset-y-1 left-0 w-0.5 rounded bg-accent" />}
                  <span className={cn('truncate px-2 font-serif text-[15px]', active ? 'text-ink' : 'text-inkBody')}>
                    {span.title}
                  </span>
                  <span className="relative block h-5">
                    <span
                      className="absolute inset-y-0 flex items-center rounded"
                      style={{
                        left: `${Math.min(left, 100 - width)}%`,
                        width: `${width}%`,
                        background: TOPIC_COLOR[span.topic],
                        outline: active ? '1.5px solid var(--color-ink)' : undefined,
                      }}
                    />
                    <span
                      className={cn(
                        'absolute top-1/2 -translate-y-1/2 font-mono text-[10px] text-inkSubtle',
                        left + width > 90 ? '-translate-x-full pr-1.5' : 'pl-1.5',
                      )}
                      style={{ left: `${left + width > 90 ? Math.min(left, 100 - width) : Math.min(left, 100 - width) + width}%` }}
                    >
                      {span.readingMinutes}
                      m
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
        <p className="mt-3 hidden px-2 font-mono text-[11px] text-inkSubtle sm:block">j / k to step through spans</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.section
          key={post.slug}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          aria-live="polite"
          className="mt-5 rounded-xl border border-divider bg-surface p-5 sm:p-7"
        >
          <p className="font-mono text-[11px] tracking-wide text-accent uppercase">
            span ·
            {' '}
            {post.slug}
          </p>
          <h2 className="mt-2 font-serif text-2xl font-medium text-ink sm:text-[1.75rem]">{post.title}</h2>
          <p className="mt-2 max-w-[60ch] font-serif text-lg text-inkBody">{post.summary}</p>
          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 font-mono text-xs">
              <dt className="text-inkSubtle">post.topic</dt>
              <dd className="text-ink">{post.category}</dd>
              <dt className="text-inkSubtle">read.duration</dt>
              <dd className="text-ink">
                {post.readingMinutes}
                m
              </dd>
              <dt className="text-inkSubtle">published</dt>
              <dd className="text-ink">{post.publishedAt}</dd>
            </dl>
            <Link
              href={`/thoughts/${post.slug}`}
              className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 font-sans text-sm font-medium text-[var(--color-on-accent)] transition-colors hover:bg-[var(--color-accent-strong)]"
            >
              Read post →
            </Link>
          </div>
        </motion.section>
      </AnimatePresence>
    </div>
  )
}
