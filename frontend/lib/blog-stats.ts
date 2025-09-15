'use server'

import { promises as fs } from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const STATS_DIR = path.join(process.cwd(), 'data', 'stats')

export interface BlogStats {
  views: number
  likes: number
  likedBy: string[] // Store user IDs/sessions
}

async function ensureStatsDir() {
  try {
    await fs.access(STATS_DIR)
  }
  catch {
    await fs.mkdir(STATS_DIR, { recursive: true })
  }
}

async function getStatsFilePath(slug: string) {
  await ensureStatsDir()
  return path.join(STATS_DIR, `${slug}.json`)
}

export async function getBlogStats(slug: string): Promise<BlogStats> {
  try {
    const filePath = await getStatsFilePath(slug)
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  }
  catch {
    return { views: 0, likes: 0, likedBy: [] }
  }
}

export async function incrementViews(slug: string): Promise<BlogStats> {
  const stats = await getBlogStats(slug)
  stats.views += 1

  const filePath = await getStatsFilePath(slug)
  await fs.writeFile(filePath, JSON.stringify(stats, null, 2))

  return stats
}

export async function toggleLike(slug: string, userId: string): Promise<BlogStats> {
  const stats = await getBlogStats(slug)

  if (stats.likedBy.includes(userId)) {
    stats.likes -= 1
    stats.likedBy = stats.likedBy.filter(id => id !== userId)
  }
  else {
    stats.likes += 1
    stats.likedBy.push(userId)
  }

  const filePath = await getStatsFilePath(slug)
  await fs.writeFile(filePath, JSON.stringify(stats, null, 2))

  return stats
}

export async function getAllStats(): Promise<Record<string, BlogStats>> {
  try {
    await ensureStatsDir()
    const files = await fs.readdir(STATS_DIR)
    const stats: Record<string, BlogStats> = {}

    for (const file of files) {
      if (file.endsWith('.json')) {
        const slug = file.replace('.json', '')
        stats[slug] = await getBlogStats(slug)
      }
    }

    return stats
  }
  catch {
    return {}
  }
}
