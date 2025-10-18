'use client'
import type { Post } from '@/lib/posts'
import Link from 'next/link'
import React, { useState } from 'react'
import Header from '@/components/header'

// Clean Article Card Component
interface ArticleCardProps {
  post: Post
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post }) => {
  return (
    <Link
      href={`/thoughts/${post.slug}`}
      className="block py-6 border-b border-gray-100 hover:bg-gray-50 transition-colors group"
    >
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {post.summary}
        </p>
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <span>
            {post.readingTime}
            {' '}
            min read
          </span>
          <span>•</span>
          <span>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>
    </Link>
  )
}

const HomePage: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>(posts)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.trim().length === 0) {
      setDisplayedPosts(posts)
    }
    else {
      const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase())
        || post.summary.toLowerCase().includes(query.toLowerCase())
        || post.content.toLowerCase().includes(query.toLowerCase()),
      )
      setDisplayedPosts(filteredPosts)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-50 bg-gray-50/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4">
          <Header />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-8">
        <div className="space-y-1">
          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
            />
          </div>

          {/* Articles List */}
          <div>
            {displayedPosts.length > 0
              ? (
                  displayedPosts.map(post => (
                    <ArticleCard key={post.slug} post={post} />
                  ))
                )
              : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No articles found.</p>
                  </div>
                )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
