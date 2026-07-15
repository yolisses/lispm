<script lang="ts">
	import { buildDocTree } from './content';
	import DocNavSection from './DocNavSection.svelte';

	const sections = buildDocTree();
</script>

<nav class="flex flex-col gap-2">
	{#each sections as section}
		<DocNavSection node={section} />
	{/each}
</nav>
