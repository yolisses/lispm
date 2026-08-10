<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import GlobalHeader from './GlobalHeader.svelte';
  import Navbar from './Navbar.svelte';
  import SearchButton from './SearchButton.svelte';
  import SidePanel from './SidePanel.svelte';
  import ThemeButton from './ThemeButton.svelte';
  import ThemeSetup from './ThemeSetup.svelte';
  const { children } = $props();

  let menuIsOpen = $state(false);

  afterNavigate(() => {
    menuIsOpen = false;
  });
</script>

<ThemeSetup />
<div class="flex md:flex-row flex-col min-h-screen">
  <div class="sticky top-0">
    <GlobalHeader bind:menuIsOpen />
    {#if menuIsOpen}
      <div
        class="bg-white flex flex-col dark:bg-zinc-950 h-screen overflow-y-auto md:hidden"
      >
        <div class="flex justify-stretch">
          <ThemeButton />
          <SearchButton />
        </div>
        <Navbar />
      </div>
    {/if}
  </div>
  <div class="hidden md:flex border-r border-black/10 dark:border-white/10">
    <SidePanel />
  </div>
  <div class="flex justify-center flex-1 p-2">
    <main class="justify-center w-full max-w-2xl md:py-2">
      {@render children()}
    </main>
  </div>
</div>
