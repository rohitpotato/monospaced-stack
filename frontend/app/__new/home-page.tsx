import type { Post } from '@/lib/posts'
import { AboutColumn } from '@/components/home/about-column'
import { TopicColumn } from '@/components/home/topic-column'
import { groupPostsIntoCategoryColumns } from '@/lib/post-grouping'

interface HomePageProps {
  posts: Post[]
}

export default function HomePage({ posts }: HomePageProps) {
  const groups = groupPostsIntoCategoryColumns(posts)
  return (
    <div className="min-h-[100dvh] bg-page text-accent">
      <div className="md:h-[100dvh] md:overflow-x-auto md:overscroll-x-contain">
        <div className="flex flex-col md:inline-grid md:min-w-full md:grid-flow-col md:auto-cols-max">
          <AboutColumn />
          {groups.map(group => (
            <TopicColumn key={group.category} group={group} />
          ))}
        </div>
      </div>
    </div>
  )
}
