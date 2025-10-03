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
}

export type IMetricsBatch = {
  id: string
  events: IMetricsEvent[]
}