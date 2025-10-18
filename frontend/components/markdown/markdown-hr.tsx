import React from 'react'
import { cn } from '@/lib/utils'

interface MarkdownHrProps {
  className?: string
}

export function MarkdownHr({ className, ...props }: MarkdownHrProps & React.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr className={cn('my-8 border-gray-200', className)} {...props} />
  )
}
