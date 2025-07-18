"use client";
import React from "react";
import Link from "next/link";
import AnimatedText from "./AnimatedText";
import { DocumentIcon } from "./icons";

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
      <Link
        href={link}
        className="block group p-6 border-b border-r transition-all duration-300"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-background)",
        }}
      >
        <div className="flex flex-col">
          <div className="h-24 flex items-center justify-center mb-6">
            <div
              className="w-16 h-16 transition-all duration-300"
              style={{ color: "var(--color-text-secondary)" }}
            >
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
      <style jsx>{`
        a:hover {
          background-color: var(--color-background-secondary);
          box-shadow: inset 0 0 20px var(--color-primary-shadow);
        }
        a:hover :global(div) {
          color: var(--color-primary-accent-light);
          transform: scale(1.1);
          filter: drop-shadow(0 0 8px var(--color-primary-glow));
        }
      `}</style>
    </div>
  );
};

export default ArticleCard;
