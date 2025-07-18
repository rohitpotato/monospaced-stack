"use client";
import { Frontmatter } from "../lib/mdx";

interface TickerProps {
  posts: Array<{
    meta: Frontmatter;
    slug: string;
  }>;
}

const Ticker: React.FC<TickerProps> = ({ posts }) => {
  const tickerContent = (
    <div className="flex-shrink-0 flex items-center">
      {posts.map((post) => (
        <a
          href={`/thoughts/${post.slug}`}
          key={post.slug}
          className="ticker-item"
        >
          {post.meta.title.toUpperCase()}
        </a>
      ))}
    </div>
  );

  return (
    <div className="border-y" style={{ borderColor: "var(--color-border)" }}>
      <div
        className="w-full ticker-container font-mono tracking-widest text-xs sm:text-sm py-2 overflow-hidden relative"
        style={{
          backgroundColor: "var(--color-background)",
        }}
      >
        <div className="ticker-wrapper flex">{tickerContent}</div>
        <style jsx>{`
          .ticker-wrapper {
            display: flex;
            animation: marquee 15s linear infinite;
          }

          @keyframes marquee {
            from {
              transform: translateX(0%);
            }
            to {
              transform: translateX(-50%);
            }
          }

          .ticker-container:hover .ticker-wrapper {
            animation-play-state: paused;
          }

          .ticker-item {
            padding: 0 0.75rem;
            color: var(--color-text-secondary);
            transition: all 0.3s ease;
            white-space: nowrap;
          }

          @media (min-width: 640px) {
            .ticker-item {
              padding: 0 1.5rem;
            }
          }

          .ticker-item:hover {
            color: var(--color-primary-accent-light);
            text-shadow: 0 0 8px var(--color-primary-glow);
            transform: scale(1.1);
          }
        `}</style>
      </div>
    </div>
  );
};

export default Ticker;
