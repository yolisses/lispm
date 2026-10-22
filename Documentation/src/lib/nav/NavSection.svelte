<script lang="ts">
  import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
  import type { DocTreeNode } from '../tree/DocTreeNode';
  import NavSectionContent from './NavSectionContent.svelte';
  import NavSectionLabel from './NavSectionLabel.svelte';

  const { node, level = 0 }: { node: DocTreeNode; level?: number } = $props();
</script>

<div class="flex flex-col">
  {#if node.children.length}
    <details open class="group">
      <summary class="flex items-center list-none p-0 cursor-pointer">
        <NavSectionLabel {node} {level} mode="summary" />
        <div class="basic-button aspect-square chevron">
          <Fa icon={faChevronUp} class="opacity-50" fw />
        </div>
      </summary>
      <NavSectionContent {node} {level} />
    </details>
  {:else}
    <NavSectionLabel {node} {level} mode="leaf" />
  {/if}
</div>

<style>
  [open] .chevron {
    @apply rotate-180;
  }
</style>
