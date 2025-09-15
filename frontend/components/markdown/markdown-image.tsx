import React from 'react'
import Image from 'next/image'
import { PrinterWrapper } from '@/components/printer-wrapper'

interface MarkdownImageProps {
    src: string
    alt: string
    className?: string
    width?: number
    height?: number
}

export function MarkdownImage({ src, alt, className, width, height, ...props }: MarkdownImageProps & React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <PrinterWrapper 
            className={className}
            windowTitle="IMAGE_PRINTER.exe"
            showProgress={true}
            animationDuration={2500}
            steps={50}
        >
            <Image
                src={src}
                alt={alt}
                width={width || 800}
                height={height || 600}
                className="w-full h-auto max-w-full border border-green-500/30"
                style={{ 
                    height: 'auto',
                    maxWidth: '100%'
                }}
                {...props}
            />
            
            {alt && (
                <div className="mt-3 text-center text-sm text-green-400 italic font-mono bg-black/50 border border-green-500/30 p-2">
                    {alt}
                </div>
            )}
        </PrinterWrapper>
    )
}
