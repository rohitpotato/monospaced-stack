import type { Metadata } from 'next'
import { BUILT_HERE_SLUGS } from '@/components/homelab/homelab-content'
import { HomelabRoom } from '@/components/homelab/homelab-room'
import { SiteNav } from '@/components/site/site-nav'
import { toPostSummary } from '@/lib/post-summary'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Homelab',
  description: 'The small k3s cluster behind rohitpotato.xyz, with live node status.',
  alternates: { canonical: '/homelab' },
}

export default async function HomelabPage() {
  const posts = (await getAllPosts()).map(toPostSummary)
  const builtHere = BUILT_HERE_SLUGS
    .map(slug => posts.find(p => p.slug === slug))
    .filter(p => p !== undefined)

  return (
    <div className="min-h-[100dvh] bg-page text-inkBody">
      <div className="mx-auto w-full max-w-[var(--layout-wide-max)] px-[var(--space-page-x)] pb-16">
        <SiteNav />
        <HomelabRoom builtHere={builtHere} />
      </div>
    </div>
  )
}
