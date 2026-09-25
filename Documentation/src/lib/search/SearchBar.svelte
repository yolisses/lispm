<script lang="ts">
  import { faSearch } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';

  const {
    query = $bindable(),
    onChange,
  }: { query: string; onChange: (value: string) => void } = $props();
</script>

<label class="flex flex-row gap-1 items-center relative basic-border rounded">
  <div class="absolute pl-2">
    <Fa icon={faSearch} />
  </div>
  <input
    autofocus
    class="bg-highlight p-2 pl-8 w-full"
    oninput={(event) => onChange(event.currentTarget.value)}
    placeholder="Search topics, parts, and methods"
    type="search"
    value={query}
  />
</label>
