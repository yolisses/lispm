<script lang="ts">
  import { page } from '$app/stores';
  import type { DocTreeNode } from '../tree/DocTreeNode';

  const {
    node,
    mode = 'summary',
    level = 0,
  }: {
    node: DocTreeNode;
    mode?: 'summary' | 'leaf';
    level?: number;
  } = $props();

  const indentation = $derived(`calc(0.5rem + ${level * 0.75}rem)`);
  const href = $derived('/' + node.routeSlug);
  const isCurrentPage = $derived(
    $page.url.pathname.replace(/\/$/, '') === href.replace(/\/$/, ''),
  );
</script>

{#if node.routeSlug}
  <a
    {href}
    aria-current={isCurrentPage ? 'page' : undefined}
    class={mode === 'summary'
      ? `basic-button flex-1 text-left font-semibold ${isCurrentPage ? 'text-red-600 dark:text-red-400' : ''}`
      : `basic-button ${isCurrentPage ? 'text-red-600 dark:text-red-400' : ''}`}
    style:padding-left={indentation}
  >
    {node.name}
  </a>
{:else if mode === 'summary'}
  <span
    class="basic-button flex-1 text-left font-bold"
    style:padding-left={indentation}
  >
    {node.name}
  </span>
{:else}
  <div class="font-semibold" style:padding-left={indentation}>{node.name}</div>
{/if}
