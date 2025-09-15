import type { Metadata } from 'next'
import type { Post } from './posts'

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
 * 2. Generated OG image using title and description
 *
 * @param post - The blog post object
 * @returns The resolved image URL
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
    return `https://rohitpotato.xyz/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.summary)}`
  }

  // If it's already a full URL, use it as is
  if (post.image.startsWith('http')) {
    return post.image
  }

  // If it's a relative path, prepend the domain
  return `https://rohitpotato.xyz${post.image}`
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

export function generateBaseMetadata(config: MetadataConfig): Metadata {
  const {
    title,
    description,
    url,
    imageUrl,
    publishedAt,
    author = 'Rohit',
    keywords = [],
  } = config

  const defaultKeywords = [
    'web development',
    'infrastructure',
    'technology',
    'programming',
    'software engineering',
    'blog',
    'tech insights',
    'full stack development',
    'devops',
    'cloud computing',
    ...keywords,
  ]

  return {
    title: title.length < 30 ? title : description,
    description,
    keywords: defaultKeywords.join(', '),
    authors: [{ name: author }],
    creator: author,
    publisher: 'Digital Backyard',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://rohitpotato.xyz'),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title.replace(' | Digital Backyard', ''),
      description,
      url,
      siteName: 'Digital Backyard',
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: title,
              type: getImageMimeType(imageUrl),
            },
          ]
        : undefined,
      locale: 'en_US',
      type: publishedAt ? 'article' : 'website',
      ...(publishedAt && {
        publishedTime: publishedAt,
        modifiedTime: publishedAt,
        authors: [author],
        tags: ['web development', 'infrastructure', 'technology'],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: title.replace(' | Digital Backyard', ''),
      description,
      images: imageUrl ? [imageUrl] : undefined,
      creator: '@rohitpotato',
      site: '@rohitpotato',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        'index': true,
        'follow': true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
    },
    other: {
      ...(publishedAt && {
        'article:published_time': publishedAt,
        'article:modified_time': publishedAt,
        'article:author': author,
        'article:section': 'Technology',
        'article:tag': 'web development, infrastructure, technology',
      }),
    },
  }
}

export function generateBlogPostMetadata(post: Post): Metadata {
  const url = `https://rohitpotato.xyz/thoughts/${post.slug}`
  const imageUrl = resolveImageUrl(post)
  const keywords = post.title.toLowerCase().split(' ').slice(0, 5)

  return generateBaseMetadata({
    title: `${post.title} | Digital Backyard`,
    description: post.summary,
    url,
    imageUrl,
    publishedAt: post.publishedAt,
    keywords,
  })
}

export function generateHomePageMetadata(): Metadata {
  const url = 'https://rohitpotato.xyz'
  const imageUrl = 'https://rohitpotato.xyz/api/og?title=Digital%20Backyard&description=Notes%20about%20web%20dev%2C%20infrastructure%2C%20and%20some%20other%20stuff.'

  return generateBaseMetadata({
    title: 'Digital Backyard | Web Development & Infrastructure Blog',
    description: 'Notes about web development, infrastructure, and technology insights. Explore articles on programming, software engineering, and modern web technologies.',
    url,
    imageUrl,
  })
}

export function generateNotFoundMetadata(): Metadata {
  return {
    title: 'Post Not Found | Digital Backyard',
    description: 'The requested blog post could not be found.',
  }
}
