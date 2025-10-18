'use client'

import { useEffect, useRef } from 'react'
import MonitorBoi from '@/monitor-boi'

const monitorBoi = new MonitorBoi({
  // eslint-disable-next-line node/prefer-global/process
  endpoint: process.env.NEXT_PUBLIC_METRICS_ENDPOINT || '',

})

function App({ children }: { children: React.ReactNode }) {
  const isInitialized = useRef(false)
  useEffect(() => {
    async function init() {
      if (isInitialized.current) {
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
