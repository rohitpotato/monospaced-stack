import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import React from 'react'
import { cn } from '../lib/utils'

const typographyVariants = cva(
  // Base styles
  '',
  {
    variants: {
      variant: {
        // Accessible typography scale following WCAG guidelines
        h1: 'text-4xl font-semibold text-gray-900 leading-tight tracking-tight',
        h2: 'text-3xl font-semibold text-gray-900 leading-tight tracking-tight',
        h3: 'text-2xl font-semibold text-gray-900 leading-snug tracking-tight',
        h4: 'text-xl font-medium text-gray-900 leading-snug tracking-tight',
        h5: 'text-lg font-medium text-gray-900 leading-normal tracking-tight',
        h6: 'text-base font-medium text-gray-900 leading-normal tracking-tight',
        body: 'text-base text-gray-700 leading-relaxed font-normal',
        bodyLarge: 'text-lg text-gray-700 leading-relaxed font-normal',
        small: 'text-sm text-gray-600 leading-normal font-normal',
        code: 'font-mono text-sm bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded',
        label: 'text-sm font-medium text-gray-700 leading-normal',
        caption: 'text-xs text-gray-500 leading-normal font-normal',
      },
      color: {
        primary: 'text-gray-900',
        primaryHover: 'text-gray-700',
        secondary: 'text-gray-600',
        tertiary: 'text-gray-500',
        text: 'text-gray-700',
        textMuted: 'text-gray-600',
        error: 'text-red-600',
        accent: 'text-gray-800',
        orange: 'text-orange-600',
        white: 'text-white',
        black: 'text-black',
      },
      glow: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'body',
      color: 'text',
      glow: false,
    },
  },
)

const variantElementMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  bodyLarge: 'p',
  small: 'span',
  code: 'code',
  label: 'label',
} as const

type TypographyVariant = keyof typeof variantElementMapping
export type TypographyColor = 'primary' | 'primaryHover' | 'secondary' | 'tertiary' | 'text' | 'textMuted' | 'error' | 'accent' | 'white' | 'black'

interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
  VariantProps<typeof typographyVariants> {
  as?: React.ElementType
  variant: TypographyVariant
  color?: TypographyColor
  glow?: boolean
  children: React.ReactNode
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ as, variant, color, glow, className, children, ...props }, ref) => {
    const Component = as || variantElementMapping[variant] || 'div'

    return (
      <Component
        ref={ref}
        className={cn(
          typographyVariants({
            variant,
            color,
            glow,
          }),
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    )
  },
)

Typography.displayName = 'Typography'

export default Typography
