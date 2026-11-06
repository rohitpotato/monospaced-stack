'use client'

import { useEffect, useRef } from 'react'
import { figures, HL } from './hairline/figures.generated'

export type FigureName = keyof typeof figures

/** Intensity 0..1 to the figure's own number: two straight lines that meet at 0.5, as in the package. */
function valueAt([lo, mid, hi]: [number, number, number], i: number) {
  return i <= 0.5 ? lo + (i / 0.5) * (mid - lo) : mid + ((i - 0.5) / 0.5) * (hi - mid)
}

/**
 * One Hairline figure, mounted the way the package's bench mounts it. `data`
 * lands on the stage as data-* attributes, which the figure reads at mount;
 * changing it remounts the figure. `play` walks the figure's tour until a real
 * pointer arrives, for screens that can't hover.
 */
export function HairlineFigure({ name, data, play = false, intensity = 0.5, onRead, className }: {
  name: FigureName
  data?: Record<string, string>
  play?: boolean
  intensity?: number
  onRead?: (text: string) => void
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const readRef = useRef(onRead)
  readRef.current = onRead
  const dataKey = JSON.stringify(data ?? {})

  useEffect(() => {
    const stage = ref.current
    if (!stage)
      return
    const spec = figures[name]
    HL.inject(document)
    stage.setAttribute('data-hairline', name)
    for (const [k, v] of Object.entries(JSON.parse(dataKey) as Record<string, string>))
      stage.dataset[k] = v
    const svg = HL.mk('svg', { 'viewBox': '0 0 400 320', 'aria-hidden': 'true' }, stage)

    let text: string | null = null
    const read = {
      get textContent() { return text },
      set textContent(value: string | null) {
        text = value == null ? '' : String(value)
        readRef.current?.(text)
      },
    }
    const handle = spec.mount({ stage, svg, read }, valueAt(spec.range, intensity))
    if (text === null)
      read.textContent = 'rest'
    const tour = play ? HL.tour(stage, spec.tour ?? HL.LAP) : null

    return () => {
      tour?.stop()
      handle.destroy()
      svg.remove()
    }
  }, [name, dataKey, play, intensity])

  // A span, so the figure can sit inside a button; the kernel makes it a 5:4 block.
  return <span ref={ref} aria-hidden="true" className={className} />
}
