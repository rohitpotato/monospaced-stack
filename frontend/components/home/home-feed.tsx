'use client'

import type { PostSummary, Topic } from '@/lib/post-summary'
import { useState } from 'react'
import { BengaluruWindow } from '@/components/bengaluru/bengaluru-window'
import { DeliveryReceipt } from './delivery-receipt'
import { WritingList } from './writing-list'

/** Post list and the Bengaluru window; hovering a post tints the window's sky. */
export function HomeFeed({ posts }: { posts: PostSummary[] }) {
  const [topic, setTopic] = useState<Topic | null>(null)

  return (
    <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:gap-12 lg:gap-16">
      <div className="order-2 md:order-none">
        <WritingList posts={posts} onActiveTopic={setTopic} />
        <div className="mt-10 max-w-md">
          <DeliveryReceipt />
        </div>
      </div>
      <div className="order-1 md:sticky md:top-8 md:order-none md:self-start">
        <BengaluruWindow newest={posts[0]} topic={topic} />
      </div>
    </div>
  )
}
