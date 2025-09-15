import React from 'react'
import { cn } from '@/lib/utils'
import Typography from '@/components/typography'
import Window from '@/components/window'

interface MarkdownBlockquoteProps {
    children: React.ReactNode
    className?: string
}

export function MarkdownBlockquote({ children, className, ...props }: MarkdownBlockquoteProps & React.BlockquoteHTMLAttributes<HTMLQuoteElement>) {
    return (
        <Window className={cn('my-6', className)}>
            <Typography
                as="blockquote"
                variant="body"
                color="textMuted"
                className="italic leading-relaxed border-l-4 border-green-500 pl-4 py-2"
                {...props}
            >
                {children}
            </Typography>
        </Window>
    )
}
