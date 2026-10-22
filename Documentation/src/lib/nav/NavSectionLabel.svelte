<script lang="ts">
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
</script>

{#if node.routeSlug}
  <a
    href={'/' + node.routeSlug}
    class={mode === 'summary'
      ? 'basic-button flex-1 text-left font-semibold'
      : 'basic-button'}
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
