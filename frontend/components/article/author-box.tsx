import Link from 'next/link'
import { FeaturedIn } from '@/components/site/featured-in'
import { SocialLinks } from '@/components/site/social-links'
import { SubscribeForm } from '@/components/site/subscribe-form'

export function AuthorBox() {
  return (
    <aside aria-label="About the author" className="mt-14 border-t border-divider pt-8">
      <p className="editorial-section-label">Written by</p>
      <p className="mt-3 max-w-[60ch] font-serif text-lg leading-relaxed text-inkBody">
        <Link href="/about" className="text-ink no-underline hover:text-accent">Rohit Kashyap</Link>
        . I manage web infra, productivity and performance at Zepto, and write about frontend performance, observability and the small k3s cluster this site runs on.
      </p>
      <FeaturedIn className="mt-3" />
      <SocialLinks className="mt-4" />
      <SubscribeForm className="mt-6" />
    </aside>
  )
}
