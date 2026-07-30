<script lang="ts">
  import Giscus from '@giscus/svelte';
  import { themeIsDark } from './themeIsDark';
</script>

<Giscus
  id="comments"
  repo="yolisses/lispm"
  repoId="R_kgDORffP2w"
  category="Announcements"
  categoryId="DIC_kwDORffP284DAkxD"
  mapping="pathname"
  term="Welcome to giscus!"
  reactionsEnabled="0"
  emitMetadata="0"
  inputPosition="top"
  theme={$themeIsDark ? 'noborder_gray' : 'noborder_light'}
  lang="en"
  loading="lazy"
></Giscus>
