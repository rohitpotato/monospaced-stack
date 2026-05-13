import React from 'react'
import {
  MarkdownBlockquote,
  MarkdownCode,
  MarkdownEmphasis,
  MarkdownHeading,
  MarkdownHr,
  MarkdownImage,
  MarkdownLink,
  MarkdownList,
  MarkdownListItem,
  MarkdownParagraph,
  MarkdownStrong,
} from './'

export const mdxComponents = {
  h1: (props: any) => <MarkdownHeading level={1} {...props} />,
  h2: (props: any) => <MarkdownHeading level={2} {...props} />,
  h3: (props: any) => <MarkdownHeading level={3} {...props} />,
  h4: (props: any) => <MarkdownHeading level={4} {...props} />,
  h5: (props: any) => <MarkdownHeading level={5} {...props} />,
  h6: (props: any) => <MarkdownHeading level={6} {...props} />,
  p: (props: any) => <MarkdownParagraph {...props} />,
  a: (props: any) => <MarkdownLink {...props} />,
  code: ({ children, className, ...props }: any) => {
    const isBlockCode = typeof className === 'string' && className.includes('language-')
    if (isBlockCode) {
      return <code className={className} {...props}>{children}</code>
    }
    return <MarkdownCode inline {...props}>{children}</MarkdownCode>
  },
  pre: ({ children, ...props }: any) => {
    const child = React.Children.toArray(children)[0]
    if (React.isValidElement(child)) {
      const className = (child.props as any)?.className
      const codeChildren = (child.props as any)?.children
      return (
        <MarkdownCode className={className} {...props}>
          {codeChildren}
        </MarkdownCode>
      )
    }
    return <pre {...props}>{children}</pre>
  },
  blockquote: (props: any) => <MarkdownBlockquote {...props} />,
  strong: (props: any) => <MarkdownStrong {...props} />,
  em: (props: any) => <MarkdownEmphasis {...props} />,
  hr: (props: any) => <MarkdownHr {...props} />,
  ul: (props: any) => <MarkdownList {...props} />,
  ol: (props: any) => <MarkdownList ordered {...props} />,
  li: (props: any) => <MarkdownListItem {...props} />,
  img: (props: any) => <MarkdownImage {...props} />,
}
