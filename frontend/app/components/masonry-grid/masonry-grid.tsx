"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./masonry-grid.module.css";

interface MasonryGridProps {
  children: React.ReactNode[];
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ children }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [spans, setSpans] = useState<number[]>([]);

  useEffect(() => {
    const calculateSpans = () => {
      if (!gridRef.current) return;

      const items = Array.from(gridRef.current.children);
      const newSpans = items.map((item) => {
        const height = item.getBoundingClientRect().height;
        // Calculate span based on height (1 span = roughly 20px)
        return Math.ceil(height / 20);
      });

      setSpans(newSpans);
    };

    // Calculate initial spans
    calculateSpans();

    // Recalculate on window resize
    const resizeObserver = new ResizeObserver(calculateSpans);
    if (gridRef.current) {
      resizeObserver.observe(gridRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [children]);

  return (
    <div className={styles.masonryGrid} ref={gridRef}>
      {React.Children.map(children, (child, index) => (
        <div
          className={styles.masonryItem}
          style={{
            gridRowEnd: spans[index] ? `span ${spans[index]}` : undefined,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;
