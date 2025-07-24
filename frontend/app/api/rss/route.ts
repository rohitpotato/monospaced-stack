import { Feed } from 'feed';
import { getAllPosts } from '@/app/lib/mdx';

export async function GET() {
    const posts = await getAllPosts();
    const siteURL = 'https://rohitpotato.xyz';

    const feed = new Feed({
        title: "Digital Backyard",
        description: "Notes about web dev, infrastructure, and some other stuff.",
        id: siteURL,
        link: siteURL,
        language: "en",
        favicon: `${siteURL}/favicon/favicon.ico`,
        copyright: `All rights reserved ${new Date().getFullYear()}, Rohit Kashyap`,
        author: {
            name: "Rohit Kashyap",
            email: "rohit.212@icloud.com",
            link: "https://x.com/rohitpotato"
        }
    });

    posts.forEach((post) => {
        feed.addItem({
            title: post.meta.title,
            id: `${siteURL}/thoughts/${post.slug}`,
            link: `${siteURL}/thoughts/${post.slug}`,
            description: post.meta.summary,
            date: new Date(post.meta.publishedAt),
            author: [
                {
                    name: "Rohit Kashyap",
                    email: "rohit.212@icloud.com",
                    link: "https://x.com/rohitpotato"
                }
            ]
        });
    });

    return new Response(feed.rss2(), {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 's-maxage=3600, stale-while-revalidate'
        }
    });
} 