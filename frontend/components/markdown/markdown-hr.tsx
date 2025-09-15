import React from 'react'
import Window from '@/components/window'
import { cn } from '@/lib/utils'

interface MarkdownHrProps {
  className?: string
}

export function MarkdownHr({ className, ...props }: MarkdownHrProps & React.HTMLAttributes<HTMLHRElement>) {
  return (
    <Window className={cn('my-8', className)}>
      <hr className="border-green-500 w-full" {...props} />
    </Window>
  )
}
