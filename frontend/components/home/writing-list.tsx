'use client'

import type { PostSummary, Topic } from '@/lib/post-summary'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { Link } from 'next-view-transitions'
import { TOPIC_COLOR } from '@/lib/post-summary'

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
}

const item = {
  hidden: { opacity: 0, y: 8, filter: 'blur(3px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] } },
} as const

interface WritingListProps {
  posts: PostSummary[]
  /** Called with the hovered or focused post's topic, and null when it leaves. */
  onActiveTopic?: (topic: Topic | null) => void
}

export function WritingList({ posts, onActiveTopic }: WritingListProps) {
  return (
    <section id="writing" aria-labelledby="writing-heading" className="scroll-mt-8">
      <h2 id="writing-heading" className="font-serif text-xl font-medium text-ink">Writing</h2>
      <motion.ul
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        className="group/list mt-3 list-none p-0"
      >
        {posts.map(post => (
          <motion.li key={post.slug} variants={item} className="border-t border-divider last:border-b">
            <Link
              href={`/thoughts/${post.slug}`}
              prefetch={false}
              onMouseEnter={() => onActiveTopic?.(post.topic)}
              onMouseLeave={() => onActiveTopic?.(null)}
              onFocus={() => onActiveTopic?.(post.topic)}
              onBlur={() => onActiveTopic?.(null)}
              className="group/row flex items-baseline gap-3 py-3 transition-opacity duration-200 group-hover/list:opacity-45 hover:!opacity-100 focus-visible:!opacity-100"
            >
              <span
                aria-hidden="true"
                className="size-2 shrink-0 translate-y-[-1px] rounded-full"
                style={{ background: TOPIC_COLOR[post.topic] }}
              />
              <span className="min-w-0 flex-1 font-serif text-[1.0625rem] leading-snug text-ink">
                <span className="bg-[linear-gradient(var(--color-accent),var(--color-accent))] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-soft group-hover/row:bg-[length:100%_1px] group-focus-visible/row:bg-[length:100%_1px]">
                  {post.title}
                </span>
              </span>
              <time dateTime={post.publishedAt} className="shrink-0 font-mono text-xs text-inkSubtle">
                {format(new Date(post.publishedAt), 'MMM yyyy')}
              </time>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
