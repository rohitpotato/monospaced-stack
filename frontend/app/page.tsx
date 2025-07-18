import React from "react";
import Ticker from "./components/ticker/ticker";
import ArticleCard from "./components/article-card/article-card";
import Footer from "./components/footer/footer";
import { getPostsFromCache } from "./lib/cache";
import { Article } from "./types";
import PageTitle from "./components/page-title/page-title";

export const revalidate = 3600; // Revalidate every hour

const Homepage: React.FC = async () => {
  const posts = await getPostsFromCache();

  const articles: Article[] = posts.map((post) => ({
    id: post.slug,
    title: post.meta.title,
    description: post.meta.summary,
    date: post.meta.publishedAt,
    link: `/thoughts/${post.slug}`,
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Ticker posts={posts} />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-8 md:py-12">
            <PageTitle title="Digital Backyard" />
          </div>

          <main>
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 border-t border-l"
              style={{ borderColor: "var(--color-border)" }}
            >
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;
