import { getPost, Frontmatter } from "../../lib/mdx";
import { notFound } from "next/navigation";
import BlogHeader from "../../components/blog-header/blog-header";
import BlogSidebar from "../../components/blog-sidebar/blog-sidebar";
import { Metadata, ResolvingMetadata } from "next";
import Script from "next/script";

type ThoughtPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Function to generate JSON-LD structured data
function generateStructuredData(meta: Frontmatter, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.description || meta.excerpt || meta.summary,
    author: {
      "@type": "Person",
      name: "Rohit Kashyap",
      url: "https://rohitpotato.xyz",
    },
    datePublished: meta.publishedAt,
    dateModified: meta.updatedAt || meta.publishedAt,
    image:
      meta.coverImage ||
      meta.image ||
      "https://rohitpotato.xyz/favicon/web-app-manifest-512x512.png",
    url: `https://rohitpotato.xyz/thoughts/${slug}`,
    keywords: meta.tags?.join(", ") || "",
    publisher: {
      "@type": "Organization",
      name: "Digital Backyard",
      logo: {
        "@type": "ImageObject",
        url: "https://rohitpotato.xyz/favicon/web-app-manifest-512x512.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://rohitpotato.xyz/thoughts/${slug}`,
    },
    articleBody: meta.summary,
  };
}

export default async function BlogPost({ params }: ThoughtPageProps) {
  try {
    const { slug } = await params;
    const { meta, content } = await getPost(slug);
    const structuredData = generateStructuredData(meta, slug);

    return (
      <div className="relative min-h-screen">
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
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

// Generate dynamic metadata for each blog post
export async function generateMetadata(
  { params }: ThoughtPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const { slug } = await params;
    const { meta } = await getPost(slug);

    // Get the parent metadata (from root layout.tsx)
    const previousImages = (await parent).openGraph?.images || [];

    // Create description from available fields
    const description = meta.description || meta.excerpt || meta.summary;
    const ogImage =
      meta.coverImage || meta.image || "/favicon/web-app-manifest-512x512.png";

    return {
      title: meta.title,
      description,
      authors: [{ name: "Rohit Kashyap" }],
      keywords: meta.tags || [],
      openGraph: {
        title: meta.title,
        description,
        type: "article",
        publishedTime: meta.publishedAt,
        authors: ["Rohit Kashyap"],
        tags: meta.tags,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: meta.title,
          },
          ...previousImages,
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: meta.title,
        description,
        images: [ogImage],
      },
      alternates: {
        canonical: `https://rohitpotato.xyz/thoughts/${slug}`,
      },
    };
  } catch (e) {
    console.error("Error generating metadata:", e);
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }
}
