import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': "ui-monospace, monospace",
      },
      boxShadow: {
        'image': 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(0, 0, 0) 2px 2px 0px 0px',
        'image-hover': "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(0, 0, 0) 4px 4px 0px 0px",
        'modal': "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(128, 128, 128) 6px 6px 0px 0px",
      },
      colors: {
        link: 'rgb(0, 0, 255)'
      },
      keyframes: {
        'show-media': {
          '0%': {
            opacity: '0',
            visibility: 'hidden',
          },
          '100%': {
            opacity: '1',
            visibility: 'visible',
          }
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
