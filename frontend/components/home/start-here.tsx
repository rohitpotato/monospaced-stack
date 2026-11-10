import type { PostSummary } from '@/lib/post-summary'
import { Link } from 'next-view-transitions'
import { TOPIC_COLOR } from '@/lib/post-summary'

/** The few posts worth reading first, picked with `featured: true` in frontmatter. */
export function StartHere({ posts }: { posts: PostSummary[] }) {
  const featured = posts.filter(post => post.featured)
  if (!featured.length)
    return null

  return (
    <section aria-labelledby="start-here-heading">
      <h2 id="start-here-heading" className="font-serif text-xl font-medium text-ink">Start here</h2>
      <ul className="mt-3 list-none space-y-2 p-0">
        {featured.map(post => (
          <li key={post.slug}>
            <Link
              href={`/thoughts/${post.slug}`}
              prefetch={false}
              className="group block rounded-lg border border-divider px-4 py-3.5 transition-colors hover:border-accent hover:bg-[var(--color-wash-hover)]"
            >
              <span className="flex items-baseline gap-3">
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0 translate-y-[-1px] rounded-full"
                  style={{ background: TOPIC_COLOR[post.topic] }}
                />
                <span className="font-serif text-[1.0625rem] leading-snug text-ink transition-colors group-hover:text-accent">
                  {post.title}
                </span>
              </span>
              <span className="mt-1.5 block pl-5 font-sans text-sm leading-relaxed text-inkSubtle">
                {post.summary}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
