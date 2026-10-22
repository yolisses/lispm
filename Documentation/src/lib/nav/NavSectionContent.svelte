<script lang="ts">
  import type { DocTreeNode } from '../tree/DocTreeNode';
  import NavSection from './NavSection.svelte';

  const { node, level }: { node: DocTreeNode; level: number } = $props();
</script>

{#each node.children as child (child.path)}
  <NavSection node={child} level={level + 1} />
{/each}
