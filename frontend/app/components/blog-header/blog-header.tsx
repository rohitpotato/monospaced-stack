"use client";
import React from "react";
import AnimatedText from "../animated-text/animated-text";
import styles from "./blog-header.module.css";

interface BlogHeaderProps {
  title: string;
  publishedAt: string;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ title, publishedAt }) => {
  return (
    <header>
      <h1
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${styles.title}`}
      >
        <AnimatedText text={title} />
      </h1>
      <div className={`text-sm sm:text-base md:text-lg ${styles.date}`}>
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
