<script lang="ts">
  import { resolve } from '$app/paths';
  import logoTextBlack from '$lib/assets/logo text black.svg';
  import logoTextWhite from '$lib/assets/logo text white.svg';
</script>

<a href={resolve('/')} class="basic-button">
  <img
    src={logoTextWhite}
    width="100"
    alt="LiSPM documentation home"
    class="dark:block hidden"
  />
  <img
    src={logoTextBlack}
    width="100"
    alt="LiSPM documentation home"
    class="block dark:hidden"
  />
</a>
