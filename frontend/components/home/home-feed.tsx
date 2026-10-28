'use client'

import type { ReactNode } from 'react'
import type { PostSummary, Topic } from '@/lib/post-summary'
import { useState } from 'react'
import { BengaluruWindow } from '@/components/bengaluru/bengaluru-window'
import { DeliveryReceipt } from './delivery-receipt'
import { WritingList } from './writing-list'

/**
 * leerob-style home: a left-aligned reading column, and on wide screens the
 * Bengaluru window pinned to the right edge. Hovering a post tints its sky.
 */
export function HomeFeed({ posts, intro }: { posts: PostSummary[], intro: ReactNode }) {
  const [topic, setTopic] = useState<Topic | null>(null)

  return (
    <div className="min-[1100px]:grid min-[1100px]:grid-cols-[minmax(0,38rem)_minmax(0,1fr)] min-[1100px]:gap-16 min-[1400px]:grid-cols-[minmax(0,44rem)_minmax(0,1fr)]">
      <div className="min-w-0">
        {intro}
        <div className="mt-14">
          <WritingList posts={posts} onActiveTopic={setTopic} />
        </div>
        <div className="mt-14 max-w-md">
          <DeliveryReceipt />
        </div>
      </div>
      <aside className="hidden min-[1100px]:sticky min-[1100px]:top-[52px] min-[1100px]:block min-[1100px]:h-[calc(100dvh-104px)] min-[1100px]:max-h-[760px]">
        <BengaluruWindow newest={posts[0]} topic={topic} fillHeight />
      </aside>
    </div>
  )
}
