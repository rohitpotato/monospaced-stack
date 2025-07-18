"use client";
import React from "react";
import Link from "next/link";
import AnimatedText from "../animated-text/animated-text";
import { DocumentIcon } from "../icons";
import styles from "./article-card.module.css";

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    description: string;
    date: string;
    link: string;
    Icon?: React.ComponentType<{ className?: string }>;
  };
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { title, description, link, Icon = DocumentIcon } = article;

  return (
    <div className="p-0" style={{ breakInside: "avoid" }}>
      <Link href={link} className={styles.articleLink}>
        <div className="flex flex-col">
          <div className="h-24 flex items-center justify-center mb-6">
            <div className={styles.icon}>
              <Icon className="w-full h-full" />
            </div>
          </div>
          <div className="mb-2">
            <AnimatedText
              text={title}
              className="font-bold text-lg"
              style={{ color: "var(--color-text-primary)" }}
            />
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {description}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
