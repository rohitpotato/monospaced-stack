import type { IFetchClient } from './lib/fetch-wrapper'
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals'
import { FetchClient } from './lib/fetch-wrapper'
import generateUUID from './lib/generate-uuid'

interface IEvent {
  id: string
  timestamp: number
  name: string
  value: number
  delta?: number
  label?: string
  route?: string
  device?: string
  connection?: string
  userAgent?: string
}

interface IBatch {
  id: string
  events: IEvent[]
}

interface MonitorBoiOptions {
  batchInterval?: number
  batchSize?: number
  batchRetries?: number
  batchExponentialBackoff?: boolean
  endpoint: string
  onError?: (error: Error, batch: IBatch) => void
}

class MonitorBoi {
  private fetchClient: IFetchClient<any>
  private batchInterval: number = 5000
  private batchSize: number = 50
  private batchRetries: number = 3
  private batchExponentialBackoff: boolean = true
  private endpoint: string
  private batch: IBatch = {
    id: generateUUID(),
    events: [],
  }

  private intervalRef: number | null = null
  private isFlushing: boolean = false
  private isDestroyed: boolean = false
  private onError?: (error: Error, batch: IBatch) => void

  constructor(options: MonitorBoiOptions) {
    // Validate options
    if (!options.endpoint) {
      throw new Error('endpoint is required')
    }

    this.batchInterval = Math.max(options.batchInterval ?? 5000, 100)
    this.batchSize = Math.max(options.batchSize ?? 50, 1)
    this.batchRetries = Math.max(options.batchRetries ?? 3, 0)
    this.batchExponentialBackoff = options.batchExponentialBackoff ?? true
    this.endpoint = options.endpoint
    this.onError = options.onError

    this.fetchClient = new FetchClient({
      baseURL: this.endpoint,
      retries: this.batchRetries,
      exponentialDelay: this.batchExponentialBackoff,
    })

    this.setupFlushInterval()
    this.setupBeforeUnload()
    this.setupNavigationHandler()
  }

  private setupFlushInterval() {
    // Clear any existing interval
    if (this.intervalRef !== null) {
      clearInterval(this.intervalRef)
    }

    this.intervalRef = setInterval(() => {
      this.flush().catch((error) => {
        console.error('Failed to flush batch:', error)
      })
    }, this.batchInterval) as unknown as number
  }

  private setupNavigationHandler() {
    if (typeof window !== 'undefined') {
      // @ts-expect-error - navigation is not typed
      if (window.navigation) {
        // @ts-expect-error - navigate is not typed
        window.navigation.addEventListener('navigate', (event: any) => {
          event.preventDefault()
          this.sendWebVitals().catch((error) => {
            console.error('Failed to send web vitals', error)
          })
        })
      }
      else {
        window.addEventListener('popstate', () => {
          this.sendWebVitals().catch((error) => {
            console.error('Failed to send web vitals', error)
          })
        })

        window.addEventListener('pushstate', () => {
          this.sendWebVitals().catch((error) => {
            console.error('Failed to send web vitals', error)
          })
        })
      }
    }
  }

  private setupBeforeUnload() {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        // Use sendBeacon for guaranteed delivery on page unload
        if (this.batch.events.length > 0) {
          const blob = new Blob([JSON.stringify(this.batch)], {
            type: 'application/json',
          })
          navigator.sendBeacon(`${this.endpoint}/api/track`, blob)
        }
      })
    }
  }

  async triggerEvent(event: Omit<IEvent, 'id' | 'timestamp'>) {
    if (this.isDestroyed) {
      console.warn('MonitorBoi instance has been destroyed')
      return
    }

    this.batch.events.push({
      id: generateUUID(),
      timestamp: Date.now(),
      ...event,
      route: window.location.pathname,
      device: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
      connection: (navigator as any).connection?.effectiveType,
      userAgent: navigator.userAgent,
    })

    if (this.batch.events.length >= this.batchSize) {
      await this.flush()
    }
  }

  async flush() {
    // Prevent concurrent flushes
    if (this.isFlushing || this.isDestroyed) {
      return
    }

    if (this.batch.events.length === 0) {
      return
    }

    this.isFlushing = true

    // Capture current batch and reset immediately to prevent race conditions
    const batchToSend = this.batch
    this.batch = {
      id: generateUUID(),
      events: [],
    }

    try {
      await this.sendBatch(batchToSend)
    }
    catch (error) {
      console.error('Failed to send batch:', error)

      // Call error handler if provided
      if (this.onError) {
        this.onError(error as Error, batchToSend)
      }

      // Optionally: re-queue failed events
      // this.batch.events.unshift(...batchToSend.events)
    }
    finally {
      this.isFlushing = false
    }
  }

  private async sendBatch(batch: IBatch) {
    const result = await this.fetchClient.POST(
      '/api/track',
      JSON.stringify(batch),
      {
        'Content-Type': 'application/json',
      },
    )

    if (result.isFailure) {
      throw new Error(`Failed to send batch: ${result.error}`)
    }
  }

  async sendWebVitals() {
    // Track which metrics we've already logged to prevent duplicates
    const loggedMetrics = new Set<string>()

    onCLS((v) => {
      const key = `CLS-${v.id}`
      if (!loggedMetrics.has(key)) {
        loggedMetrics.add(key)
        this.triggerEvent({
          name: 'CLS',
          value: v.value,
          delta: v.delta,
          label: 'core-web-vital',
        })
      }
    })

    onFCP((v) => {
      const key = `FCP-${v.id}`
      if (!loggedMetrics.has(key)) {
        loggedMetrics.add(key)
        this.triggerEvent({
          name: 'FCP',
          value: v.value,
          delta: v.delta,
          label: 'core-web-vital',
        })
      }
    })

    onLCP((v) => {
      const key = `LCP-${v.id}`
      if (!loggedMetrics.has(key)) {
        loggedMetrics.add(key)
        this.triggerEvent({
          name: 'LCP',
          value: v.value,
          delta: v.delta,
          label: 'core-web-vital',
        })
      }
    })

    onTTFB((v) => {
      const key = `TTFB-${v.id}`
      if (!loggedMetrics.has(key)) {
        loggedMetrics.add(key)
        this.triggerEvent({
          name: 'TTFB',
          value: v.value,
          delta: v.delta,
          label: 'core-web-vital',
        })
      }
    })

    onINP((v) => {
      const key = `INP-${v.id}`
      if (!loggedMetrics.has(key)) {
        loggedMetrics.add(key)
        this.triggerEvent({
          name: 'INP',
          value: v.value,
          delta: v.delta,
          label: 'core-web-vital',
        })
      }
    })
  }

  async init() {
    await this.sendWebVitals()
  }

  async destroy() {
    this.isDestroyed = true

    // Clear interval
    if (this.intervalRef !== null) {
      clearInterval(this.intervalRef)
      this.intervalRef = null
    }

    // Flush remaining events
    await this.flush()
  }
}

export default MonitorBoi
