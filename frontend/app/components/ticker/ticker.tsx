import { Frontmatter } from "../../lib/mdx";
import styles from "./ticker.module.css";

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
          className={styles.tickerItem}
        >
          {post.meta.title.toUpperCase()}
        </a>
      ))}
    </div>
  );

  return (
    <div className="border-y" style={{ borderColor: "var(--color-border)" }}>
      <div
        className={`w-full ${styles.tickerContainer} font-mono tracking-widest text-xs sm:text-sm py-2 overflow-hidden relative`}
        style={{
          backgroundColor: "var(--color-background)",
        }}
      >
        <div className={styles.tickerWrapper}>
          {tickerContent}
          {tickerContent}
          {tickerContent}
        </div>
      </div>
    </div>
  );
};

export default Ticker;
