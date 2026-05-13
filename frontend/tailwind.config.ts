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
        display: ['var(--font-spartan-mb)', 'Spartan MB', 'Alegreya Sans', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Source Code Pro', 'monospace'],
      },
      colors: {
        page: 'var(--color-page-bg)',
        divider: 'var(--color-divider)',
        accent: 'var(--color-ink)',
        accentSoft: 'var(--color-ink-soft)',
        inkMuted: 'var(--color-ink-muted)',
        inkSubtle: 'var(--color-ink-subtle)',
      },
    },
  },
  plugins: [
    typography,
  ],
};

export default config;
