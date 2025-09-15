import type { IconName } from 'lucide-react/dynamic'
import type { BlogStats } from './blog-stats'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import matter from 'gray-matter'
import { cache } from 'react'
import readingTime from 'reading-time'
import { getBlogStats } from './blog-stats'

export interface Post {
  slug: string
  title: string
  publishedAt: string
  summary: string
  icon?: IconName
  image?: string
  readingTime: string
  content: string
  headings: Heading[]
  stats: BlogStats
}

export interface Heading {
  id: string
  title: string
  level: number
}

const postsDirectory = path.join(process.cwd(), 'content/thoughts')

export const getStats = cache(async (slug: string): Promise<BlogStats> => {
  const stats = await getBlogStats(slug)
  return stats
})

export const getPostBySlug = cache(async (slug: string): Promise<Post> => {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  const fileContents = await fs.promises.readFile(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const headings = extractHeadings(matterResult.content)

  const stats = readingTime(matterResult.content)
  const readingTimeText = `${Math.ceil(stats.minutes)} min read`

  return {
    slug,
    title: matterResult.data.title,
    publishedAt: matterResult.data.publishedAt,
    summary: matterResult.data.summary,
    icon: matterResult.data.icon,
    image: matterResult.data.image,
    readingTime: readingTimeText,
    content: matterResult.content,
    headings,
    stats: await getStats(slug),
  }
})

export const getAllPosts = cache(async (): Promise<Post[]> => {
  const fileNames = await fs.promises.readdir(postsDirectory)
  const allPostsData = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, '')
        return await getPostBySlug(slug)
      }),
  )

  return allPostsData.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
})

export const getRecentPosts = cache(async (limit: number = 5): Promise<Post[]> => {
  const allPosts = await getAllPosts()
  return allPosts.slice(0, limit)
})

function extractHeadings(content: string): Heading[] {
  // eslint-disable-next-line regexp/no-super-linear-backtracking
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings: Heading[] = []
  let match

  // eslint-disable-next-line no-cond-assign
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const title = match[2].trim()
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    headings.push({
      id,
      title,
      level,
    })
  }

  return headings
}

export async function getPostSlugs(): Promise<string[]> {
  const fileNames = await fs.promises.readdir(postsDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => fileName.replace(/\.mdx$/, ''))
}

export async function getAbout(): Promise<string> {
  const fullPath = path.join(process.cwd(), 'app/about/about.mdx')
  const fileContents = await fs.promises.readFile(fullPath, 'utf8')
  return fileContents
}
