<script lang="ts">
  import LogoButton from './LogoButton.svelte';
  import MenuButton from './MenuButton.svelte';
  import SearchButton from './SearchButton.svelte';
  import ThemeButton from './ThemeButton.svelte';

  let { menuIsOpen = $bindable() }: { menuIsOpen: boolean } = $props();
</script>

<div
  class="flex flex-row gap-2 md:hidden sticky top-0 dark:bg-zinc-950 bg-gray-200 border-b border-black/10 dark:border-white/10"
>
  <LogoButton />
  <div class="flex-1"></div>
  <ThemeButton />
  <SearchButton />
  <MenuButton bind:menuIsOpen />
</div>
