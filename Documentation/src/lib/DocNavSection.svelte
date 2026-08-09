<script lang="ts">
  import type { DocTreeNode } from './tree/DocTreeNode';
  const { node }: { node: DocTreeNode } = $props();
</script>

<div class="flex flex-col gap-1">
  {#if node.type === 'folder'}
    {#if node.children.length || node.files.length}
      <details open class="group">
        <summary class="flex items-center gap-2 list-none p-0">
          <span
            class="inline-block transition-transform duration-100 rotate-icon"
            >▶</span
          >

          {#if node.indexDoc}
            <a
              href={'/' + node.indexDoc.routeSlug}
              class="basic-button flex-1 text-left"
            >
              {node.name}
            </a>
          {:else}
            <span class="basic-button flex-1 text-left font-semibold"
              >{node.name}</span
            >
          {/if}
        </summary>

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
      </details>
    {:else}
      {#if node.indexDoc}
        <a href={'/' + node.indexDoc.routeSlug} class="basic-button"
          >{node.name}</a
        >
      {:else}
        <div class="font-semibold">{node.name}</div>
      {/if}
    {/if}
  {:else}
    <a href={'/' + node.doc.routeSlug} class="basic-button">{node.doc.title}</a>
  {/if}
</div>

<style>
  :global(details[open] > summary .rotate-icon) {
    transform: rotate(90deg);
  }

  :global(summary) {
    cursor: pointer;
  }
</style>
