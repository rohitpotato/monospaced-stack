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
    const headings = Array.from(document.querySelectorAll("h1, h2, h3"));
    const extractedSections = headings.map((heading) => ({
      id: heading.id,
      text: heading.textContent || "",
      level: parseInt(heading.tagName[1]),
    }));
    setSections(extractedSections);

    // Set up intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px",
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
      }}
    >
      <div className="h-full overflow-y-auto px-6">
        <ul className="space-y-2 py-6">
          {sections.map((section) => (
            <li
              key={section.id}
              style={{
                paddingLeft: `${(section.level - 1) * 1}rem`,
                color: "var(--color-text-secondary)",
              }}
            >
              <a
                href={`#${section.id}`}
                className="block py-1 text-sm transition-colors duration-200 break-words"
                style={{
                  color:
                    activeSection === section.id
                      ? "var(--color-text)"
                      : "var(--color-text-secondary)",
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
