<script lang="ts">
  import type { PagefindAPI } from './PagefindAPI';
  import type { PagefindMatch } from './PagefindMatch';
  import SearchBar from './SearchBar.svelte';
  import type { SearchResult } from './SearchResult';
  import SearchResultItem from './SearchResultItem.svelte';

  const PAGE_SIZE = 10;
  const PAGEFIND_PATH = '/pagefind/pagefind.js';
  let error = $state(false);
  let hasSearched = $state(false);
  let loading = $state(false);
  let matches = $state<PagefindMatch[]>([]);
  let pagefindPromise: Promise<PagefindAPI> | undefined;
  let query = $state('');
  let requestNumber = 0;
  let resultCount = $state(0);
  let results = $state<SearchResult[]>([]);

  function getPagefind() {
    pagefindPromise ??= import(
      /* @vite-ignore */ PAGEFIND_PATH
    ) as Promise<PagefindAPI>;
    return pagefindPromise;
  }

  async function searchDocs(value: string) {
    query = value;
    const currentRequest = ++requestNumber;
    const term = value.trim();

    results = [];
    matches = [];
    resultCount = 0;
    hasSearched = false;
    error = false;

    if (!term) {
      loading = false;
      return;
    }

    loading = true;

    try {
      const pagefind = await getPagefind();
      const search = await pagefind.debouncedSearch(term);
      if (currentRequest !== requestNumber || search === null) return;

      matches = search.results;
      resultCount = matches.length;
      results = await Promise.all(
        matches.slice(0, PAGE_SIZE).map((match) => match.data()),
      );
      if (currentRequest !== requestNumber) return;

      hasSearched = true;
      loading = false;
    } catch {
      if (currentRequest !== requestNumber) return;
      error = true;
      hasSearched = true;
      loading = false;
    }
  }

  async function showMore() {
    const nextMatches = matches.slice(
      results.length,
      results.length + PAGE_SIZE,
    );
    results = [
      ...results,
      ...(await Promise.all(nextMatches.map((match) => match.data()))),
    ];
  }
</script>

<h1>Search</h1>
<SearchBar bind:query onChange={searchDocs} />
<section
  class="results"
  aria-label="Search results"
  aria-live="polite"
  aria-busy={loading}
>
  {#if loading}
    <div>Searching...</div>
  {:else if error}
    <div>Search is unavailable right now. Please try again.</div>
  {:else if hasSearched && resultCount === 0}
    <div>No results for <strong>“{query.trim()}”</strong>.</div>
  {:else if hasSearched}
    <div>
      {resultCount}
      {resultCount === 1 ? 'result' : 'results'}
    </div>
    {#each results as result (result.url)}
      <SearchResultItem {result} />
    {/each}
    {#if results.length < resultCount}
      <button
        class="basic-button w-full flex-col"
        type="button"
        onclick={showMore}
      >
        Show more results
      </button>
    {/if}
  {/if}
</section>
