/**
 * Utility to parse MDX content into blocks for matrix-style loading animation
 */

export interface ContentBlock {
  id: string
  type: 'heading' | 'paragraph' | 'code' | 'list' | 'blockquote' | 'image' | 'hr'
  content: string
  level?: number // for headings
  language?: string // for code blocks
}

export function parseContentToBlocks(content: string): ContentBlock[] {
  const blocks: ContentBlock[] = []
  const lines = content.split('\n')
  let currentBlock: string[] = []
  let blockIndex = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmedLine = line.trim()

    // Skip empty lines at the start
    if (trimmedLine === '' && currentBlock.length === 0) {
      continue
    }

    // Check for different block types
    if (trimmedLine.startsWith('#')) {
      // Flush current block if exists
      if (currentBlock.length > 0) {
        blocks.push(createBlock(currentBlock.join('\n'), blockIndex++))
        currentBlock = []
      }

      // Add heading block
      const level = trimmedLine.match(/^#+/)?.[0].length || 1
      blocks.push({
        id: `heading-${blockIndex}`,
        type: 'heading',
        content: trimmedLine,
        level: Math.min(level, 6) as 1 | 2 | 3 | 4 | 5 | 6,
      })
      blockIndex++
    }
    else if (trimmedLine.startsWith('```')) {
      // Flush current block if exists
      if (currentBlock.length > 0) {
        blocks.push(createBlock(currentBlock.join('\n'), blockIndex++))
        currentBlock = []
      }

      // Handle code block
      const language = trimmedLine.slice(3).trim()
      const codeLines: string[] = []
      i++ // Skip the opening ```

      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }

      blocks.push({
        id: `code-${blockIndex}`,
        type: 'code',
        content: codeLines.join('\n'),
        language: language || 'text',
      })
      blockIndex++
    }
    else if (trimmedLine.startsWith('>')) {
      // Flush current block if exists
      if (currentBlock.length > 0) {
        blocks.push(createBlock(currentBlock.join('\n'), blockIndex++))
        currentBlock = []
      }

      // Handle blockquote
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().slice(1).trim())
        i++
      }
      i-- // Adjust for the loop increment

      blocks.push({
        id: `blockquote-${blockIndex}`,
        type: 'blockquote',
        content: quoteLines.join('\n'),
      })
      blockIndex++
    }
    else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ') || /^\d+\./.test(trimmedLine)) {
      // Flush current block if exists
      if (currentBlock.length > 0) {
        blocks.push(createBlock(currentBlock.join('\n'), blockIndex++))
        currentBlock = []
      }

      // Handle list
      const listLines: string[] = []
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* ') || /^\d+\./.test(lines[i].trim()))) {
        listLines.push(lines[i])
        i++
      }
      i-- // Adjust for the loop increment

      blocks.push({
        id: `list-${blockIndex}`,
        type: 'list',
        content: listLines.join('\n'),
      })
      blockIndex++
    }
    else if (trimmedLine === '---' || trimmedLine === '***' || trimmedLine === '___') {
      // Flush current block if exists
      if (currentBlock.length > 0) {
        blocks.push(createBlock(currentBlock.join('\n'), blockIndex++))
        currentBlock = []
      }

      // Handle horizontal rule
      blocks.push({
        id: `hr-${blockIndex}`,
        type: 'hr',
        content: '',
      })
      blockIndex++
    }
    else if (trimmedLine.startsWith('![')) {
      // Flush current block if exists
      if (currentBlock.length > 0) {
        blocks.push(createBlock(currentBlock.join('\n'), blockIndex++))
        currentBlock = []
      }

      // Handle image
      blocks.push({
        id: `image-${blockIndex}`,
        type: 'image',
        content: line,
      })
      blockIndex++
    }
    else if (trimmedLine === '') {
      // Empty line - if we have content, flush it
      if (currentBlock.length > 0) {
        blocks.push(createBlock(currentBlock.join('\n'), blockIndex++))
        currentBlock = []
      }
    }
    else {
      // Regular content line
      currentBlock.push(line)
    }
  }

  // Flush any remaining content
  if (currentBlock.length > 0) {
    blocks.push(createBlock(currentBlock.join('\n'), blockIndex))
  }

  return blocks
}

function createBlock(content: string, index: number): ContentBlock {
  const trimmedContent = content.trim()

  // Determine block type based on content
  if (trimmedContent.startsWith('![')) {
    return {
      id: `image-${index}`,
      type: 'image',
      content: trimmedContent,
    }
  }

  // Default to paragraph
  return {
    id: `paragraph-${index}`,
    type: 'paragraph',
    content: trimmedContent,
  }
}
