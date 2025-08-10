import { NextResponse } from "next/server"
import { getAllPosts } from "@/lib/posts"

export async function GET() {
  try {
    const posts = await getAllPosts()
    
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Digital Backyard</title>
    <description>Notes about web dev, infrastructure, and some other stuff.</description>
    <link>https://rohitpotato.xyz</link>
    <atom:link href="https://rohitpotato.xyz/rss" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.summary}]]></description>
      <link>https://rohitpotato.xyz/thoughts/${post.slug}</link>
      <guid>https://rohitpotato.xyz/thoughts/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>
    `).join('')}
  </channel>
</rss>`

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error("Error generating RSS feed:", error)
    return new NextResponse("Error generating RSS feed", { status: 500 })
  }
}
