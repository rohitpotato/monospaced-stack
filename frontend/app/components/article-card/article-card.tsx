"use client";
import React from "react";
import Link from "next/link";
import { Article } from "@/app/types";
import styles from "./article-card.module.css";
import { mdxComponents } from "@/app/lib/mdx-components";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const Icon = mdxComponents[article.icon as string];

  return (
    <Link href={article.link} className={styles.card}>
      {Icon ? (
        <div className={styles.icon}>{<Icon height={40} width={40} />}</div>
      ) : null}
      <h2 className={styles.title}>{article.title}</h2>
      <p className={styles.description}>{article.description}</p>
      <time className={styles.date}>
        {new Date(article.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
    </Link>
  );
};

export default ArticleCard;
