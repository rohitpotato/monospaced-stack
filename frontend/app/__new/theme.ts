// Using a theme object to act like design tokens.

export const colors = {
  primary: 'green-400',
  primaryHover: 'green-200',
  secondary: 'green-300',
  tertiary: 'green-500',
  background: 'black',
  text: 'green-400',
  textMuted: 'green-300',
  border: 'green-500',
  borderMuted: 'green-800',
  error: 'red-500',
  accent: 'red-500',
  white: 'white',
  black: 'black',
  gray: {
    900: 'gray-900',
    800: 'gray-800',
    500: 'gray-500',
  }
};

export const typography = {
  h1: `text-5xl font-bold text-${colors.primary}`,
  h2: `text-3xl font-bold text-${colors.primary}`,
  h3: `text-2xl font-bold text-${colors.primary}`,
  body: `text-xl text-${colors.textMuted} leading-relaxed`,
  bodyLarge: `text-xl text-${colors.text}`,
  small: `text-sm text-${colors.tertiary}`,
  code: `font-mono bg-${colors.background} text-${colors.primary}`
};

export const layout = {
  window: `bg-${colors.background} border-2 border-${colors.border} p-1 shadow-[0_0_15px_rgba(50,255,50,0.5)]`,
  container: `grid grid-cols-1 lg:grid-cols-2 gap-0`
}
