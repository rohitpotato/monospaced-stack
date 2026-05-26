import type { Post } from '@/lib/posts'

export const FALLBACK_POST_CATEGORY = 'Thoughts'

/** Chapter order on homepage: listed first; any other categories follow alphabetically */
export const POST_CATEGORY_COLUMN_ORDER: string[] = [
  'Infrastructure',
  'Frontend',
]

export interface PostCategoryGroup {
  chapterIndex: number
  category: string
  posts: Post[]
}

function sortPostsNewestFirst(posts: Post[]): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
}

export function formatChapterLabel(chapterIndex: number, category: string): string {
  const padded = String(chapterIndex).padStart(2, '0')
  return `${padded} — ${category.toUpperCase()}`
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
  let chapterIndex = 0

  for (const cat of POST_CATEGORY_COLUMN_ORDER) {
    const bucket = byCat.get(cat)
    if (bucket?.length) {
      chapterIndex += 1
      ordered.push({
        chapterIndex,
        category: cat,
        posts: sortPostsNewestFirst(bucket),
      })
      seen.add(cat)
    }
  }

  const rest = [...byCat.keys()]
    .filter(k => !seen.has(k))
    .sort((a, b) => a.localeCompare(b))

  for (const cat of rest) {
    const bucket = byCat.get(cat)!
    chapterIndex += 1
    ordered.push({
      chapterIndex,
      category: cat,
      posts: sortPostsNewestFirst(bucket),
    })
  }

  return ordered
}
