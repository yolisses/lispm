<script lang="ts">
  import type { SearchResult } from './SearchResult';

  const { result }: { result: SearchResult } = $props();
  const excerptParts = $derived(result.excerpt.split(/<\/?mark>/g));
</script>

<a href={result.url} class="bg-highlight not-prose flex flex-col p-2 rounded">
  <div class="font-medium text-xl">
    {result.meta?.title || result.url}
  </div>
  <div class="text-base">
    {#each excerptParts as part, index (index)}
      {#if index % 2 === 1}<mark>{part}</mark>{:else}{part}{/if}
    {/each}
  </div>
</a>
