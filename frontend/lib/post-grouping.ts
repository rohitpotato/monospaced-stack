import type { Post } from '@/lib/posts'

export const FALLBACK_POST_CATEGORY = 'Thoughts'

/** Column order on homepage: listed first; any other categories follow alphabetically */
export const POST_CATEGORY_COLUMN_ORDER: string[] = [
  'Infrastructure',
  'Frontend',
]

export interface PostCategoryGroup {
  category: string
  posts: Post[]
}

export function groupPostsIntoCategoryColumns(posts: Post[]): PostCategoryGroup[] {
  const byCat = new Map<string, Post[]>()
  for (const post of posts) {
    const category = post.category?.trim() || FALLBACK_POST_CATEGORY
    const list = byCat.get(category) ?? []
    list.push(post)
    byCat.set(category, list)
  }

  const seen = new Set<string>()
  const ordered: PostCategoryGroup[] = []

  for (const cat of POST_CATEGORY_COLUMN_ORDER) {
    const bucket = byCat.get(cat)
    if (bucket?.length) {
      ordered.push({ category: cat, posts: bucket })
      seen.add(cat)
    }
  }

  const rest = [...byCat.keys()]
    .filter(k => !seen.has(k))
    .sort((a, b) => a.localeCompare(b))

  for (const cat of rest) {
    const bucket = byCat.get(cat)!
    ordered.push({ category: cat, posts: bucket })
  }

  return ordered
}
