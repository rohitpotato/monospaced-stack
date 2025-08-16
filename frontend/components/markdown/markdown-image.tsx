import React from 'react'
import Image from 'next/image'
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
        <div className={cn('my-6 flex justify-center', className)}>
            <div className="relative max-w-full overflow-hidden rounded-lg shadow-md">
                <Image
                    src={src}
                    alt={alt}
                    width={width || 800}
                    height={height || 600}
                    className="w-full h-auto"
                    {...props}
                />
                {alt && (
                    <div className="mt-2 text-center text-sm text-gray-600 italic">
                        {alt}
                    </div>
                )}
            </div>
        </div>
    )
}
