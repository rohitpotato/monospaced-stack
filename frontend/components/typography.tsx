import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const typographyVariants = cva(
  // Base styles
  '',
  {
    variants: {
      variant: {
        // Proper typography scale following UI design patterns
        h1: 'text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight',
        h2: 'text-xl sm:text-2xl md:text-3xl font-bold leading-tight tracking-tight', 
        h3: 'text-lg sm:text-xl md:text-2xl font-semibold leading-snug tracking-tight',
        h4: 'text-base sm:text-lg md:text-xl font-semibold leading-snug tracking-tight',
        h5: 'text-sm sm:text-base md:text-lg font-semibold leading-normal tracking-tight',
        h6: 'text-xs sm:text-sm md:text-base font-semibold leading-normal tracking-tight',
        body: 'text-sm sm:text-base leading-relaxed',
        bodyLarge: 'text-base sm:text-lg leading-relaxed',
        small: 'text-xs sm:text-sm leading-normal',
        code: 'font-mono text-xs sm:text-sm bg-background px-1 py-0.5 rounded',
        label: 'text-xs sm:text-sm font-medium leading-normal',
      },
      color: {
        primary: 'text-primary',
        primaryHover: 'text-primary-hover',
        secondary: 'text-secondary', 
        tertiary: 'text-tertiary',
        text: 'text-text',
        textMuted: 'text-text-muted',
        error: 'text-error',
        accent: 'text-accent',
        white: 'text-white',
        black: 'text-black',
      },
      glow: {
        true: 'text-glow-green',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'body',
      color: 'textMuted',
      glow: false,
    },
  }
);

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
} as const;

type TypographyVariant = keyof typeof variantElementMapping;
type TypographyColor = 'primary' | 'primaryHover' | 'secondary' | 'tertiary' | 'text' | 'textMuted' | 'error' | 'accent' | 'white' | 'black';

interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
  variant: TypographyVariant;
  color?: TypographyColor;
  glow?: boolean;
  children: React.ReactNode;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ as, variant, color, glow, className, children, ...props }, ref) => {
    const Component = as || variantElementMapping[variant] || 'div';
    
    return (
      <Component
        ref={ref}
        className={cn(
          typographyVariants({ 
            variant, 
            color, 
            glow
          }), 
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';

export default Typography;