"use client";
import React from "react";
import AnimatedText from "./AnimatedText";

interface BlogHeaderProps {
  title: string;
  publishedAt: string;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ title, publishedAt }) => {
  return (
    <header>
      <h1
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
        style={{ color: "var(--color-text)" }}
      >
        <AnimatedText text={title} />
      </h1>
      <div
        className="text-sm sm:text-base md:text-lg"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {new Date(publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </header>
  );
};

export default BlogHeader;
