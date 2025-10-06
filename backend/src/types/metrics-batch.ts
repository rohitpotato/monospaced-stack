export type IMetricsEvent = {
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
  errorMessage?: string
  errorStack?: string
  errorFile?: string
  errorLine?: number
  errorColumn?: number
}

export type IMetricsBatch = {
  id: string
  events: IMetricsEvent[]
}