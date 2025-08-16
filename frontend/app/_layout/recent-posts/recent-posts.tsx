import Typography from "@/components/typography";
import { Post } from "@/lib/posts";
import Link from "next/link";

const RecentPosts = ({ recentPosts }: { recentPosts: Post[] }) => {
    return <div className="flex flex-col gap-4">
        <Typography variant="heading-small">Recent Posts</Typography>
        <div className="flex flex-col gap-4">
            {recentPosts.map((post) => (
                <Link href={`/thoughts/${post.slug}`} key={post.title}>
                    <Typography variant="link">{post.title}</Typography>
                    <Typography className="italic" variant="p">{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
                </Link>
            ))}
        </div>
    </div>
}

export default RecentPosts;