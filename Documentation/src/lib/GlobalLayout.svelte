<script lang="ts">
  import GlobalHeader from './GlobalHeader.svelte';
  import Navbar from './Navbar.svelte';
  import SidePanel from './SidePanel.svelte';
  import ThemeSetup from './ThemeSetup.svelte';
  const { children } = $props();

  let menuIsOpen = $state(true);
</script>

<ThemeSetup />
<div class="flex md:flex-row flex-col">
  <div class="sticky top-0">
    <GlobalHeader bind:menuIsOpen />
    {#if menuIsOpen}
      <div class="bg-white dark:bg-zinc-900 overflow-hidden h-screen">
        <div class="flex flex-col">
          <Navbar />
        </div>
      </div>
    {/if}
  </div>
  <div class="hidden md:flex">
    <SidePanel />
  </div>
  <div class="flex justify-center flex-1 p-2" class:select-none={menuIsOpen}>
    <main class="justify-center w-full max-w-2xl md:py-2">
      {@render children()}
    </main>
  </div>
</div>
