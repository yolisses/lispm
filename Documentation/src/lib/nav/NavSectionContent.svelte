<script lang="ts">
  import type { DocTreeNode } from '../tree/DocTreeNode';
  import NavSection from './NavSection.svelte';

  const { node }: { node: DocTreeNode } = $props();
</script>

{#if node.children.length}
  <div class="ml-3 flex flex-col">
    {#each node.children as child (child.path)}
      <NavSection node={child} />
    {/each}
  </div>
{/if}
