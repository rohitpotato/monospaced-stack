import React from 'react'
import { cn } from '@/lib/utils'

interface MarkdownCodeProps {
    children: React.ReactNode
    className?: string
    inline?: boolean
}

export function MarkdownCode({ children, className, inline = false, ...props }: MarkdownCodeProps & React.HTMLAttributes<HTMLElement>) {
    if (inline) {
        return (
            <code className={cn(
                'bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono',
                className
            )} {...props}>
                {children}
            </code>
        )
    }

    return (
        <pre className={cn(
            'bg-[#FFEFBA] border border-gray-200 rounded-lg p-4 overflow-x-auto mb-4',
            className
        )} {...props}>
            <code className="text-sm font-mono text-gray-800 leading-relaxed">
                {children}
            </code>
        </pre>
    )
}
