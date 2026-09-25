<script lang="ts">
  import type { SearchResult } from './SearchResult';

  const { result }: { result: SearchResult } = $props();
</script>

<a href={result.url} class="bg-highlight not-prose flex flex-col p-2 rounded">
  <div class="font-medium text-xl">
    {result.meta?.title || result.url}
  </div>
  <div class="text-base">{@html result.excerpt}</div>
</a>
