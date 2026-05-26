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
  const imageWidth = width || 1600
  const imageHeight = height || 1000

  return (
    <figure className={cn('my-8', className)}>
      <div
        className="relative mx-auto w-full max-w-full overflow-hidden rounded-lg bg-page ring-1 ring-[var(--color-divider)]"
        style={{ aspectRatio: `${imageWidth} / ${imageHeight}` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 100vw, 42rem"
          {...props}
        />
      </div>

      {alt && (
        <figcaption className="editorial-meta mt-2 text-center text-[0.875rem]">
          {alt}
        </figcaption>
      )}
    </figure>
  )
}
