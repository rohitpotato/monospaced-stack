import type { ReactNode } from 'react'
import type { PostSummary } from '@/lib/post-summary'
import { BengaluruWindow } from '@/components/bengaluru/bengaluru-window'
import { SiteFooter } from '@/components/site/social-links'
import { DeliveryReceipt } from './delivery-receipt'
import { WritingList } from './writing-list'

/**
 * leerob-style home: a left-aligned reading column, and on wide screens the
 * Bengaluru poster fixed to the right of it, so it stays put the whole way down.
 */
export function HomeFeed({ posts, intro }: { posts: PostSummary[], intro: ReactNode }) {
  return (
    <>
      <div className="min-w-0 min-[1100px]:max-w-[38rem] min-[1400px]:max-w-[44rem]">
        {intro}
        <div className="mt-14">
          <WritingList posts={posts} />
        </div>
        <div className="mt-14 max-w-md">
          <DeliveryReceipt />
        </div>
        <SiteFooter />
      </div>
      {/* Left edge = page padding (72px) + reading column + 4rem gap. */}
      <aside className="hidden min-[1100px]:fixed min-[1100px]:top-[52px] min-[1100px]:right-[72px] min-[1100px]:bottom-[52px] min-[1100px]:left-[calc(72px+42rem)] min-[1100px]:block min-[1400px]:left-[calc(72px+48rem)]">
        <BengaluruWindow fillHeight />
      </aside>
    </>
  )
}
