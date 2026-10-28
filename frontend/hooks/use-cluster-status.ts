'use client'

import useSWR from 'swr'

// Mirrors backend/src/routes/cluster.ts
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
  argo: { apps: number, synced: number, healthy: number } | null
}

// eslint-disable-next-line node/prefer-global/process
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.rohitpotato.xyz'

async function fetchStatus(url: string): Promise<ClusterStatus> {
  const res = await fetch(url)
  if (!res.ok)
    throw new Error(`cluster status ${res.status}`)
  return res.json()
}

export function useClusterStatus() {
  const { data, error, isLoading } = useSWR(`${API_URL}/api/cluster`, fetchStatus, {
    refreshInterval: 30_000,
    keepPreviousData: true,
    shouldRetryOnError: false,
  })

  const ready = data?.nodes.filter(n => n.ready).length ?? 0
  const total = data?.nodes.length ?? 0

  return {
    status: data,
    error,
    isLoading,
    ready,
    total,
    healthy: total > 0 && ready === total && (!data?.argo || data.argo.synced === data.argo.apps),
  }
}
