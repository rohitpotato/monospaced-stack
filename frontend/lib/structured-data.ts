import type { Post } from './posts'
import { resolveImageUrl } from './metadata'
import { SITE } from './site'

const PERSON = {
  '@type': 'Person',
  'name': SITE.author,
  'url': SITE.url,
  'sameAs': SITE.sameAs,
}

export function generateBlogPostStructuredData(post: Post): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.summary,
    'image': resolveImageUrl(post),
    'author': PERSON,
    'publisher': PERSON,
    'datePublished': post.publishedAt,
    'dateModified': post.publishedAt,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://rohitpotato.xyz/thoughts/${post.slug}`,
    },
    'wordCount': post.content.split(' ').length,
    'timeRequired': `PT${Math.ceil(Number.parseInt(post.readingTime.split(' ')[0]))}M`,
    'articleSection': post.category,
    'keywords': post.category,
  }
}

export function generateWebsiteStructuredData(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': SITE.name,
    'description': SITE.description,
    'url': 'https://rohitpotato.xyz',
    'author': PERSON,
    'publisher': PERSON,
  }
}

export function generateBlogStructuredData(recentPosts: Post[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': SITE.name,
    'description': SITE.description,
    'url': 'https://rohitpotato.xyz',
    'author': PERSON,
    'publisher': PERSON,
    'blogPost': recentPosts.map(post => ({
      '@type': 'BlogPosting',
      'headline': post.title,
      'description': post.summary,
      'url': `https://rohitpotato.xyz/thoughts/${post.slug}`,
      'datePublished': post.publishedAt,
      'dateModified': post.publishedAt,
      'author': PERSON,
    })),
  }
}
