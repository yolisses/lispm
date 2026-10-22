<script lang="ts">
  import NavNode from './nav/NavNode.svelte';
  import { buildDocTree } from './tree/buildDocTree';

  const nodes = buildDocTree();
</script>

<nav class="flex flex-1 flex-col overflow-y-auto">
  {#each nodes as node (node.path)}
    <NavNode {node} />
  {/each}
</nav>
