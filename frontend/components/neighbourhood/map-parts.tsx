import type { IsoOrigin } from '@/lib/iso'
import { iso } from '@/lib/iso'

interface MapLabelProps {
  x: number
  y: number
  title: string
  subtitle: string
  dot?: string
  width: number
}

/** Pill label with a pointer, drawn in scene coordinates. Hidden on small screens. */
export function MapLabel({ x, y, title, subtitle, dot, width }: MapLabelProps) {
  const left = x - width / 2
  const textX = left + 14 + (dot ? 14 : 0)
  return (
    <g className="pointer-events-none max-sm:hidden" aria-hidden="true">
      <rect x={left} y={y} width={width} height={48} rx={10} fill="var(--color-tooltip-bg)" stroke="var(--color-divider-strong)" />
      <path d={`M${x - 7} ${y + 48} L${x} ${y + 56} L${x + 7} ${y + 48}Z`} fill="var(--color-tooltip-bg)" />
      {dot && <circle cx={left + 18} cy={y + 19} r={4} fill={dot} />}
      <text x={textX} y={y + 24} className="font-serif" fontSize={16} fill="var(--color-ink)">{title}</text>
      <text x={left + 14} y={y + 40} className="font-mono" fontSize={10.5} fill="var(--color-ink-subtle)">{subtitle}</text>
    </g>
  )
}

export function Tree({ origin, u, v, r = 12, h = 22, color = '#5f8f4e' }: { origin: IsoOrigin, u: number, v: number, r?: number, h?: number, color?: string }) {
  const [x, y] = iso(origin, u, v)
  return (
    <g aria-hidden="true">
      <rect x={x - 2} y={y - h * 0.55} width={4} height={h * 0.55} fill="#6e533d" />
      <circle cx={x} cy={y - h} r={r} fill={color} />
      <circle cx={x - r * 0.35} cy={y - h - r * 0.35} r={r * 0.45} fill="#7fb86a" opacity={0.6} />
    </g>
  )
}

export function Lamp({ origin, u, v, lit }: { origin: IsoOrigin, u: number, v: number, lit: boolean }) {
  const [x, y] = iso(origin, u, v)
  return (
    <g aria-hidden="true">
      <line x1={x} y1={y} x2={x} y2={y - 34} stroke="#4a4540" strokeWidth={2.5} />
      <circle cx={x} cy={y - 36} r={lit ? 12 : 8} fill="#f2d36b" opacity={lit ? 0.22 : 0.1} />
      <circle cx={x} cy={y - 36} r={3.2} fill={lit ? '#f6dc8a' : '#a39a7a'} />
    </g>
  )
}

/** Small cardboard parcel. */
export function Parcel({ origin, u, v, s, z = 0 }: { origin: IsoOrigin, u: number, v: number, s: number, z?: number }) {
  const p = (a: number, b: number, c: number) => iso(origin, a, b, c).join(',')
  const h = s * 0.75
  return (
    <g aria-hidden="true">
      <polygon points={`${p(u + s, v, z)} ${p(u + s, v + s, z)} ${p(u + s, v + s, z + h)} ${p(u + s, v, z + h)}`} fill="#b9975e" />
      <polygon points={`${p(u, v + s, z)} ${p(u + s, v + s, z)} ${p(u + s, v + s, z + h)} ${p(u, v + s, z + h)}`} fill="#cfae74" />
      <polygon points={`${p(u, v, z + h)} ${p(u + s, v, z + h)} ${p(u + s, v + s, z + h)} ${p(u, v + s, z + h)}`} fill="#e3c48e" />
    </g>
  )
}

/** The site's potato, used as the scooter rider and on the 404 page. */
export function Potato({ hat = '#a77bd6', asleep = false }: { hat?: string, asleep?: boolean }) {
  return (
    <g>
      <path d="M0 -46 C 34 -48 48 -20 44 10 C 40 40 16 50 -6 48 C -32 46 -46 24 -44 -2 C -42 -28 -26 -45 0 -46Z" fill="#c4935e" />
      <g fill="#9c7046">
        <circle cx={-24} cy={-22} r={2.4} />
        <circle cx={26} cy={22} r={3} />
      </g>
      <g fill="#e38b7a" opacity={0.55}>
        <ellipse cx={-20} cy={10} rx={6} ry={3.5} />
        <ellipse cx={20} cy={10} rx={6} ry={3.5} />
      </g>
      {asleep
        ? <path d="M-17 -4 q5 4 10 0 M7 -4 q5 4 10 0" stroke="#221f1c" strokeWidth={2.4} fill="none" strokeLinecap="round" />
        : (
            <g fill="#221f1c">
              <ellipse cx={-12} cy={-6} rx={4} ry={5} />
              <ellipse cx={12} cy={-6} rx={4} ry={5} />
            </g>
          )}
      {hat && <path d="M-30 -36 Q0 -76 30 -36Z" fill={hat} />}
    </g>
  )
}
