<script lang="ts">
  import GlobalHeader from './GlobalHeader.svelte';
  import SidePanel from './SidePanel.svelte';
  import ThemeSetup from './ThemeSetup.svelte';
  const { children } = $props();
</script>

<ThemeSetup />
<div class="flex md:flex-row flex-col">
  <GlobalHeader />
  <div class="hidden md:flex">
    <SidePanel />
  </div>
  <div class="flex justify-center flex-1 p-2">
    <main class="justify-center w-full max-w-2xl md:py-2">
      {@render children()}
    </main>
  </div>
</div>
