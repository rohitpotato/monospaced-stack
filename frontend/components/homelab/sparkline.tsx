'use client'

import { curveMonotoneX } from '@visx/curve'
import { ParentSize } from '@visx/responsive'
import { scaleLinear } from '@visx/scale'
import { AreaClosed, LinePath } from '@visx/shape'

interface SparklineProps {
  points: [number, number][]
  color: string
  height?: number
  label: string
}

/** 0–1 series over time, e.g. memory use for the last 24 hours. */
export function Sparkline({ points, color, height = 56, label }: SparklineProps) {
  if (points.length < 2)
    return <p className="font-mono text-xs text-inkSubtle">No history yet.</p>

  return (
    <div style={{ height }} role="img" aria-label={label}>
      <ParentSize debounceTime={50}>
        {({ width }) => {
          if (!width)
            return null
          const x = scaleLinear({ domain: [points[0][0], points.at(-1)![0]], range: [0, width] })
          const y = scaleLinear({ domain: [0, 1], range: [height - 2, 2] })
          return (
            <svg width={width} height={height}>
              <AreaClosed data={points} x={d => x(d[0])} y={d => y(d[1])} yScale={y} curve={curveMonotoneX} fill={color} fillOpacity={0.12} />
              <LinePath data={points} x={d => x(d[0])} y={d => y(d[1])} curve={curveMonotoneX} stroke={color} strokeWidth={1.75} />
            </svg>
          )
        }}
      </ParentSize>
    </div>
  )
}
