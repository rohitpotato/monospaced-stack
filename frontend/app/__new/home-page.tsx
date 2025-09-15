'use client'
import type { Article } from './types'
import type { Post } from '@/lib/posts'
import Link from 'next/link'
import React, { useState } from 'react'
import AuthorProfile from '@/components/author-profile'
import Button from '@/components/button'
import DecorativeWindow from '@/components/decorative-window'
import Input from '@/components/input'
import LoadingBar from '@/components/loading-bar'
import { RetroWindow } from '@/components/retro-window'
import Typography from '@/components/typography'
import { colors, layout } from './theme'

// Convert Post to Article for ArticleCard compatibility
function postToArticle(post: Post): Article {
  return {
    slug: post.slug,
    title: post.title,
    description: post.summary,
    readingTime: Number.parseInt(post.readingTime) || 0,
    content: [], // ArticleCard doesn't use content
  }
}

// Highlighted Article Card Component
interface HighlightedArticleCardProps {
  post: Post
  searchQuery: string
  hasSearchQuery: boolean
  highlightText: (text: string, query: string) => string
}

const HighlightedArticleCard: React.FC<HighlightedArticleCardProps> = ({
  post,
  searchQuery,
  hasSearchQuery,
  highlightText,
}) => {
  const article = postToArticle(post)

  return (
    <Link
      href={`/thoughts/${article.slug}`}
      className="block mb-2 p-2 border-2 border-transparent hover:border-green-500 focus:border-green-500 active:bg-green-500 active:text-black group"
    >
      <div className="flex items-start">
        <Typography variant="bodyLarge" color="tertiary" className="mr-2 font-bold flex-shrink-0">&gt;</Typography>
        <div>
          {hasSearchQuery
            ? (
                <>
                  <div
                    className="group-active:text-black"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(article.title, searchQuery),
                    }}
                  />
                  <div
                    className="group-active:text-gray-900"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(article.description, searchQuery),
                    }}
                  />
                </>
              )
            : (
                <>
                  <Typography variant="h3" className="group-active:text-black">{article.title}</Typography>
                  <Typography variant="body" color="textMuted" className="group-active:text-gray-900">{article.description}</Typography>
                </>
              )}
          <Typography variant="small" className="mt-1 group-active:text-gray-800">
            {article.readingTime}
            {' '}
            min read
          </Typography>
        </div>
      </div>
    </Link>
  )
}

const HomePage: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>(posts)
  const [hasSearchQuery, setHasSearchQuery] = useState(false)

  // Simple highlighting function
  const highlightText = (text: string, query: string): string => {
    if (!query.trim())
      return text

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    return text.replace(regex, '<mark class="bg-green-400/30 text-green-100 px-1 rounded font-medium font-mono">$1</mark>')
  }

  const handleSearch = () => {
    if (isSearching)
      return

    setIsSearching(true)

    // Simulate network delay for aesthetic
    setTimeout(() => {
      if (searchQuery.trim().length === 0) {
        // Show all posts when query is empty
        setDisplayedPosts(posts)
        setHasSearchQuery(false)
      }
      else {
        // Filter posts that match the search query
        const filteredPosts = posts.filter(post =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase())
          || post.summary.toLowerCase().includes(searchQuery.toLowerCase())
          || post.content.toLowerCase().includes(searchQuery.toLowerCase()),
        )

        setDisplayedPosts(filteredPosts)
        setHasSearchQuery(true)
      }

      setIsSearching(false)
    }, 1000) // 1 second search simulation
  }

  return (
    <RetroWindow title="MAINFRAME_TERMINAL.exe" variant="full">
      <div className={layout.container}>
        {/* Left Column: Content */}
        <div className={`bg-${colors.background} p-4`}>
          <Typography variant="h1" className="mb-2">Welcome to the Mainframe→</Typography>
          <Typography variant="bodyLarge" color="textMuted" className="mb-6">Accessing archived transmissions...</Typography>

          {/* Search Bar & Loading Bar */}
          <div className="mb-8">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Query database..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                aria-label="Search articles"
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                disabled={isSearching}
              />
              <Button
                onClick={handleSearch}
                disabled={isSearching}
              >
                {isSearching ? 'SEARCHING...' : 'Execute'}
              </Button>
            </div>
            {/* Add a container to prevent layout shift when loading bar appears */}
            <div className="h-4 mt-2">
              {isSearching && <LoadingBar progress={100} />}
            </div>
          </div>

          {/* Article Display */}
          <div>
            {displayedPosts.map(post => (
              <HighlightedArticleCard
                key={post.slug}
                post={post}
                searchQuery={searchQuery}
                hasSearchQuery={hasSearchQuery}
                highlightText={highlightText}
              />
            ))}
            {!isSearching && displayedPosts.length === 0 && searchQuery.trim().length > 0 && (
              <Typography variant="body" color="error" className="text-center">
                QUERY FAILED: No records found.
              </Typography>
            )}
          </div>
        </div>

        {/* Right Column: Decorative & Author */}
        <div className={`bg-${colors.background} p-4 relative space-y-4`}>
          <AuthorProfile />
          <DecorativeWindow />
        </div>
      </div>
    </RetroWindow>
  )
}

export default HomePage
