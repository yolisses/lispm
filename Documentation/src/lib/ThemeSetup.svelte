<script lang="ts">
  import { browser } from '$app/environment';
  import { themeIsDark } from './themeIsDark';

  if (browser) {
    themeIsDark.subscribe((value) => {
      document.documentElement.classList.toggle('dark', value);
    });
  }
</script>
