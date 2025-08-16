import { Post } from './posts'
import Fuse from 'fuse.js'

export interface SearchResult {
  post: Post
  score: number
  matches: {
    field: 'title' | 'content' | 'summary'
    text: string
    indices: number[][]
  }[]
}

// Fuse.js configuration for optimal search
const fuseOptions = {
  includeScore: true,
  includeMatches: true,
  threshold: 0.5, // Lower threshold = more strict matching
  keys: [
    { name: 'title', weight: 3 },
    { name: 'summary', weight: 2 },
    { name: 'content', weight: 1 }
  ],
  ignoreLocation: true,
  findAllMatches: true,
  minMatchCharLength: 2,
  shouldSort: true
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
  if (!query.trim() && query.trim().length < 3) return []
  
  // Prepare posts for Fuse.js search
  const searchablePosts = posts.map(post => ({
    ...post,
    content: extractTextFromMarkdown(post.content)
  }))
  
  // Create Fuse instance
  const fuse = new Fuse(searchablePosts, fuseOptions)
  
  // Perform search
  const fuseResults = fuse.search(query)
    
  // Transform Fuse.js results to our format
  const results: SearchResult[] = fuseResults.map(fuseResult => {
    const post = fuseResult.item
    const matches: SearchResult['matches'] = []
    
    // Process matches from Fuse.js
    if (fuseResult.matches) {
      for (const match of fuseResult.matches) {
        if (match.key && match.indices) {
          const field = match.key as 'title' | 'summary' | 'content'
          const text = match.value || ''
          
          // For content matches, extract snippet
          if (field === 'content' && text.length > 150) {
            const snippet = extractSnippet(text, match.indices.flat(), 150)
            matches.push({
              field: 'content',
              text: snippet.text,
              indices: [match.indices.flat().map(i => i - snippet.startIndex)]
            })
          } else {
            matches.push({
              field,
              text,
              indices: [match.indices.flat()]
            })
          }
        }
      }
    }
    
    return {
      post,
      score: fuseResult.score || 0,
      matches
    }
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
