# Search Components System

A comprehensive, modular search system with text highlighting, retro/cyberpunk styling, and keyboard navigation.

## 🚀 Features

- **Text Highlighting**: Highlights search terms in titles, summaries, and content
- **Retro Styling**: Cyberpunk/Matrix-themed UI with green-on-black aesthetics
- **Keyboard Navigation**: Full keyboard support with arrow keys and Enter
- **Modular Design**: Reusable components for different use cases
- **TypeScript**: Full type safety and IntelliSense support
- **Accessibility**: ARIA labels and keyboard navigation
- **Debounced Search**: Optimized performance with configurable debouncing

## 📦 Components

### Core Components

#### `SearchInput`
A styled search input with retro theming and clear functionality.

```tsx
import { SearchInput } from '@/components/search'

<SearchInput
  value={searchQuery}
  onChange={setSearchQuery}
  placeholder="Search articles..."
  showClearButton
  onClear={clearSearch}
/>
```

#### `SearchResultItem`
Displays individual search results with highlighting.

```tsx
import { SearchResultItem } from '@/components/search'

<SearchResultItem
  result={searchResult}
  index={0}
  isSelected={false}
  onSelect={handleSelect}
  variant="default" // 'default' | 'compact' | 'detailed'
/>
```

#### `SearchResultsList`
Manages a list of search results with loading and empty states.

```tsx
import { SearchResultsList } from '@/components/search'

<SearchResultsList
  results={searchResults}
  isSearching={false}
  searchQuery="example"
  onResultSelect={handleSelect}
  variant="default"
  maxResults={10}
/>
```

#### `SearchResultsSection`
Complete search results section with keyboard navigation and retro styling.

```tsx
import { SearchResultsSection } from '@/components/search'

<SearchResultsSection
  searchResults={results}
  isSearching={isSearching}
  hasResults={hasResults}
  searchQuery={query}
  onResultSelect={handleSelect}
  selectedIndex={selectedIndex}
  onSelectionChange={setSelectedIndex}
  showKeyboardHints={true}
/>
```

#### `CommandPalette`
Full-featured command palette with search functionality.

```tsx
import { CommandPalette } from '@/components/search'

<CommandPalette
  posts={posts}
  isOpen={isOpen}
  onClose={onClose}
/>
```

### Utility Components

#### `HighlightedText`
Renders text with highlighted segments.

```tsx
import { HighlightedText } from '@/components/search'

<HighlightedText
  highlights={highlightedSegments}
  className="text-green-300"
  as="span"
/>
```

#### `HighlightedTextHTML`
Renders highlighted text as HTML.

```tsx
import { HighlightedTextHTML } from '@/components/search'

<HighlightedTextHTML
  html={highlightedHTML}
  className="text-green-300"
  as="p"
/>
```

## 🎣 Hooks

### `useSearch`
Main search hook that manages search state and results.

```tsx
import { useSearch } from '@/hooks/use-search'

const {
  searchQuery,
  setSearchQuery,
  searchResults,
  isSearching,
  hasSearchQuery,
  hasResults,
  clearSearch,
  selectedIndex,
  setSelectedIndex,
  selectNext,
  selectPrevious
} = useSearch(posts, {
  debounceMs: 300,
  minQueryLength: 3,
  maxResults: 10,
  highlightConfig: {
    highlightClass: 'bg-green-400/30 text-green-100 px-1 rounded font-medium font-mono'
  }
})
```

### `useSearchHighlight`
Hook for text highlighting functionality.

```tsx
import { useSearchHighlight } from '@/hooks/use-search-highlight'

const { highlightText, getHighlightedHTML } = useSearchHighlight(searchQuery, {
  highlightClass: 'bg-green-400/30 text-green-100 px-1 rounded font-medium',
  caseSensitive: false,
  maxSnippetLength: 150
})
```

## 🎨 Styling

The search system uses a retro/cyberpunk theme with:

- **Background**: Black (`bg-black`)
- **Borders**: Green (`border-green-500`)
- **Text**: Green variants (`text-green-300`, `text-green-400`, `text-green-500`)
- **Highlights**: Green with transparency (`bg-green-400/30`)
- **Font**: Monospace (`font-mono`)
- **Shadows**: Green glow effects (`shadow-[0_0_15px_rgba(0,255,0,0.3)]`)

## ⌨️ Keyboard Navigation

- **↑/↓**: Navigate through results
- **Enter**: Select highlighted result
- **Escape**: Clear selection or close search
- **Tab**: Focus management

## 📱 Responsive Design

Components adapt to different screen sizes:

- **Desktop**: Full-featured with keyboard hints
- **Tablet**: Compact layout with essential features
- **Mobile**: Touch-optimized with larger targets

## 🔧 Configuration

### Search Options

```tsx
interface UseSearchOptions {
  debounceMs?: number // Debounce delay (default: 300ms)
  minQueryLength?: number // Minimum query length (default: 3)
  maxResults?: number // Maximum results to show (default: 10)
  highlightConfig?: {
    highlightClass?: string // CSS classes for highlights
    caseSensitive?: boolean // Case sensitivity (default: false)
    maxSnippetLength?: number // Max snippet length (default: 150)
  }
}
```

### Component Variants

- **`default`**: Standard layout with title, summary, and metadata
- **`compact`**: Minimal layout for sidebars
- **`detailed`**: Expanded layout with more information

## 🚀 Usage Examples

### Basic Search

```tsx
import { SearchInput, SearchResultsSection, useSearch } from '@/components/search'

function MySearchComponent({ posts }) {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    hasResults,
    onResultSelect
  } = useSearch(posts)

  return (
    <div>
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search articles..."
      />
      <SearchResultsSection
        searchResults={searchResults}
        isSearching={isSearching}
        hasResults={hasResults}
        searchQuery={searchQuery}
        onResultSelect={onResultSelect}
      />
    </div>
  )
}
```

### Sidebar Search

```tsx
import { SearchDemo } from '@/components/search'

<SearchDemo
  posts={posts}
  variant="sidebar"
  className="w-80"
/>
```

### Command Palette

```tsx
import { CommandPalette } from '@/components/search'

<CommandPalette
  posts={posts}
  isOpen={isCommandOpen}
  onClose={() => setIsCommandOpen(false)}
/>
```

## 🧪 Testing

The search system is designed to be easily testable:

```tsx
import { render, screen } from '@testing-library/react'
import { SearchInput } from '@/components/search'

test('search input renders correctly', () => {
  render(<SearchInput value="" onChange={() => {}} />)
  expect(screen.getByRole('textbox')).toBeInTheDocument()
})
```

## 🔄 Migration

To migrate from the old search system:

1. Replace old search components with new ones
2. Update imports to use the new search system
3. Configure styling to match your theme
4. Test keyboard navigation and accessibility

## 📚 API Reference

See the individual component files for detailed prop interfaces and usage examples.

## 🤝 Contributing

When adding new features:

1. Maintain the retro/cyberpunk aesthetic
2. Ensure keyboard navigation works
3. Add proper TypeScript types
4. Include accessibility features
5. Update this README
