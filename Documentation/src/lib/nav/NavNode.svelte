<script lang="ts">
  import { page } from '$app/state';
  import type { DocTreeNode } from '$lib/tree/DocTreeNode';
  import {
    faChevronDown,
    faChevronUp,
  } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
  import NavNode from './NavNode.svelte';

  const {
    node,
    level = 0,
  }: {
    node: DocTreeNode;
    level?: number;
  } = $props();
  let isOpen = $state(true);
  const isLeaf = $derived(node.children.length === 0);
  const isBranch = $derived(!isLeaf);
  const isCurrentPage = $derived(page.url.pathname === '/' + node.routeSlug);
</script>

{#snippet label()}
  <a
    class:basic-button={isLeaf}
    class:currentPage={isCurrentPage}
    class:font-semibold={isBranch}
    class="flex-1 p-2"
    href={'/' + node.routeSlug}
    style:padding-left={(level + 1) * 0.5 + 'rem'}
  >
    {node.name}
  </a>
{/snippet}

{#if isBranch}
  <details bind:open={isOpen}>
    <summary class="basic-button rounded-none p-0">
      {@render label()}
      {#if !isLeaf}
        <div class="basic-button p-3 cursor-pointer">
          <Fa icon={isOpen ? faChevronDown : faChevronUp} />
        </div>
      {/if}
    </summary>
    <div class="flex flex-col">
      {#each node.children as child (child.path)}
        <NavNode node={child} level={level + 1} />
      {/each}
    </div>
  </details>
{:else}
  {@render label()}
{/if}

<style>
  @reference "src/routes/layout.css";

  .currentPage {
    @apply text-red-600 dark:text-red-400;
  }
</style>
