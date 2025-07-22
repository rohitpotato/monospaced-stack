import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import type { Element, Root } from 'hast';
import { mdxComponents } from './mdx-components';

const rootDirectory = path.join(process.cwd(), 'content/thoughts');

export type Frontmatter = {
    title: string;
    publishedAt: string;
    updatedAt?: string;
    summary: string;
    description?: string;
    excerpt?: string;
    image?: string;
    coverImage?: string;
    tags?: string[];
    icon?: string;
};

// Custom rehype plugin to handle inline code blocks
function rehypeInlineCode() {
    return (tree: Root) => {
        const visit = (node: Element | Root) => {
            if (node.type === 'element' && node.tagName === 'code' && node.properties && !node.properties.className) {
                node.properties.className = ['language-text'];
            }
            if ('children' in node) {
                node.children.forEach(child => {
                    if (child.type === 'element') {
                        visit(child as Element);
                    }
                });
            }
        };
        visit(tree);
    };
}

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
                rehypePlugins: [
                    rehypeSlug,
                    rehypeInlineCode,
                    rehypeHighlight,
                ],
            },
        },
        components: mdxComponents,
    });

    return { meta: frontmatter, content, slug: realSlug };
}

export async function getAllPosts() {
    const files = fs.readdirSync(rootDirectory);
    const posts = await Promise.all(files.map(async (file) => {
        const { meta, slug } = await getPost(file);
        return { meta, slug };
    }))

    return posts.sort((a, b) => {
        return new Date(b.meta.publishedAt).getTime() - new Date(a.meta.publishedAt).getTime();
    });
} 