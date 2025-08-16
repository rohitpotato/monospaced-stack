# Markdown Components

This directory contains React components for rendering markdown content with consistent styling for a light mode website.

## Components

### MarkdownHeading
Renders markdown headings (h1-h6) with appropriate styling and spacing.

```tsx
<MarkdownHeading level={1} id="my-heading">
  My Heading
</MarkdownHeading>
```

### MarkdownParagraph
Renders paragraph text with proper typography and spacing.

```tsx
<MarkdownParagraph>
  This is a paragraph of text.
</MarkdownParagraph>
```

### MarkdownLink
Renders links with hover effects and proper external link handling.

```tsx
<MarkdownLink href="https://example.com">
  Click here
</MarkdownLink>
```

### MarkdownCode
Renders both inline and block code with syntax highlighting styling.

```tsx
// Inline code
<MarkdownCode inline>const x = 1;</MarkdownCode>

// Block code
<MarkdownCode>
  function hello() {
    console.log('Hello, world!');
  }
</MarkdownCode>
```

### MarkdownList & MarkdownListItem
Renders ordered and unordered lists.

```tsx
<MarkdownList ordered>
  <MarkdownListItem>First item</MarkdownListItem>
  <MarkdownListItem>Second item</MarkdownListItem>
</MarkdownList>
```

### MarkdownBlockquote
Renders blockquotes with a left border and background styling.

```tsx
<MarkdownBlockquote>
  This is a quote from someone important.
</MarkdownBlockquote>
```

### MarkdownStrong
Renders bold text.

```tsx
<MarkdownStrong>This text is bold</MarkdownStrong>
```

### MarkdownEmphasis
Renders italic text.

```tsx
<MarkdownEmphasis>This text is italic</MarkdownEmphasis>
```

### MarkdownHr
Renders horizontal rules for section dividers.

```tsx
<MarkdownHr />
```

### MarkdownImage
Renders images with proper sizing and captions.

```tsx
<MarkdownImage 
  src="/path/to/image.jpg" 
  alt="Image description"
  width={800}
  height={600}
/>
```

## Usage in EnhancedBlogPost

The `EnhancedBlogPost` component automatically parses markdown content and renders it using these components. It handles:

- Headings (h1-h6)
- Paragraphs
- Links
- Inline and block code
- Ordered and unordered lists
- Blockquotes
- Bold and italic text
- Horizontal rules
- Images

## Styling

All components use Tailwind CSS classes and are designed for a light mode website with:

- Gray color palette for text
- Blue accent color for links
- Proper spacing and typography
- Responsive design
- Hover effects for interactive elements

The styling is consistent with the Typography component and follows modern web design principles.
