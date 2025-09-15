export { HighlightedText, HighlightedTextHTML } from './highlighted-text'
// Search components
export { SearchInput, SearchInputWithLabel } from './search-input'
export { SearchResultItem } from './search-result-item'
export { SearchResultsList } from './search-results-list'
export { SearchResultsSection } from './search-results-section'

// Re-export search utilities
export { useSearch } from '@/hooks/use-search'
export { useSearchHighlight } from '@/hooks/use-search-highlight'
export type { HighlightedText as HighlightedTextType } from '@/hooks/use-search-highlight'
