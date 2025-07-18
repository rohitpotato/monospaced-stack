"use client";
import React from "react";

interface IconProps {
  className?: string;
}

export const LogoIcon: React.FC<IconProps> = ({ className = "" }) => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 68 68"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop
          offset="0%"
          style={{ stopColor: "var(--color-primary-accent-light)" }}
        />
        <stop
          offset="100%"
          style={{ stopColor: "var(--color-primary-accent)" }}
        />
      </linearGradient>
    </defs>
    <path
      d="M34 60.5C23.9 60.5 15.6 55.4 10.5 47.4C5.4 39.4 4 29.5 6.6 20.3C9.2 11.1 15.6 3.8 24.5 1.7C33.4 -0.4 42.9 2.7 49.6 9.4C56.3 16.1 59.4 25.6 57.3 34.5C55.2 43.4 47.9 49.8 38.7 52.4C40.6 47.5 41 42.4 40 37.5C39.1 32.8 36.8 28.5 33.5 25.2C30.2 21.9 25.9 19.6 21.2 18.6C16.3 17.7 11.2 18.2 6.6 20.3M24.5 1.7L25.8 5.4M49.6 9.4L46.8 12.2M34 60.5L34 66M6.6 20.3L1 21.6M57.3 34.5L64 34.5"
      stroke="url(#logoGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M34 34L26 34M34 34L42 34M34 34L34 26M34 34L34 42M34 34L28 28M34 34L40 40M34 34L40 28M34 34L28 40"
      stroke="url(#logoGradient)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M60.6 21.1C64.9 25.4 67.4 31.4 67.5 37.7C67.6 44 65.2 50.1 60.9 54.8C56.6 59.5 50.7 62.4 44.4 62.8C38.1 63.2 31.9 61.1 27.2 57.1"
      stroke="url(#logoGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DocumentIcon: React.FC<IconProps> = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

export const JuiceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    {...props}
  >
    <path d="M8 2h8v2H8z"></path>
    <path d="M9 4v16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V4"></path>
    <path d="M16 4h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2"></path>
    <path d="M7 4H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2"></path>
  </svg>
);

export const Css3DIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    {...props}
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

export const AnimateSphereIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
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
    {...props}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <ellipse cx="12" cy="12" rx="4" ry="10"></ellipse>
    <path d="M12 2a10 10 0 0 0-4.47 1.25M12 22a10 10 0 0 1-4.47-1.25"></path>
    <path d="M20.75 16.43A10 10 0 0 0 22 12"></path>
    <path d="M3.25 16.43A10 10 0 0 1 2 12"></path>
  </svg>
);

export const WriteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    {...props}
  >
    <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
    <path d="M18 13l-1.5-7.5L2 4l3 3L2 14l6.5-1.5L8 22l3.5-1.5L13 22l1.5-3.5L18 17l-3-3z"></path>
  </svg>
);

export const ScrollDrawIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
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
    {...props}
  >
    <rect x="5" y="3" width="14" height="18" rx="2"></rect>
    <path d="M9 7h6"></path>
    <path d="M9 11h6"></path>
    <path d="M9 15h4"></path>
    <path d="M12 21a2 2 0 0 1-2-2V7a2 2 0 1 1 4 0v12a2 2 0 0 1-2 2z"></path>
  </svg>
);

export const ShadersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    {...props}
  >
    <path d="M5 3v18h18"></path>
    <path d="m19 9-4 4-4-4-4 4-4-4"></path>
    <path d="m5 21 4-4 4 4 4-4 4 4"></path>
  </svg>
);

export const CameraIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    {...props}
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

export const BrowserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    {...props}
  >
    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
    <path d="M2 10h20"></path>
    <path d="M6 6h.01"></path>
    <path d="M10 6h.01"></path>
    <path d="M14 6h.01"></path>
  </svg>
);

export const TocIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    {...props}
  >
    <path d="M4 6h16"></path>
    <path d="M4 10h16"></path>
    <path d="M4 14h16"></path>
    <path d="M4 18h16"></path>
  </svg>
);

export const UserUiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    {...props}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    <polyline points="17 11 19 13 23 9"></polyline>
  </svg>
);

export const BlendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    {...props}
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

export const ObserverIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
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
    {...props}
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

export const NewsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    {...props}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

export const PersonalizationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
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
    {...props}
  >
    <path d="M12 2a5 5 0 0 0-5 5c0 1.5.7 2.8 1.7 3.7L3 15.2V21h18v-5.8l-5.7-4.5C16.3 9.8 17 8.5 17 7a5 5 0 0 0-5-5z"></path>
  </svg>
);

export const ScrollPercentIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
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
    {...props}
  >
    <path d="M12 3v18"></path>
    <path d="M16 7.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 1 1 9 0z"></path>
    <path d="M16 16.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 1 1 9 0z"></path>
  </svg>
);
