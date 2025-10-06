import type { IFetchClient } from './lib/fetch-wrapper'
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals'
import { FetchClient } from './lib/fetch-wrapper'
import generateUUID from './lib/generate-uuid'

interface IEvent {
  id: string
  timestamp: number
  name: string
  value: number // Always numeric for Prometheus compatibility
  delta?: number
  label?: 'core-web-vital' | 'error' | 'custom'
  route?: string
  device?: string
  connection?: string
  userAgent?: string
  // Error-specific fields
  errorMessage?: string
  errorStack?: string
  errorFile?: string
  errorLine?: number
  errorColumn?: number
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
  private isWebVitalsSetup: boolean = false

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
    this.setupErrorBoundary()
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

  // Navigation tracking removed - not needed for Core Web Vitals
  // Web Vitals measure the initial page load experience, not route changes

  private setupErrorBoundary() {
    if (typeof window !== 'undefined') {
      // Capture unhandled JavaScript errors
      window.addEventListener('error', (event) => {
        this.trackError({
          name: event.error?.name || 'Error',
          message: event.error?.message || event.message || 'Unknown error',
          stack: event.error?.stack || '',
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        })
      })

      // Capture unhandled promise rejections
      window.addEventListener('unhandledrejection', (event) => {
        this.trackError({
          name: 'UnhandledPromiseRejection',
          message: event.reason?.message || String(event.reason) || 'Unhandled promise rejection',
          stack: event.reason?.stack || '',
        })
      })
    }
  }

  private trackError(errorInfo: {
    name: string
    message: string
    stack?: string
    filename?: string
    lineno?: number
    colno?: number
  }) {
    // Use value = 1 for counting errors (Prometheus compatible)
    // Store actual error message in errorMessage field
    this.triggerEvent({
      name: errorInfo.name,
      value: 1, // Numeric: count this error occurrence
      label: 'error',
      // Include full error details for debugging
      route: window.location.pathname,
      device: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
      connection: (navigator as any).connection?.effectiveType,
      userAgent: navigator.userAgent,
      // Add complete error information
      errorMessage: errorInfo.message, // Actual error message here
      errorStack: errorInfo.stack,
      errorFile: errorInfo.filename,
      errorLine: errorInfo.lineno,
      errorColumn: errorInfo.colno,
    })
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

  private setupWebVitalsObservers() {
    // Prevent duplicate setup
    if (this.isWebVitalsSetup) {
      return
    }

    this.isWebVitalsSetup = true

    // Track which metrics we've already logged to prevent duplicates
    const loggedMetrics = new Set<string>()

    // Use web-vitals library for accurate measurements
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

  async sendWebVitals() {
    // Set up initial Web Vitals measurement
    this.setupWebVitalsObservers()
  }

  // Manual error tracking for React Error Boundaries or custom error handling
  trackCustomError(error: Error, _errorInfo?: { componentStack?: string }) {
    this.trackError({
      name: error.name,
      message: error.message,
      stack: error.stack,
    })
  }

  async init() {
    await this.sendWebVitals()
    this.trackAppLaunch()
  }

  private trackAppLaunch() {
    if (typeof window === 'undefined')
      return

    const sessionKey = 'monitor_boi_app_launched'

    // Check if app has already been launched in this session
    if (sessionStorage.getItem(sessionKey)) {
      return // Already launched in this session
    }

    // Mark as launched for this session
    sessionStorage.setItem(sessionKey, 'true')

    // Track the app launch event
    this.triggerEvent({
      name: 'app_launched',
      value: 1,
      label: 'custom',
    })
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
