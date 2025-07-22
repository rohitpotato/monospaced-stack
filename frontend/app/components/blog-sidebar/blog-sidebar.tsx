"use client";
import React, { useEffect, useState } from "react";

interface Section {
  id: string;
  text: string;
  level: number;
}

const BlogSidebar: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    // Find all headings in the blog content
    const headings = Array.from(
      document.querySelectorAll("article h1, article h2, article h3")
    );
    const extractedSections = headings.map((heading) => {
      // Generate an ID if none exists
      if (!heading.id) {
        heading.id =
          heading.textContent?.toLowerCase().replace(/\s+/g, "-") || "";
      }
      return {
        id: heading.id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName[1]),
      };
    });
    setSections(extractedSections);

    // Set up intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        // Get all entries that are currently intersecting
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          // Get the first visible heading
          const firstVisible = visibleEntries[0];
          setActiveSection(firstVisible.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -35% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="hidden lg:block fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 overflow-hidden"
      style={{
        borderRight: "1px solid var(--color-border)",
        backgroundColor: "var(--color-background)",
      }}
    >
      <div className="h-full overflow-y-auto px-6">
        <ul className="space-y-2 py-6">
          {sections.map((section) => (
            <li
              key={section.id}
              style={{
                paddingLeft: `${(section.level - 1) * 1}rem`,
              }}
            >
              <a
                href={`#${section.id}`}
                className={`block py-1 text-sm transition-colors duration-200 break-words hover:text-[var(--color-text)] ${
                  activeSection === section.id
                    ? "text-[var(--color-text)] font-medium"
                    : "text-[var(--color-text-secondary)]"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(section.id);
                  if (element) {
                    const offset = 80; // Account for fixed header
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition =
                      elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                {section.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: var(--color-text-secondary) transparent;
        }
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: var(--color-text-secondary);
          border-radius: 2px;
        }
      `}</style>
    </nav>
  );
};

export default BlogSidebar;
