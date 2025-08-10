import { NextRequest, NextResponse } from "next/server"
import fs from 'fs'
import path from 'path'

const statsFile = path.join(process.cwd(), 'data', 'stats.json')

// Ensure stats directory exists
const statsDir = path.dirname(statsFile)
if (!fs.existsSync(statsDir)) {
  fs.mkdirSync(statsDir, { recursive: true })
}

// Initialize stats file if it doesn't exist
if (!fs.existsSync(statsFile)) {
  fs.writeFileSync(statsFile, JSON.stringify({}))
}

function getStats() {
  try {
    const data = fs.readFileSync(statsFile, 'utf8')
    return JSON.parse(data)
  } catch {
    return {}
  }
}

function saveStats(stats: Record<string, { likes: number; views: number }>) {
  fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2))
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const stats = getStats()
    const postStats = stats[slug] || { likes: 0, views: 0 }
    
    return NextResponse.json(postStats)
  } catch  {
    return NextResponse.json({ likes: 0, views: 0 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const { action } = await request.json()
    const stats = getStats()
    
    if (!stats[slug]) {
      stats[slug] = { likes: 0, views: 0 }
    }
    
    if (action === 'like') {
      stats[slug].likes += 1
    } else if (action === 'view') {
      stats[slug].views += 1
    }
    
    saveStats(stats)
    
    return NextResponse.json(stats[slug])
  } catch {
    return NextResponse.json({ error: 'Failed to update stats' }, { status: 500 })
  }
}
