"use client";
import React from "react";

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

export const Document: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      fill: "var(--color-primary-accent)",
      transition: "fill 0.3s ease",
      minWidth: size,
      minHeight: size,
    }}
    {...rest}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

export const Juice: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      fill: "var(--color-primary-accent)",
      transition: "fill 0.3s ease",
      minWidth: size,
      minHeight: size,
    }}
    {...rest}
  >
    <path d="M8 2h8v2H8z"></path>
    <path d="M9 4v16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V4"></path>
    <path d="M16 4h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2"></path>
    <path d="M7 4H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2"></path>
  </svg>
);

export const Css3D: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      fill: "var(--color-primary-accent)",
      transition: "fill 0.3s ease",
      minWidth: size,
      minHeight: size,
    }}
    {...rest}
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

export const AnimateSphere: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      fill: "var(--color-primary-accent)",
      transition: "fill 0.3s ease",
      minWidth: size,
      minHeight: size,
    }}
    {...rest}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <ellipse cx="12" cy="12" rx="4" ry="10"></ellipse>
    <path d="M12 2a10 10 0 0 0-4.47 1.25M12 22a10 10 0 0 1-4.47-1.25"></path>
    <path d="M20.75 16.43A10 10 0 0 0 22 12"></path>
    <path d="M3.25 16.43A10 10 0 0 1 2 12"></path>
  </svg>
);

export const Write: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      fill: "var(--color-primary-accent)",
      transition: "fill 0.3s ease",
      minWidth: size,
      minHeight: size,
    }}
    {...rest}
  >
    <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
    <path d="M18 13l-1.5-7.5L2 4l3 3L2 14l6.5-1.5L8 22l3.5-1.5L13 22l1.5-3.5L18 17l-3-3z"></path>
  </svg>
);

export const ScrollDraw: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      fill: "var(--color-primary-accent)",
      transition: "fill 0.3s ease",
      minWidth: size,
      minHeight: size,
    }}
    {...rest}
  >
    <rect x="5" y="3" width="14" height="18" rx="2"></rect>
    <path d="M9 7h6"></path>
    <path d="M9 11h6"></path>
    <path d="M9 15h4"></path>
    <path d="M12 21a2 2 0 0 1-2-2V7a2 2 0 1 1 4 0v12a2 2 0 0 1-2 2z"></path>
  </svg>
);

export const Shaders: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      fill: "var(--color-primary-accent)",
      transition: "fill 0.3s ease",
      minWidth: size,
      minHeight: size,
    }}
    {...rest}
  >
    <path d="M5 3v18h18"></path>
    <path d="m19 9-4 4-4-4-4 4-4-4"></path>
    <path d="m5 21 4-4 4 4 4-4 4 4"></path>
  </svg>
);

export const Camera: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      fill: "var(--color-primary-accent)",
      transition: "fill 0.3s ease",
      minWidth: size,
      minHeight: size,
    }}
    {...rest}
  >
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2"></path>
    <path d="M12 20v2"></path>
    <path d="m4.93 4.93 1.41 1.41"></path>
    <path d="m17.66 17.66 1.41 1.41"></path>
    <path d="M2 12h2"></path>
    <path d="M20 12h2"></path>
    <path d="m4.93 19.07 1.41-1.41"></path>
    <path d="m17.66 6.34 1.41-1.41"></path>
  </svg>
);

export const Browser: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      fill: "var(--color-primary-accent)",
      transition: "fill 0.3s ease",
      minWidth: size,
      minHeight: size,
    }}
    {...rest}
  >
    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
    <path d="M2 10h20"></path>
    <path d="M6 6h.01"></path>
    <path d="M10 6h.01"></path>
    <path d="M14 6h.01"></path>
  </svg>
);

export const Toc: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      fill: "var(--color-primary-accent)",
      transition: "fill 0.3s ease",
      minWidth: size,
      minHeight: size,
    }}
    {...rest}
  >
    <path d="M4 6h16"></path>
    <path d="M4 10h16"></path>
    <path d="M4 14h16"></path>
    <path d="M4 18h16"></path>
  </svg>
);

export const UserUi: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      fill: "var(--color-primary-accent)",
      transition: "fill 0.3s ease",
      minWidth: size,
      minHeight: size,
    }}
    {...rest}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    <polyline points="17 11 19 13 23 9"></polyline>
  </svg>
);

export const Blend: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      fill: "var(--color-primary-accent)",
      transition: "fill 0.3s ease",
      minWidth: size,
      minHeight: size,
    }}
    {...rest}
  >
    <circle
      cx="12"
      cy="12"
      r="7.5"
      fill="currentColor"
      fillOpacity="0.5"
    ></circle>
    <circle
      cx="16"
      cy="12"
      r="7.5"
      fill="currentColor"
      fillOpacity="0.5"
    ></circle>
  </svg>
);

export const Observer: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      fill: "var(--color-primary-accent)",
      transition: "fill 0.3s ease",
      minWidth: size,
      minHeight: size,
    }}
    {...rest}
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

export const News: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      fill: "var(--color-primary-accent)",
      transition: "fill 0.3s ease",
      minWidth: size,
      minHeight: size,
    }}
    {...rest}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

export const Personalization: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      fill: "var(--color-primary-accent)",
      transition: "fill 0.3s ease",
      minWidth: size,
      minHeight: size,
    }}
    {...rest}
  >
    <path d="M12 2a5 5 0 0 0-5 5c0 1.5.7 2.8 1.7 3.7L3 15.2V21h18v-5.8l-5.7-4.5C16.3 9.8 17 8.5 17 7a5 5 0 0 0-5-5z"></path>
  </svg>
);

export const ScrollPercent: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      fill: "var(--color-primary-accent)",
      transition: "fill 0.3s ease",
      minWidth: size,
      minHeight: size,
    }}
    {...rest}
  >
    <path d="M12 3v18"></path>
    <path d="M16 7.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 1 1 9 0z"></path>
    <path d="M16 16.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 1 1 9 0z"></path>
  </svg>
);
