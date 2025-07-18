"use client";
import React from "react";
import { FOOTER_CATEGORIES } from "../../constants";
import { FooterLink } from "../../types";

const LinkItem: React.FC<{ link: FooterLink; isSubLink?: boolean }> = ({
  link,
  isSubLink = false,
}) => {
  const linkClass = isSubLink ? "sub-link pl-4" : "main-link";

  return (
    <li>
      <a href="#" className={`block transition-colors ${linkClass}`}>
        {isSubLink && <span className="mr-2">└</span>}
        {link.title}
      </a>
      {link.subLinks && link.subLinks.length > 0 && (
        <ul className="text-sm mt-2">
          {link.subLinks.map((subLink) => (
            <LinkItem key={subLink.title} link={subLink} isSubLink={true} />
          ))}
        </ul>
      )}
    </li>
  );
};

const Footer: React.FC = () => {
  return (
    <footer
      className="mt-16 border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
            {FOOTER_CATEGORIES.map((category) => (
              <div key={category.title}>
                <h4
                  className="font-bold mb-4 text-sm uppercase tracking-wider"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {category.title}
                </h4>
                <ul className="space-y-3 text-sm">
                  {category.links.map((link) => (
                    <LinkItem key={link.title} link={link} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div
          className="py-8 text-center text-xs border-t"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-text-secondary)",
          }}
        >
          <p className="mb-2">
            &copy; {new Date().getFullYear()} Digital Backyard. All rights
            reserved.
          </p>
          <p>A coding journal</p>
        </div>
      </div>
      <style jsx>{`
        .main-link {
          color: var(--color-text-primary);
          padding: 0.25rem 0;
          display: inline-block;
        }
        .main-link:hover {
          color: var(--color-primary-accent);
        }
        .sub-link {
          color: var(--color-text-secondary);
          padding: 0.25rem 0;
          display: inline-block;
        }
        .sub-link:hover {
          color: var(--color-text-primary);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
