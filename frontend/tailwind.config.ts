import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-alegreya-sans)', 'Alegreya Sans', 'system-ui', 'sans-serif'],
        body: ['var(--font-alegreya-sans)', 'Alegreya Sans', 'system-ui', 'sans-serif'],
        display: ['var(--font-display-serif)', 'Playfair Display', 'Georgia', 'serif'],
        mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Source Code Pro', 'monospace'],
      },
      colors: {
        page: 'var(--color-page-bg)',
        surface: 'var(--color-surface)',
        surfaceElevated: 'var(--color-surface-elevated)',
        divider: 'var(--color-divider)',
        accent: 'var(--color-ink)',
        accentCta: 'var(--color-accent-cta)',
        accentPurpleSoft: 'var(--color-accent-purple-soft)',
        accentPurpleMuted: 'var(--color-accent-purple-muted)',
        inkBody: 'var(--color-ink-body)',
        inkMuted: 'var(--color-ink-muted)',
        inkSubtle: 'var(--color-ink-subtle)',
        readingInk: 'var(--color-reading-ink)',
      },
      maxWidth: {
        content: 'var(--layout-content-max)',
        page: 'var(--layout-page-max)',
      },
    },
  },
  plugins: [
    typography,
  ],
};

export default config;
