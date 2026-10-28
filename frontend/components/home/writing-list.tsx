'use client'

import type { PostSummary } from '@/lib/post-summary'
import { format } from 'date-fns'
import { Link } from 'next-view-transitions'
import { TOPIC_COLOR } from '@/lib/post-summary'

// Staggered entrance in CSS (tw-animate-css), so the list is never hidden waiting for JavaScript.
const ENTER = 'animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500 ease-soft motion-reduce:animate-none'
const STAGGER_MS = 45

export function WritingList({ posts }: { posts: PostSummary[] }) {
  return (
    <section id="writing" aria-labelledby="writing-heading" className="scroll-mt-8">
      <h2 id="writing-heading" className="font-serif text-xl font-medium text-ink">Writing</h2>
      <ul className="group/list mt-3 list-none p-0">
        {posts.map((post, i) => (
          <li key={post.slug} className={`border-t border-divider last:border-b ${ENTER}`} style={{ animationDelay: `${i * STAGGER_MS}ms` }}>
            <Link
              href={`/thoughts/${post.slug}`}
              prefetch={false}
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
          </li>
        ))}
      </ul>
    </section>
  )
}
