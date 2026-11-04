import type { Metadata } from 'next'
import { BUILT_HERE_SLUGS } from '@/components/homelab/homelab-content'
import { HomelabRoom } from '@/components/homelab/homelab-room'
import { SiteNav } from '@/components/site/site-nav'
import { SiteFooter } from '@/components/site/social-links'
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
      <div className="w-full px-[var(--space-page-x)] pb-16 min-[1100px]:px-[72px]">
        <div className="min-[1100px]:max-w-[38rem] min-[1400px]:max-w-[44rem]">
          <SiteNav />
        </div>
        <HomelabRoom builtHere={builtHere} />
        <div className="min-[1100px]:max-w-[38rem] min-[1400px]:max-w-[44rem]">
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
