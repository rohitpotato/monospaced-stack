import { cache } from 'react';
import { getAllPosts } from './mdx';

export const getPostsFromCache = cache(async () => {
    return await getAllPosts();
}); 