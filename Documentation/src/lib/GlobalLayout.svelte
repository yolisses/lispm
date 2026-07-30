<script lang="ts">
  import SidePanel from './SidePanel.svelte';
  import ThemeSetup from './ThemeSetup.svelte';
  const { children } = $props();
</script>

<ThemeSetup />
<div class="flex">
  <SidePanel />
  <div class="flex justify-center flex-1 p-2">
    <main class="justify-center w-full max-w-2xl">
      {@render children()}
    </main>
  </div>
</div>
