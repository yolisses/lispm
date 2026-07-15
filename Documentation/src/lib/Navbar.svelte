<script lang="ts">
	import DocNavSection from './DocNavSection.svelte';
	import { buildDocTree } from './tree/content';

	const sections = buildDocTree();
</script>

<nav class="flex flex-1 flex-col gap-2 overflow-y-auto">
	{#each sections as section}
		<DocNavSection node={section} />
	{/each}
</nav>
