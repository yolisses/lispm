<script lang="ts">
  import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
  import type { DocTreeNode } from '../tree/DocTreeNode';
  import NavSectionContent from './NavSectionContent.svelte';
  import NavSectionLabel from './NavSectionLabel.svelte';

  const { node }: { node: DocTreeNode } = $props();
</script>

<div class="flex flex-col gap-1">
  {#if node.children.length}
    <details open class="group">
      <summary class="flex items-center list-none p-0">
        <div
          class="basic-button transition-transform duration-100 px-2 rotate-icon"
        >
          <Fa icon={faChevronRight} class="opacity-50" />
        </div>

        <NavSectionLabel {node} mode="summary" />
      </summary>

      <NavSectionContent {node} />
    </details>
  {:else}
    <NavSectionLabel {node} mode="leaf" />
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
