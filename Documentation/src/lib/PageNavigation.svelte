<script lang="ts">
  import type { DocItem } from './tree/DocItem';
  import { getAdjacentDocs } from './tree/getAdjacentDocs';

  const { routeSlug }: { routeSlug: string } = $props();
  const adjacentDocs = $derived(getAdjacentDocs(routeSlug));
</script>

{#snippet pageLink(doc: DocItem, label: string, alignRight = false)}
  <a
    class="rounded border border-black/10 p-4 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
    class:text-right={alignRight}
    href="/{doc.routeSlug}"
  >
    <span class="block text-sm text-black/60 dark:text-white/60">{label}</span>
    <span class="block font-semibold">{doc.title}</span>
  </a>
{/snippet}

{#if adjacentDocs.previous || adjacentDocs.next}
  <nav
    aria-label="Page navigation"
    class="not-prose my-8 grid grid-cols-2 gap-4"
  >
    {#if adjacentDocs.previous}
      {@render pageLink(adjacentDocs.previous, 'Previous page')}
    {:else}
      <span></span>
    {/if}
    {#if adjacentDocs.next}
      {@render pageLink(adjacentDocs.next, 'Next page', true)}
    {/if}
  </nav>
{/if}
