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
    <figure className={cn('my-8 mx-auto max-w-[52rem]', className)}>
      <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border border-divider bg-white/55">
        <Image
          src={src}
          alt={alt}
          width={imageWidth}
          height={imageHeight}
          className="h-full w-full object-contain"
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 90vw, 52rem"
          {...props}
        />
      </div>

      {alt && (
        <figcaption className="mt-3 text-center text-sm italic text-[var(--color-reading-ink-soft)]">
          {alt}
        </figcaption>
      )}
    </figure>
  )
}
