<script lang="ts">
  import type { DocTreeNode } from './tree/DocTreeNode';
  const { node }: { node: DocTreeNode } = $props();
</script>

<div class="flex flex-col gap-1">
  {#if node.type === 'folder'}
    {#if node.indexDoc}
      <a href={'/' + node.indexDoc.routeSlug} class="basic-button"
        >{node.name}</a
      >
    {:else}
      <div class="font-semibold">{node.name}</div>
    {/if}

    {#if node.children.length}
      <div class="ml-3 flex flex-col gap-1">
        {#each node.children as child}
          <svelte:self node={child} />
        {/each}
      </div>
    {/if}

    {#if node.files.length}
      <div class="ml-3 flex flex-col gap-1">
        {#each node.files as doc}
          <a href={'/' + doc.routeSlug} class="basic-button">{doc.title}</a>
        {/each}
      </div>
    {/if}
  {:else}
    <a href={'/' + node.doc.routeSlug} class="basic-button">{node.doc.title}</a>
  {/if}
</div>
