'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useEffect, useRef } from 'react'

const GOATCOUNTER_URL = 'https://analytics.rohitpotato.xyz'

declare global {
  interface Window {
    goatcounter?: { count: (vars?: { path?: string }) => void }
  }
}

function GoatCounter() {
  const pathname = usePathname()
  const isFirstLoad = useRef(true)

  useEffect(() => {
    // count.js records the initial page load on its own. Unlike Umami it
    // doesn't hook history changes, so client-side navigations are counted here.
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }
    window.goatcounter?.count({ path: pathname })
  }, [pathname])

  return (
    <Script
      data-goatcounter={`${GOATCOUNTER_URL}/count`}
      src={`${GOATCOUNTER_URL}/count.js`}
      strategy="afterInteractive"
    />
  )
}

export default GoatCounter
