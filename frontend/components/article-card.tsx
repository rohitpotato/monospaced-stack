import React from 'react';
import Link from 'next/link';
import type { Article } from '../app/__new/types';
import Typography from './typography';
import { colors } from '../app/__new/theme';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link href={`/thoughts/${article.slug}`} className={`block mb-2 p-2 border-2 border-transparent hover:border-green-500 focus:border-green-500 active:bg-green-500 active:text-black group`}>
        <div className="flex items-start">
            <Typography variant="bodyLarge" color="tertiary" className="mr-2 font-bold flex-shrink-0">&gt;</Typography>
            <div>
                <Typography variant="h3" className="group-active:text-black">{article.title}</Typography>
                <Typography variant="body" color="textMuted" className="group-active:text-gray-900">{article.description}</Typography>
                <Typography variant="small" className="mt-1 group-active:text-gray-800">{article.readingTime} min read</Typography>
            </div>
        </div>
    </Link>
  );
};

export default ArticleCard;
