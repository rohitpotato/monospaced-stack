import { getRecentPosts, getAllPosts } from "@/lib/posts"
import Sidebar from "./sidebar/sidebar"
import { SearchProvider, SearchBar } from "@/components/search-provider"
import RecentPosts from "./recent-posts/recent-posts"
import SiteHero from "./site-hero/site-hero"

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const [recentPosts, allPosts] = await Promise.all([getRecentPosts(4), getAllPosts()])
    return (
        <SearchProvider posts={allPosts}>
            <div className="layout">
                {/* Desktop Sidebar */}
                <div className="sidebar-left">
                    <Sidebar recentPosts={recentPosts} />
                </div>

                {/* Mobile Header */}
                <div className="mobile-header">
                    <SiteHero />
                    <div className="search-container">
                        <SearchBar />
                    </div>
                </div>

                {/* Main Content */}
                <div className="content">
                    {children}
                </div>

                {/* Mobile Sidebar Content */}
                <div className="mobile-sidebar-content">
                    <RecentPosts recentPosts={recentPosts} />
                </div>
            </div>
        </SearchProvider>
    )
}

export default Layout