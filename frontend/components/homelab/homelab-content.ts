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

export const REPO_URL = 'https://github.com/rohitpotato/k8s-apps'
