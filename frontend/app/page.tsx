import React from "react";
import Ticker from "./components/ticker/ticker";
import ArticleCard from "./components/article-card/article-card";
import Footer from "./components/footer/footer";
import { getPostsFromCache } from "./lib/cache";
import { Article } from "./types";
import PageTitle from "./components/page-title/page-title";
import MasonryGrid from "./components/masonry-grid/masonry-grid";

export const revalidate = 3600;

const Homepage: React.FC = async () => {
  const posts = await getPostsFromCache();

  const articles: Article[] = posts.map((post) => ({
    id: post.slug,
    title: post.meta.title,
    description: post.meta.summary,
    date: post.meta.publishedAt,
    link: `/thoughts/${post.slug}`,
    icon: post.meta.icon || "Document",
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
            <MasonryGrid>
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </MasonryGrid>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;
