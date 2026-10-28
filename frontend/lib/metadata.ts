import type { Metadata } from 'next'
import type { Post } from './posts'
import { SITE } from './site'

export interface MetadataConfig {
  title: string
  description: string
  url: string
  imageUrl?: string
  publishedAt?: string
  author?: string
  keywords?: string[]
}

/**
 * Resolves the image URL for a blog post.
 *
 * Priority order:
 * 1. Custom image from frontmatter (if provided)
 * 2. The site's default social card (public/og.png)
 *
 * @example
 * // In your MDX frontmatter:
 * ---
 * title: "My Blog Post"
 * summary: "A great blog post"
 * image: "/images/my-custom-image.jpg"  // Relative path
 * image: "https://example.com/image.jpg" // Full URL
 * ---
 */
export function resolveImageUrl(post: Post): string {
  if (!post.image) {
    return SITE.ogImage
  }

  // If it's already a full URL, use it as is
  if (post.image.startsWith('http')) {
    return post.image
  }

  // If it's a relative path, prepend the domain
  return `${SITE.url}${post.image}`
}

/**
 * Determines the MIME type of an image based on its file extension
 */
export function getImageMimeType(imageUrl: string): string {
  if (imageUrl.includes('.webp'))
    return 'image/webp'
  if (imageUrl.includes('.png'))
    return 'image/png'
  if (imageUrl.includes('.jpg') || imageUrl.includes('.jpeg'))
    return 'image/jpeg'
  if (imageUrl.includes('.gif'))
    return 'image/gif'
  if (imageUrl.includes('.svg'))
    return 'image/svg+xml'
  // Default to PNG if no extension is found
  return 'image/png'
}

/**
 * `title` is the page's own title; the root layout's template adds " · rohitpotato".
 * Pass `absoluteTitle` when the page should not get the suffix (the home page).
 */
export function generateBaseMetadata(config: MetadataConfig & { absoluteTitle?: boolean }): Metadata {
  const {
    title,
    description,
    url,
    imageUrl = SITE.ogImage,
    publishedAt,
    author = SITE.author,
    keywords = [],
    absoluteTitle = false,
  } = config

  const images = [
    {
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: title,
      type: getImageMimeType(imageUrl),
    },
  ]

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywords.length ? keywords.join(', ') : undefined,
    authors: [{ name: author, url: SITE.url }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      images,
      locale: 'en_US',
      type: publishedAt ? 'article' : 'website',
      ...(publishedAt && {
        publishedTime: publishedAt,
        modifiedTime: publishedAt,
        authors: [author],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: SITE.handle,
      site: SITE.handle,
    },
  }
}

export function generateBlogPostMetadata(post: Post): Metadata {
  return generateBaseMetadata({
    title: post.title,
    description: post.summary,
    url: `${SITE.url}/thoughts/${post.slug}`,
    imageUrl: resolveImageUrl(post),
    publishedAt: post.publishedAt,
    keywords: [post.category.toLowerCase()],
  })
}

export function generateHomePageMetadata(): Metadata {
  return generateBaseMetadata({
    title: 'rohitpotato: web infra, productivity and performance',
    description: SITE.description,
    url: SITE.url,
    absoluteTitle: true,
  })
}

export function generateNotFoundMetadata(): Metadata {
  return {
    title: 'Post not found',
    description: 'The requested post could not be found.',
    robots: { index: false },
  }
}
