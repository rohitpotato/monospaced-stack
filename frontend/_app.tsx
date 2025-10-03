'use client'

import { useEffect, useRef } from 'react'
import MonitorBoi from '@/monitor-boi'

function playClickSound() {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime)
    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime)

    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.1)
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  }
  catch (e) {
    console.error('Could not play sound:', e)
  }
}

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

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (target.closest('a, button')) {
        playClickSound()
      }
    }

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])
  return children
}

export default App
