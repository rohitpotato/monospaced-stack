import React from 'react'
import { cn } from '@/lib/utils'
import Window from '@/components/window'
import Typography from '@/components/typography'

interface MarkdownCodeProps {
    children: React.ReactNode
    className?: string
    inline?: boolean
}

export function MarkdownCode({ children, className, inline = false, ...props }: MarkdownCodeProps & React.HTMLAttributes<HTMLElement>) {
    if (inline) {
        return (
            <Typography
                as="code"
                variant="code"
                color="accent"
                className={cn('px-1.5 py-0.5 rounded', className)}
                {...props}
            >
                {children}
            </Typography>
        )
    }

    return (
        <Window>    
            <pre className={cn('overflow-x-auto mb-4', className)} {...props}>
                <Typography
                    as="code"
                    variant="code"
                    color="accent"
                    className="leading-relaxed"
                >
                    {children}
                </Typography>
            </pre>
        </Window>
    )
}
