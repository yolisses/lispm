import type { SearchResult } from './SearchResult';

export interface PagefindMatch {
  data: () => Promise<SearchResult>;
}
