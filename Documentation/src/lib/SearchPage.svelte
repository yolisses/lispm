<script lang="ts">
  import { onMount } from 'svelte';

  let searchElement: HTMLElement | null = $state(null);

  onMount(() => {
    const loadPagefindUi = () => {
      const PagefindUI = window.PagefindUI;

      if (!PagefindUI || !searchElement) {
        return;
      }

      new PagefindUI({
        element: searchElement,
        showImages: false,
      });
    };

    if (typeof window === 'undefined') {
      return;
    }

    if (window.PagefindUI) {
      loadPagefindUi();
      return;
    }

    const script = document.createElement('script');
    script.src = '/pagefind/pagefind-ui.js';
    script.onload = loadPagefindUi;
    document.head.appendChild(script);
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="/pagefind/pagefind-ui.css" />
</svelte:head>

<div class="mx-auto max-w-3xl p-8">
  <div bind:this={searchElement} class="mt-6"></div>
</div>

<style>
  :global(.dark .pagefind-ui) {
    --pagefind-ui-primary: rgb(96 165 250);
    --pagefind-ui-text: rgb(244 244 245);
    --pagefind-ui-background: rgb(24 24 27);
    --pagefind-ui-border: rgb(255 255 255 / 0.15);
    --pagefind-ui-tag: rgb(255 255 255 / 0.08);
    color-scheme: dark;
  }

  :global(.dark .pagefind-ui__search-input),
  :global(.dark .pagefind-ui__search-clear) {
    color: rgb(244 244 245);
    background-color: rgb(24 24 27);
    border-color: rgb(255 255 255 / 0.15);
  }

  :global(.dark .pagefind-ui__search-input::placeholder) {
    color: rgb(161 161 170);
  }

  :global(.dark .pagefind-ui__result-link) {
    color: rgb(244 244 245);
  }

  :global(.dark .pagefind-ui__result-link:hover) {
    color: rgb(255 255 255);
  }
</style>
