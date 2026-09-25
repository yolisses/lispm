import type { PagefindMatch } from './PagefindMatch';

export interface PagefindAPI {
  debouncedSearch: (
    term: string,
  ) => Promise<{ results: PagefindMatch[] } | null>;
}
