import React from 'react'
import { cn } from '@/lib/utils'

interface MarkdownHrProps {
    className?: string
}

export function MarkdownHr({ className, ...props }: MarkdownHrProps & React.HTMLAttributes<HTMLHRElement>) {
    return (
        <hr className={cn('border-gray-200 my-8', className)} {...props} />
    )
}
