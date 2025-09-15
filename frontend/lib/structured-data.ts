import type { Post } from './posts'
import { resolveImageUrl } from './metadata'

export function generateBlogPostStructuredData(post: Post): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.summary,
    'image': resolveImageUrl(post),
    'author': {
      '@type': 'Person',
      'name': 'Rohit',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Digital Backyard',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://rohitpotato.xyz/placeholder-logo.png',
      },
    },
    'datePublished': post.publishedAt,
    'dateModified': post.publishedAt,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://rohitpotato.xyz/thoughts/${post.slug}`,
    },
    'wordCount': post.content.split(' ').length,
    'timeRequired': `PT${Math.ceil(Number.parseInt(post.readingTime.split(' ')[0]))}M`,
    'articleSection': 'Technology',
    'keywords': 'web development, infrastructure, technology, programming',
  }
}

export function generateWebsiteStructuredData(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Digital Backyard',
    'description': 'Notes about web development, infrastructure, and technology insights',
    'url': 'https://rohitpotato.xyz',
    'author': {
      '@type': 'Person',
      'name': 'Rohit',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Digital Backyard',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://rohitpotato.xyz/placeholder-logo.png',
      },
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://rohitpotato.xyz/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    'sameAs': [
      'https://twitter.com/rohitpotato',
      'https://github.com/rohitpotato',
    ],
  }
}

export function generateBlogStructuredData(recentPosts: Post[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'Digital Backyard',
    'description': 'Notes about web development, infrastructure, and technology insights',
    'url': 'https://rohitpotato.xyz',
    'author': {
      '@type': 'Person',
      'name': 'Rohit',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Digital Backyard',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://rohitpotato.xyz/placeholder-logo.png',
      },
    },
    'blogPost': recentPosts.map(post => ({
      '@type': 'BlogPosting',
      'headline': post.title,
      'description': post.summary,
      'url': `https://rohitpotato.xyz/thoughts/${post.slug}`,
      'datePublished': post.publishedAt,
      'dateModified': post.publishedAt,
      'author': {
        '@type': 'Person',
        'name': 'Rohit',
      },
    })),
  }
}
