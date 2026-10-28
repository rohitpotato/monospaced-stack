'use client'

import { useState } from 'react'
import { useInterval, useIsClient } from 'usehooks-ts'

export type SkyPhase = 'dawn' | 'day' | 'sunset' | 'night'

const timeFormat = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true })
const partsFormat = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false })

function read(now: Date) {
  const [h, m] = partsFormat.format(now).split(':').map(Number)
  return { hour: h + m / 60, label: timeFormat.format(now).toLowerCase() }
}

export function phaseFor(hour: number): SkyPhase {
  if (hour >= 5 && hour < 7)
    return 'dawn'
  if (hour >= 7 && hour < 17)
    return 'day'
  if (hour >= 17 && hour < 19.5)
    return 'sunset'
  return 'night'
}

const PHASES: SkyPhase[] = ['dawn', 'day', 'sunset', 'night']

/**
 * Local time in Bengaluru, refreshed every minute. Before hydration it reports sunset.
 * `?sky=dawn|day|sunset|night` previews a phase regardless of the time.
 */
export function useBengaluruTime() {
  const isClient = useIsClient()
  const [now, setNow] = useState(() => new Date())
  useInterval(() => setNow(new Date()), 60_000)

  if (!isClient)
    return { phase: 'sunset' as SkyPhase, label: null }
  const { hour, label } = read(now)
  const preview = new URLSearchParams(window.location.search).get('sky') as SkyPhase | null
  return { phase: preview && PHASES.includes(preview) ? preview : phaseFor(hour), label }
}
