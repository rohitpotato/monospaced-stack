import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

const TypographyVariants = cva('', {
    variants: {
        variant: {
            link: 'text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-500 transition-colors duration-200',
            'link-highlight': 'text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-500 transition-colors duration-200',
            p: 'text-gray-700 leading-relaxed',
            heading: 'text-2xl font-bold text-gray-900',
            'heading-small': 'text-base font-bold text-gray-900',
            'heading-large': 'text-4xl font-bold text-gray-900',
            'heading-medium': 'text-3xl font-bold text-gray-900',
        },
    },
    defaultVariants: {
        variant: 'p'
    }
})

const Typography = ({ children, variant, className }: { children: React.ReactNode, variant: VariantProps<typeof TypographyVariants>['variant'], className?: React.HTMLAttributes<HTMLParagraphElement>['className'] }) => {
    const style = TypographyVariants({ variant })

    return <p className={cn(style, className)}>
        {children}
    </p>
}

export default Typography