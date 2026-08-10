<script lang="ts">
  import NavSection from './nav/NavSection.svelte';
  import { buildDocTree } from './tree/buildDocTree';

  const sections = buildDocTree();
</script>

<nav class="flex flex-1 flex-col gap-2 overflow-y-auto">
  {#each sections as section (section.path)}
    <NavSection node={section} />
  {/each}
</nav>
