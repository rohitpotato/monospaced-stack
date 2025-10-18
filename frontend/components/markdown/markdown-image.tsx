import Image from 'next/image'
import React from 'react'
import { cn } from '@/lib/utils'

interface MarkdownImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}

export function MarkdownImage({ src, alt, className, width, height, ...props }: MarkdownImageProps & React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <div className={cn('my-6', className)}>
      <Image
        src={src}
        alt={alt}
        width={width || 800}
        height={height || 600}
        className="w-full h-auto rounded-lg border border-gray-200"
        style={{
          height: 'auto',
          maxWidth: '100%',
        }}
        {...props}
      />

      {alt && (
        <div className="mt-3 text-center text-sm text-gray-600 italic">
          {alt}
        </div>
      )}
    </div>
  )
}
