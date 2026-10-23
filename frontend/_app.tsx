'use client'

import { useEffect, useRef } from 'react'
import MonitorBoi from '@/monitor-boi'

// eslint-disable-next-line node/prefer-global/process
const metricsEndpoint = process.env.NEXT_PUBLIC_METRICS_ENDPOINT

// Metrics are optional: without an endpoint, skip the client entirely.
const monitorBoi = metricsEndpoint ? new MonitorBoi({ endpoint: metricsEndpoint }) : null

function App({ children }: { children: React.ReactNode }) {
  const isInitialized = useRef(false)
  useEffect(() => {
    async function init() {
      if (!monitorBoi || isInitialized.current) {
        return
      }
      await monitorBoi.init()
      // await monitorBoi.flush()
      isInitialized.current = true
    }
    init()
  }, [])

  return children
}

export default App
