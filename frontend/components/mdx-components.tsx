/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image'

interface CustomHeadingProps {
  children: React.ReactNode
  level: number
}

function CustomHeading({ children, level }: CustomHeadingProps) {
  const text = children?.toString() || ""
  const id = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  const props = { id, className: "scroll-mt-24" }

  switch (level) {
    case 1:
      return <h1 {...props}>{children}</h1>
    case 2:
      return <h2 {...props}>{children}</h2>
    case 3:
      return <h3 {...props}>{children}</h3>
    case 4:
      return <h4 {...props}>{children}</h4>
    case 5:
      return <h5 {...props}>{children}</h5>
    case 6:
      return <h6 {...props}>{children}</h6>
    default:
      return <h2 {...props}>{children}</h2>
  }
}

// Custom Image component for MDX
function CustomImage({ src, alt, width = 800, height = 400, ...props }: any) {
  return (
    <div className="my-8 flex justify-center">
      <Image
        src={src}
        alt={alt || 'Blog post image'}
        width={width}
        height={height}
        className="rounded-lg shadow-lg max-w-full h-auto"
        priority={props.priority}
        {...props}
      />
    </div>
  )
}

export const mdxComponents = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  h1: (props: any) => <CustomHeading {...props} level={1} />,
  h2: (props: any) => <CustomHeading {...props} level={2} />,
  h3: (props: any) => <CustomHeading {...props} level={3} />,
  h4: (props: any) => <CustomHeading {...props} level={4} />,
  h5: (props: any) => <CustomHeading {...props} level={5} />,
  h6: (props: any) => <CustomHeading {...props} level={6} />,
  code: ({ children, className, ...props }: any) => {
    const isInline = !className?.includes('language-')
    if (isInline) {
      return <code className="bg-slate-800 text-emerald-400 px-2 py-1 rounded text-sm font-mono" {...props}>{children}</code>
    }
    return <code className="bg-transparent p-0 text-slate-300" {...props}>{children}</code>
  },
  pre: ({ children, ...props }: any) => (
    <pre className="bg-slate-900 border border-slate-800 rounded-lg p-4 mb-6 overflow-x-auto" {...props}>
      {children}
    </pre>
  ),
  a: ({ children, href, ...props }: any) => (
    <a href={href} className="text-emerald-400 hover:text-blue-400 transition-colors" {...props}>
      {children}
    </a>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="border-l-4 border-emerald-400 pl-4 italic text-slate-400 mb-6" {...props}>
      {children}
    </blockquote>
  ),
  strong: ({ children, ...props }: any) => (
    <strong className="text-slate-200 font-semibold" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: any) => (
    <em className="text-slate-400" {...props}>
      {children}
    </em>
  ),
  img: CustomImage,
  Image: CustomImage,
}
