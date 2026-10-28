'use client'

import { useState } from 'react'
import { useInterval, useIsClient } from 'usehooks-ts'

const timeFormat = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true })

/** Local time in Bengaluru as "6:12 pm", refreshed every minute; null before hydration. */
export function useBengaluruTime() {
  const isClient = useIsClient()
  const [now, setNow] = useState(() => new Date())
  useInterval(() => setNow(new Date()), 60_000)

  return { label: isClient ? timeFormat.format(now).toLowerCase() : null }
}
