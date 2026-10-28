'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Potato } from '@/components/neighbourhood/map-parts'

const STEPS = ['Packed', 'Picked up', 'On the way', 'Lost']

export function DeliveryScene() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="mt-10 w-full max-w-3xl">
      <ol className="grid grid-cols-4 font-mono text-[10px] tracking-wide uppercase sm:text-[11px]" aria-label="Delivery status">
        {STEPS.map((step, i) => (
          <li key={step} className={i === 3 ? 'text-accent' : 'text-inkSubtle'} aria-current={i === 3 ? 'step' : undefined}>
            {step}
          </li>
        ))}
      </ol>
      <div className="relative mt-3 h-[3px] rounded-full bg-divider-strong">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-accent"
          initial={{ width: reduceMotion ? '78%' : '0%' }}
          animate={{ width: '78%' }}
          transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
        />
        {[0, 26, 52].map(left => (
          <span key={left} className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-accent" style={{ left: `${left}%` }} />
        ))}
        <span className="absolute top-1/2 left-[78%] size-3.5 -translate-y-1/2 rounded-full border-[3px] border-accent bg-page" />
      </div>

      <div className="relative mt-10 h-24 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-x-0 bottom-3 border-t-2 border-dashed border-divider-strong" />
        <motion.svg
          viewBox="-70 -60 120 80"
          className="absolute bottom-1 h-20 w-28"
          initial={{ left: reduceMotion ? '55%' : '-20%' }}
          animate={reduceMotion ? { left: '55%' } : { left: ['-20%', '110%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
        >
          <g stroke="#e8e5df" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx={-40} cy={8} r={11} />
            <circle cx={30} cy={8} r={11} />
            <path d="M-40 8 H-6 L6 -20 H22 L30 8" />
            <path d="M6 -20 L16 -44 H28" />
          </g>
          <rect x={-62} y={-46} width={40} height={34} rx={4} fill="#a77bd6" />
          <g transform="translate(-2 -46) scale(.42)">
            <Potato />
          </g>
        </motion.svg>
      </div>
    </div>
  )
}
