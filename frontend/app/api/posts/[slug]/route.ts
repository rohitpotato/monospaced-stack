import { NextResponse } from 'next/server'
import { getPostBySlug } from '@/lib/posts'

interface PostRouteProps {
  params: Promise<{
    slug: string
  }>
}

export async function GET(request: Request, { params }: PostRouteProps) {
  try {
    const { slug } = await params
    const post = await getPostBySlug(slug)
    return NextResponse.json(post)
  }
  catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }
}
