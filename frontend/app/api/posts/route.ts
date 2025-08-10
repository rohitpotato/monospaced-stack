import { NextResponse } from "next/server"
import { getAllPosts, getRecentPosts } from "@/lib/posts"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const recent = searchParams.get("recent")
    const limit = searchParams.get("limit")

    if (recent === "true") {
      const posts = await getRecentPosts(limit ? parseInt(limit) : 5)
      return NextResponse.json(posts)
    }

    const posts = await getAllPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
