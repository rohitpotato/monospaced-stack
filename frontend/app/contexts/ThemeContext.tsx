"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";

// --- Color Utility Functions ---

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const rgbToHsl = (
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0;
  let s;
  const l = (max + min) / 2;
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h, s, l };
};

const hslToHex = (h: number, s: number, l: number): string => {
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const getContrastYIQ = (hexcolor: string): string => {
  const rgb = hexToRgb(hexcolor);
  if (!rgb) return "#1a201c";
  const yiq = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return yiq >= 128 ? "#111827" : "#FFFFFF";
};

const adjustHslLightness = (hex: string, amount: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl.l = Math.max(0, Math.min(1, hsl.l + amount));
  return hslToHex(hsl.h, hsl.s, hsl.l);
};

interface ThemeContextType {
  baseColor: string;
  setBaseColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [baseColor, setBaseColor] = useState("#05FFCD"); // Initial theme color

  useEffect(() => {
    const root = document.documentElement;
    const rgb = hexToRgb(baseColor);
    if (!rgb) return;

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const { h, s, l } = hsl;
    const isLight = l > 0.6;

    // Calculate hover accent color based on theme mode
    const hoverAccentColor = isLight
      ? adjustHslLightness(baseColor, -0.2)
      : adjustHslLightness(baseColor, 0.2);

    // Calculate dot pattern color with much better contrast
    const dotPatternColor = isLight
      ? hslToHex(h, Math.min(s * 1.5, 1), 0.5) // Much darker dots for light theme
      : hslToHex(h, Math.min(s * 1.2, 1), 0.5); // Lighter dots for dark theme

    const dotPatternRgb = hexToRgb(dotPatternColor) || rgb;
    const dotPatternOpacity = isLight ? 0.15 : 0.25; // Adjusted opacity for better visibility

    const theme: { [key: string]: string } = {
      "--color-primary-accent": baseColor,
      "--color-primary-accent-hover": hoverAccentColor,
      "--color-primary-accent-dark": adjustHslLightness(baseColor, -0.15),
      "--color-primary-glow": `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${
        isLight ? 0.3 : 0.5
      })`,
      "--color-primary-shadow": `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${
        isLight ? 0.2 : 0.3
      })`,
      "--color-text-on-accent": getContrastYIQ(baseColor),
      "--color-dot-pattern": `rgba(${dotPatternRgb.r}, ${dotPatternRgb.g}, ${dotPatternRgb.b}, ${dotPatternOpacity})`,
    };

    if (isLight) {
      // Generate a light theme from the base color's hue
      Object.assign(theme, {
        "--color-background": hslToHex(h, s * 0.2, 0.98),
        "--color-background-secondary": hslToHex(h, s * 0.2, 0.94),
        "--color-background-hover": hslToHex(h, s * 0.3, 0.9), // Slightly darker on hover
        "--color-border": hslToHex(h, s * 0.2, 0.88),
        "--color-text-primary": hslToHex(h, s * 0.5, 0.1),
        "--color-text-secondary": hslToHex(h, s * 0.3, 0.3),
        "--color-text-hover": hslToHex(h, s * 0.5, 0.05), // Darker text on hover
        "--color-error": "#c53030",
      });
    } else {
      // Generate a dark theme from the base color's hue
      Object.assign(theme, {
        "--color-background": hslToHex(h, s * 0.2, 0.1),
        "--color-background-secondary": hslToHex(h, s * 0.2, 0.15),
        "--color-background-hover": hslToHex(h, s * 0.3, 0.2), // Slightly lighter on hover
        "--color-border": hslToHex(h, s * 0.2, 0.22),
        "--color-text-primary": hslToHex(h, s * 0.1, 0.92),
        "--color-text-secondary": hslToHex(h, s * 0.1, 0.65),
        "--color-text-hover": hslToHex(h, s * 0.2, 0.95), // Lighter text on hover
        "--color-error": "#fca5a5",
      });
    }

    for (const [key, value] of Object.entries(theme)) {
      root.style.setProperty(key, value);
    }
  }, [baseColor]);

  const value = useMemo(() => ({ baseColor, setBaseColor }), [baseColor]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
