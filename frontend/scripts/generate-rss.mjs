import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const contentDir = path.join(root, 'content', 'thoughts')
const outPath = path.join(root, 'public', 'rss.xml')
const baseUrl = 'https://rohitpotato.xyz'

async function generateRss() {
  const files = await fs.readdir(contentDir)
  const mdxFiles = files.filter(f => f.endsWith('.mdx'))

  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = file.replace(/\.mdx$/, '')
      const raw = await fs.readFile(path.join(contentDir, file), 'utf8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title ?? slug,
        summary: data.summary ?? '',
        publishedAt: data.publishedAt ?? new Date().toISOString(),
      }
    }),
  )

  posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Digital Backyard</title>
    <description>Notes about web dev, infrastructure, and some other stuff.</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.summary}]]></description>
      <link>${baseUrl}/thoughts/${post.slug}</link>
      <guid>${baseUrl}/thoughts/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>
    `).join('')}
  </channel>
</rss>`

  await fs.mkdir(path.dirname(outPath), { recursive: true })
  await fs.writeFile(outPath, rss, 'utf8')
  console.log('Generated public/rss.xml')
}

generateRss().catch((err) => {
  console.error(err)
  process.exit(1)
})
