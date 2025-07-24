"use client";
import React from "react";
import ColorPicker from "../color-picker/color-picker";
import Link from "next/link";
import StatsIcon from "@/app/_icons/stats";

const Header: React.FC = () => {
  return (
    <header
      className="px-4 sm:px-6 md:px-8 py-4 sticky top-0 bg-background z-50 h-16 border-b"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-background)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="flex justify-between items-center text-sm"
          style={{
            color: "var(--color-text-secondary)",
          }}
        >
          <Link href="/">DIGITAL BACKYARD</Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              target="_blank"
              href="https://analytics.rohitpotato.xyz/share/hngHuG0JCGdsYDU3/rohitpotato.xyz"
            >
              <StatsIcon />
            </a>
            <a
              href="/api/rss"
              target="_blank"
              className="transition-colors px-2 py-1"
              style={{ color: "var(--color-text-secondary)" }}
            >
              RSS
            </a>
            <Link
              href="/about"
              className="transition-colors px-2 py-1"
              style={{ color: "var(--color-text-secondary)" }}
            >
              ABOUT
            </Link>
            <ColorPicker />
          </div>
        </div>
      </div>
      <style jsx>{`
        .themed-button {
          background: linear-gradient(
            to right,
            var(--color-primary-accent),
            var(--color-primary-accent-light)
          );
          color: var(--color-text-on-accent);
        }
        .themed-button:not(:disabled) {
          box-shadow: 0 0 15px var(--color-primary-glow);
        }
        .themed-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px var(--color-primary-shadow);
        }
        .themed-button:disabled {
          box-shadow: none;
        }
        a:hover {
          color: var(--color-text-primary);
        }
      `}</style>
    </header>
  );
};

export default Header;
