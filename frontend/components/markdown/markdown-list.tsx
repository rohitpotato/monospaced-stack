import React from 'react'
import { cn } from '@/lib/utils'

interface MarkdownListProps {
    children: React.ReactNode
    className?: string
    ordered?: boolean
}

export function MarkdownList({ children, className, ordered = false, ...props }: MarkdownListProps & React.HTMLAttributes<HTMLElement>) {
    const Component = ordered ? 'ol' : 'ul'

    return (
        <Component className={cn(
            'mb-4 space-y-2',
            ordered
                ? 'list-decimal list-inside text-gray-700'
                : 'list-disc list-inside text-gray-700',
            className
        )} {...props}>
            {children}
        </Component>
    )
}

interface MarkdownListItemProps {
    children: React.ReactNode
    className?: string
}

export function MarkdownListItem({ children, className, ...props }: MarkdownListItemProps & React.LiHTMLAttributes<HTMLLIElement>) {
    return (
        <li className={cn('leading-relaxed', className)} {...props}>
            {children}
        </li>
    )
}
