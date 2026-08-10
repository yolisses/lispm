<script lang="ts">
  import type { DocTreeNode } from '../tree/DocTreeNode';
  import NavSection from './NavSection.svelte';

  const { node }: { node: DocTreeNode } = $props();
</script>

{#if node.children.length}
  <div class="ml-3 flex flex-col gap-1">
    {#each node.children as child}
      <NavSection node={child} />
    {/each}
  </div>
{/if}
