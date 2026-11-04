// Static facts about the cluster that don't come from Prometheus.

export const STACK: [string, string][] = [
  ['nodes', '3 small VPS nodes, ~4 vCPU / 4 GB each'],
  ['distro', 'k3s, 1 server + 2 workers'],
  ['gitops', 'Argo CD, app of apps'],
  ['secrets', 'Vault + External Secrets'],
  ['ingress', 'Traefik on the workers'],
  ['metrics', 'kube-prometheus-stack'],
  ['deploys', 'Argo Rollouts canaries'],
]

export const BUILT_HERE_SLUGS = [
  'you-dont-need-vercel',
  'the-journey-of-a-packet',
  'no-more-oncall-jitters',
  'nginx-logs-to-prometheus-metrics',
  'to-mesh-or-not-to-mesh',
]

export const LAB_NOTEBOOK: { date: string, note: string }[] = [
  { date: '2026-10-07', note: 'CoreDNS now runs as two replicas on the workers, managed by Argo CD, so the master can go down without taking DNS with it.' },
  { date: '2026-10-06', note: 'Argo CD manages itself from git instead of a hand-applied install.' },
  { date: '2026-10-06', note: 'Removed Linkerd, MinIO and Umami to free memory. Analytics moved to GoatCounter.' },
]

export const REPO = 'rohitpotato/k8s-apps'
export const REPO_URL = `https://github.com/${REPO}`

type Quip = (ctx: { nodes: { name: string, pods: number, cpu: number | null, memory: number | null, uptimeSeconds: number | null }[], argo: { apps: number, synced: number } | null }) => string | null

const days = (s: number) => `${Math.floor(s / 86400)} days`

/** What the potato says when woken. Live ones return null when the data isn't there. */
export const POTATO_QUIPS: Quip[] = [
  ({ nodes }) => {
    const n = nodes.find(n => n.uptimeSeconds != null)
    return n ? `${n.name} has been up for ${days(n.uptimeSeconds!)} and is running ${n.pods} pods.` : null
  },
  ({ argo }) => argo ? `Argo CD says ${argo.synced} of ${argo.apps} apps are in sync. I say it's nap time.` : null,
  ({ nodes }) => {
    const busiest = [...nodes].filter(n => n.cpu != null).sort((a, b) => b.cpu! - a.cpu!)[0]
    return busiest ? `The busiest node right now is ${busiest.name}, at ${Math.round(busiest.cpu! * 100)}% CPU. Not me. I'm resting.` : null
  },
  ({ nodes }) => {
    const n = nodes.find(n => n.memory != null)
    return n ? `Memory on ${n.name} is at ${Math.round(n.memory! * 100)}%. About the same as my motivation.` : null
  },
  ({ nodes }) => nodes.length ? `${nodes.length} nodes, ${nodes.reduce((sum, n) => sum + n.pods, 0)} pods, 1 potato. The ratio is correct.` : null,
  () => 'I\'m not sleeping. I\'m waiting for a rollout to finish.',
  () => '$ kubectl get potato → STATUS: Running (barely)',
  () => 'Zero inbound ports. Zero visitors to my nap. Coincidence?',
  () => 'If a pod restarts and nobody\'s watching, did it really crash?',
  () => 'I asked for 64Mi of memory. They gave me a cushion.',
  () => 'Every change goes through Git. Even my naps are reviewed.',
  () => 'This page was served by nginx. I was not consulted.',
]
