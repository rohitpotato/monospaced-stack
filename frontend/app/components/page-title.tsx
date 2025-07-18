"use client";
import AnimatedText from "./AnimatedText";
import { LogoIcon } from "./icons";

const PageTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-6">
      <LogoIcon className="flex-shrink-0" />
      <div>
        <h1
          className="text-3xl font-bold tracking-wider"
          style={{ color: "var(--color-text-primary)" }}
        >
          <AnimatedText text={title} />
        </h1>
        <p style={{ color: "var(--color-text-secondary)" }}>
          Notes about web dev, infrastructure, and some other stuff.
        </p>
      </div>
    </div>
  );
};

export default PageTitle;
