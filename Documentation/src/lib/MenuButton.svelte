<script lang="ts">
  import { faBars } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';

  let { menuIsOpen = $bindable() }: { menuIsOpen: boolean } = $props();

  function handleClick() {
    menuIsOpen = !menuIsOpen;
  }
</script>

<button onclick={handleClick} class="basic-button px-4">
  <Fa icon={faBars} />
</button>
