<script lang="ts">
  const { placeholder = 'Search docs' } = $props();
</script>

<style>
  .search {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .pagefind-search {
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #e5e7eb;
  }

  #pagefind-results {
    max-height: 60vh;
    overflow: auto;
  }
</style>

<div class="search">
  <input class="pagefind-search" type="search" placeholder={placeholder} />
  <div id="pagefind-results"></div>
</div>
