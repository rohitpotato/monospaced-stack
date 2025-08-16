import { SearchBar } from "@/components/search-provider";
import SiteHero from "../site-hero/site-hero";
import RecentPosts from "../recent-posts/recent-posts";
import { Post } from "@/lib/posts";

const Sidebar = ({ recentPosts }: { recentPosts: Post[] }) => {
    return <aside className="pt-[90px] px-8 h-full flex flex-col gap-4">
        <SiteHero />
        <SearchBar />
        <RecentPosts recentPosts={recentPosts} />
    </aside>
}

export default Sidebar;