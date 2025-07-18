import { getPost } from "../../lib/mdx";
import { notFound } from "next/navigation";
import BlogHeader from "../../components/BlogHeader";
import BlogSidebar from "../../components/blog-sidebar";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: PageProps) {
  try {
    const { meta, content } = await getPost(params.slug);

    return (
      <div className="relative min-h-screen">
        <BlogSidebar />
        <div className="lg:pl-64 min-h-screen">
          <article className="max-w-4xl mx-auto">
            <div className="px-4 sm:px-6 lg:px-12">
              <div className="py-12">
                <BlogHeader title={meta.title} publishedAt={meta.publishedAt} />
              </div>
              <div className="mt-8">
                <div
                  className="prose prose-base sm:prose-lg lg:prose-xl dark:prose-invert max-w-none"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {content}
                </div>
              </div>
            </div>
          </article>
          <div className="h-24" /> {/* Bottom spacing */}
        </div>
      </div>
    );
  } catch (e) {
    console.error(e);
    notFound();
  }
}
