import { Post } from './posts'

export interface SearchResult {
  post: Post
  score: number
  matches: {
    field: 'title' | 'content' | 'summary'
    text: string
    indices: number[][]
  }[]
}

// Extract text content from markdown (simple implementation)
function extractTextFromMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
    .replace(/[#*_~`]/g, '') // Remove markdown formatting
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
}

// Search through posts using Fuse.js
export function searchPosts(posts: Post[], query: string): SearchResult[] {
  if (!query.trim() || query.trim().length < 3) return []
  
  const trimmedQuery = query.trim().toLowerCase()
  const results: SearchResult[] = []
  
  // Search through posts manually for exact substring matches
  for (const post of posts) {
    const matches: SearchResult['matches'] = []
    
    // Check title
    const titleLower = post.title.toLowerCase()
    if (titleLower.includes(trimmedQuery)) {
      const startIndex = titleLower.indexOf(trimmedQuery)
      const indices = Array.from({ length: trimmedQuery.length }, (_, i) => startIndex + i)
      matches.push({
        field: 'title',
        text: post.title,
        indices: [indices]
      })
    }
    
    // Check summary
    if (post.summary) {
      const summaryLower = post.summary.toLowerCase()
      if (summaryLower.includes(trimmedQuery)) {
        const startIndex = summaryLower.indexOf(trimmedQuery)
        const indices = Array.from({ length: trimmedQuery.length }, (_, i) => startIndex + i)
        matches.push({
          field: 'summary',
          text: post.summary,
          indices: [indices]
        })
      }
    }
    
    // Check content
    const contentText = extractTextFromMarkdown(post.content)
    const contentLower = contentText.toLowerCase()
    if (contentLower.includes(trimmedQuery)) {
      const startIndex = contentLower.indexOf(trimmedQuery)
      const indices = Array.from({ length: trimmedQuery.length }, (_, i) => startIndex + i)
      
      // Extract snippet around the match
      const snippet = extractSnippet(contentText, indices, 150)
      matches.push({
        field: 'content',
        text: snippet.text,
        indices: [indices.map(i => i - snippet.startIndex)]
      })
    }
    
    // Only include posts that have matches
    if (matches.length > 0) {
      results.push({
        post,
        score: 0, // All matches are equally relevant for exact substring matching
        matches
      })
    }
  }
  
  // Sort by relevance (title matches first, then summary, then content)
  results.sort((a, b) => {
    const aHasTitle = a.matches.some(m => m.field === 'title')
    const bHasTitle = b.matches.some(m => m.field === 'title')
    
    if (aHasTitle && !bHasTitle) return -1
    if (!aHasTitle && bHasTitle) return 1
    
    const aHasSummary = a.matches.some(m => m.field === 'summary')
    const bHasSummary = b.matches.some(m => m.field === 'summary')
    
    if (aHasSummary && !bHasSummary) return -1
    if (!aHasSummary && bHasSummary) return 1
    
    return 0
  })
  
  return results
}

// Extract a snippet around the matched text
function extractSnippet(text: string, indices: number[], maxLength: number): { text: string; startIndex: number } {
  if (indices.length === 0) return { text: text.substring(0, maxLength), startIndex: 0 }
  
  // Sort indices to ensure proper order
  const sortedIndices = [...indices].sort((a, b) => a - b)
  const firstIndex = sortedIndices[0]
  const lastIndex = sortedIndices[sortedIndices.length - 1]
  const matchLength = lastIndex - firstIndex + 1
  
  let start = Math.max(0, firstIndex - Math.floor((maxLength - matchLength) / 2))
  let end = Math.min(text.length, start + maxLength)
  
  // Adjust if we're near the end
  if (end === text.length) {
    start = Math.max(0, end - maxLength)
  }
  
  return {
    text: text.substring(start, end),
    startIndex: start
  }
}

// Highlight text with search matches
export function highlightText(text: string, indices: number[]): string {
  if (indices.length === 0) return text
  
  // Sort indices to process them in order
  const sortedIndices = [...indices].sort((a, b) => a - b)
  
  // Group consecutive indices for better highlighting
  const groups: number[][] = []
  let currentGroup: number[] = []
  
  for (let i = 0; i < sortedIndices.length; i++) {
    const index = sortedIndices[i]
    
    // Skip if index is out of bounds
    if (index < 0 || index >= text.length) continue
    
    if (currentGroup.length === 0 || index === currentGroup[currentGroup.length - 1] + 1) {
      currentGroup.push(index)
    } else {
      if (currentGroup.length > 0) {
        groups.push([...currentGroup])
      }
      currentGroup = [index]
    }
  }
  
  if (currentGroup.length > 0) {
    groups.push(currentGroup)
  }
  
  // Build highlighted text
  let result = ''
  let lastIndex = 0
  
  for (const group of groups) {
    const startIndex = group[0]
    const endIndex = group[group.length - 1]
    
    // Add text before the match
    result += text.substring(lastIndex, startIndex)
    
    // Add highlighted match
    const matchedText = text.substring(startIndex, endIndex + 1)
    result += `<mark class="bg-yellow-200 text-gray-900 px-0.5 rounded font-medium">${matchedText}</mark>`
    
    lastIndex = endIndex + 1
  }
  
  // Add remaining text
  result += text.substring(lastIndex)
  
  return result
}
