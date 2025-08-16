import React from 'react'
import { cn } from '@/lib/utils'

interface MarkdownBlockquoteProps {
    children: React.ReactNode
    className?: string
}

export function MarkdownBlockquote({ children, className, ...props }: MarkdownBlockquoteProps & React.BlockquoteHTMLAttributes<HTMLQuoteElement>) {
    return (
        <blockquote className={cn(
            'border-l-4 border-blue-200 pl-4 py-2 my-6 bg-blue-50 rounded-r-lg',
            className
        )} {...props}>
            <p className="text-gray-700 italic leading-relaxed">
                {children}
            </p>
        </blockquote>
    )
}
