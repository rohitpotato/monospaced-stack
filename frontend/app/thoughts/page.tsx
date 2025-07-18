import Link from "next/link";
import { getAllPosts } from "../lib/mdx";

export default async function ThoughtsPage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Thoughts</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b border-gray-200 pb-8">
            <Link href={`/thoughts/${post.slug}`} className="block group">
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600">
                {post.meta.title}
              </h2>
              <p className="text-gray-600 mb-2">
                {new Date(post.meta.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-gray-800">{post.meta.summary}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
