'use client'

import useSWR from 'swr'
import { useIsClient } from 'usehooks-ts'

interface Receipt {
  total?: number
  pod?: string
  node?: string
  cache?: string
  edgeMs?: number
}

// nginx adds `pod` and `node`; Cloudflare adds `cfCacheStatus` and `cfEdge`.
function readNavigation(): Receipt {
  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
  if (!nav)
    return {}
  const timing = Object.fromEntries(nav.serverTiming.map(t => [t.name, t]))
  return {
    total: nav.responseEnd > 0 ? Math.round(nav.responseEnd - nav.startTime) : undefined,
    pod: timing.pod?.description || undefined,
    node: timing.node?.description && timing.node.description !== 'unknown' ? timing.node.description : undefined,
    cache: timing.cfCacheStatus?.description || undefined,
    edgeMs: timing.cfEdge ? Math.round(timing.cfEdge.duration) : undefined,
  }
}

// Cloudflare answers /cdn-cgi/trace on every proxied host with the edge location.
async function fetchColo(url: string) {
  const text = await fetch(url).then(r => r.text())
  return /^colo=(.+)$/m.exec(text)?.[1]
}

function Row({ label, value, tone }: { label: string, value?: string, tone?: 'ok' }) {
  if (!value)
    return null
  return (
    <div className="flex items-baseline justify-between gap-4 py-1">
      <dt className="text-inkSubtle">{label}</dt>
      <dd className={tone === 'ok' ? 'text-ok' : 'text-ink'}>{value}</dd>
    </div>
  )
}

export function DeliveryReceipt() {
  const isClient = useIsClient()
  const onCloudflare = isClient && window.location.hostname.endsWith('rohitpotato.xyz')
  const { data: colo } = useSWR(onCloudflare ? '/cdn-cgi/trace' : null, fetchColo, { revalidateOnFocus: false })
  const receipt = isClient ? readNavigation() : {}

  const edge = colo ? `Cloudflare ${colo}${receipt.edgeMs != null ? ` · ${receipt.edgeMs} ms` : ''}` : undefined
  const packedBy = [receipt.node, receipt.pod].filter(Boolean).join(' · ') || undefined
  const nothingKnown = !edge && !packedBy && !receipt.cache

  return (
    <aside aria-label="Delivery receipt for this page" className="rounded-xl bg-surface p-5 font-mono text-xs">
      <p className="tracking-wide text-inkSubtle uppercase">Delivery receipt · this page</p>
      <dl className="mt-3">
        <Row label="picked up" value={edge} />
        <Row label="packed by" value={packedBy} />
        <Row label="cache" value={receipt.cache} tone={receipt.cache === 'HIT' ? 'ok' : undefined} />
        {nothingKnown && <Row label="route" value={isClient ? 'local, no edge in between' : '…'} />}
      </dl>
      <div className="mt-3 flex items-baseline justify-between border-t border-dashed border-divider-strong pt-3">
        <span className="font-serif text-lg text-ink">
          {receipt.total != null ? `Delivered in ${receipt.total} ms` : 'Delivered'}
        </span>
        {receipt.cache === 'HIT' && <span className="text-inkSubtle">packed earlier, served from cache</span>}
      </div>
    </aside>
  )
}
