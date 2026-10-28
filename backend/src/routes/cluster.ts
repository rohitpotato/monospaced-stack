import { TTLCache } from '@isaacs/ttlcache'
import { FastifyInstance } from 'fastify'

// Public, read-only summary of the homelab for the site's /homelab page.
// Only node names and aggregate numbers leave the cluster: no IPs, no pod names.

const PROMETHEUS_URL =
  process.env.PROMETHEUS_URL || 'http://prometheus-operated.monitoring.svc:9090'
const CACHE_TTL_MS = 30_000

// node-exporter series carry `instance`; node_uname_info maps it to the node name.
const byNodename = (expr: string) =>
  `(${expr}) * on(instance) group_left(nodename) node_uname_info`

const QUERIES = {
  ready: 'kube_node_status_condition{condition="Ready",status="true"}',
  controlPlane: 'kube_node_role{role=~"control-plane|master"}',
  pods: 'count by (node) (kube_pod_info{node!=""} and on (namespace, pod) (kube_pod_status_phase{phase="Running"} == 1))',
  cpu: byNodename('1 - avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m]))'),
  memory: byNodename('1 - node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes'),
  uptime: byNodename('time() - node_boot_time_seconds'),
  argo: 'count by (sync_status, health_status) (argocd_app_info)'
}

interface PromSample {
  metric: Record<string, string>
  value?: [number, string]
  values?: [number, string][]
}

export interface ClusterNode {
  name: string
  role: 'control-plane' | 'worker'
  ready: boolean
  pods: number
  cpu: number
  memory: number
  uptimeSeconds: number
  memoryHistory: [number, number][]
}

export interface ClusterStatus {
  generatedAt: string
  stale: boolean
  nodes: ClusterNode[]
  argo: { apps: number; synced: number; healthy: number } | null
}

async function prom(path: string, params: Record<string, string>) {
  const url = `${PROMETHEUS_URL}/api/v1/${path}?${new URLSearchParams(params)}`
  const res = await fetch(url, { signal: AbortSignal.timeout(5_000) })
  if (!res.ok) throw new Error(`Prometheus ${res.status} for ${path}`)
  const body = (await res.json()) as { data: { result: PromSample[] } }
  return body.data.result
}

const instant = (query: string) => prom('query', { query })

// A missing optional metric (e.g. Argo CD not scraped) shouldn't fail the page.
const optional = (query: string) => instant(query).catch(() => [] as PromSample[])

function toMap(samples: PromSample[], label: string) {
  const map = new Map<string, number>()
  for (const s of samples) {
    if (s.value) map.set(s.metric[label], Number(s.value[1]))
  }
  return map
}

async function collect(): Promise<ClusterStatus> {
  const now = Math.floor(Date.now() / 1000)
  const [ready, controlPlane, pods, cpu, memory, uptime, argo, history] =
    await Promise.all([
      instant(QUERIES.ready),
      optional(QUERIES.controlPlane),
      instant(QUERIES.pods),
      instant(QUERIES.cpu),
      instant(QUERIES.memory),
      instant(QUERIES.uptime),
      optional(QUERIES.argo),
      prom('query_range', {
        query: QUERIES.memory,
        start: String(now - 24 * 3600),
        end: String(now),
        step: '1800'
      })
    ])

  const readyMap = toMap(ready, 'node')
  const controlPlaneSet = new Set(controlPlane.map((s) => s.metric.node))
  const podsMap = toMap(pods, 'node')
  const cpuMap = toMap(cpu, 'nodename')
  const memoryMap = toMap(memory, 'nodename')
  const uptimeMap = toMap(uptime, 'nodename')
  const historyMap = new Map(
    history.map((s) => [
      s.metric.nodename,
      (s.values ?? []).map(([t, v]) => [t, Number(v)] as [number, number])
    ])
  )

  const nodes: ClusterNode[] = [...readyMap.keys()].sort().map((name) => ({
    name,
    role: controlPlaneSet.has(name) ? 'control-plane' : 'worker',
    ready: readyMap.get(name) === 1,
    pods: podsMap.get(name) ?? 0,
    cpu: cpuMap.get(name) ?? 0,
    memory: memoryMap.get(name) ?? 0,
    uptimeSeconds: Math.round(uptimeMap.get(name) ?? 0),
    memoryHistory: historyMap.get(name) ?? []
  }))

  const argoTotals = argo.length
    ? argo.reduce(
        (acc, s) => {
          const n = Number(s.value?.[1] ?? 0)
          acc.apps += n
          if (s.metric.sync_status === 'Synced') acc.synced += n
          if (s.metric.health_status === 'Healthy') acc.healthy += n
          return acc
        },
        { apps: 0, synced: 0, healthy: 0 }
      )
    : null

  return {
    generatedAt: new Date().toISOString(),
    stale: false,
    nodes,
    argo: argoTotals
  }
}

export default function clusterRouter(fastify: FastifyInstance) {
  const cache = new TTLCache<'status', ClusterStatus>({ ttl: CACHE_TTL_MS })
  let lastGood: ClusterStatus | null = null

  fastify.get('/cluster', async (_req, reply) => {
    let status = cache.get('status')
    if (!status) {
      try {
        status = await collect()
        cache.set('status', status)
        lastGood = status
      } catch (error) {
        fastify.log.error(error, 'cluster status collection failed')
        if (!lastGood) {
          return reply.status(503).send({ error: 'Cluster status unavailable' })
        }
        status = { ...lastGood, stale: true }
      }
    }
    reply.header('Cache-Control', 'public, max-age=30')
    return status
  })
}
