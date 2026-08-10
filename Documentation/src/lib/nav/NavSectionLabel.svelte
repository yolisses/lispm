<script lang="ts">
  import type { DocTreeNode } from '../tree/DocTreeNode';

  const {
    node,
    mode = 'summary',
  }: {
    node: DocTreeNode;
    mode?: 'summary' | 'leaf';
  } = $props();
</script>

{#if node.routeSlug}
  <a
    href={'/' + node.routeSlug}
    class={mode === 'summary'
      ? 'basic-button flex-1 text-left'
      : 'basic-button'}
  >
    {node.title}
  </a>
{:else if mode === 'summary'}
  <span class="basic-button flex-1 text-left font-semibold">{node.name}</span>
{:else}
  <div class="font-semibold">{node.name}</div>
{/if}
