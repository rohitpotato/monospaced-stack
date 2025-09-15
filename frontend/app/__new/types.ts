export interface ArticleContent {
  type: 'heading' | 'paragraph' | 'code' | 'image'
  content: string
}

export interface Article {
  slug: string
  title: string
  description: string
  readingTime: number // in minutes
  content: ArticleContent[]
}

export interface Author {
  name: string
  bio: string
  image: string
}
