import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

const rootDirectory = path.join(process.cwd(), 'content/thoughts');

export type Frontmatter = {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
};

export async function getPost(slug: string) {
    const realSlug = slug.replace(/\.mdx$/, '');
    const filePath = path.join(rootDirectory, `${realSlug}.mdx`);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });

    const { frontmatter, content } = await compileMDX<Frontmatter>({
        source: fileContent,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeHighlight],
            },
        },
    });

    return { meta: frontmatter, content, slug: realSlug };
}

export async function getAllPosts() {
    const files = fs.readdirSync(rootDirectory);
    const posts = [];

    for (const file of files) {
        const { meta, slug } = await getPost(file);
        posts.push({ meta, slug });
    }

    return posts.sort((a, b) => {
        return new Date(b.meta.publishedAt).getTime() - new Date(a.meta.publishedAt).getTime();
    });
} 