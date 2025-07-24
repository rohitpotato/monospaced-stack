import React from "react";
import { Metadata } from "next";
import AnimatedText from "../components/animated-text/animated-text";

export const metadata: Metadata = {
  title: "About | Digital Backyard",
  description:
    "About the Digital Backyard - A space for sharing notes about coding, infrastructure and web development.",
};

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <main className="max-w-3xl mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="mb-16 relative">
          <h1
            className="text-5xl font-bold mb-4"
            style={{ color: "var(--color-heading)" }}
          >
            <AnimatedText text="Digital Backyard" />
          </h1>
          <p
            className="text-xl"
            style={{ color: "var(--color-text-secondary)" }}
          >
            A personal space for sharing thoughts and learnings about software
            development.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-16">
          {/* About Section */}
          <section>
            <div
              className="prose prose-lg"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <p className="text-lg leading-relaxed">
                Welcome to my digital garden—a space where I document my journey
                through software development, infrastructure, and web
                technologies. Here, you&apos;ll find my thoughts, learnings, and
                experiences as I explore the ever-evolving tech landscape.
              </p>
            </div>
          </section>

          {/* Topics Section */}
          <section>
            <h2
              className="text-2xl font-semibold mb-6"
              style={{ color: "var(--color-heading)" }}
            >
              What I Write About
            </h2>
            <div className="space-y-6">
              <div
                className="p-6 rounded-lg"
                style={{ backgroundColor: "var(--color-background-secondary)" }}
              >
                <div className="flex items-start">
                  <span className="text-3xl mr-4" role="img" aria-label="code">
                    👨‍💻
                  </span>
                  <div>
                    <h3
                      className="text-lg font-medium mb-2"
                      style={{ color: "var(--color-heading)" }}
                    >
                      Software Development
                    </h3>
                    <p style={{ color: "var(--color-text-secondary)" }}>
                      Deep dives into coding practices, design patterns, and
                      problem-solving approaches.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="p-6 rounded-lg"
                style={{ backgroundColor: "var(--color-background-secondary)" }}
              >
                <div className="flex items-start">
                  <span
                    className="text-3xl mr-4"
                    role="img"
                    aria-label="infrastructure"
                  >
                    🏗️
                  </span>
                  <div>
                    <h3
                      className="text-lg font-medium mb-2"
                      style={{ color: "var(--color-heading)" }}
                    >
                      Infrastructure & DevOps
                    </h3>
                    <p style={{ color: "var(--color-text-secondary)" }}>
                      Exploring system design, cloud infrastructure, and
                      deployment strategies.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="p-6 rounded-lg"
                style={{ backgroundColor: "var(--color-background-secondary)" }}
              >
                <div className="flex items-start">
                  <span className="text-3xl mr-4" role="img" aria-label="web">
                    🌐
                  </span>
                  <div>
                    <h3
                      className="text-lg font-medium mb-2"
                      style={{ color: "var(--color-heading)" }}
                    >
                      Web Development
                    </h3>
                    <p style={{ color: "var(--color-text-secondary)" }}>
                      Insights into modern web technologies, performance
                      optimization, and user experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Connect Section */}
          <section className="pt-8">
            <h2
              className="text-2xl font-semibold mb-6"
              style={{ color: "var(--color-heading)" }}
            >
              Let&apos;s Connect
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://x.com/rohitpotato"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center p-4 rounded-lg transition-colors duration-200"
                style={{
                  backgroundColor: "var(--color-background-secondary)",
                  color: "var(--color-text-primary)",
                }}
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="opacity-90 group-hover:opacity-100">
                  Follow on Twitter
                </span>
              </a>

              <a
                href="https://github.com/rohitpotato"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center p-4 rounded-lg transition-colors duration-200"
                style={{
                  backgroundColor: "var(--color-background-secondary)",
                  color: "var(--color-text-primary)",
                }}
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span className="opacity-90 group-hover:opacity-100">
                  View GitHub Profile
                </span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
