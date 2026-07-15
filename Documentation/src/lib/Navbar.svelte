<script lang="ts">
	import DocNavSection from './DocNavSection.svelte';
	import { buildDocTree } from './tree/buildDocTree';

	const sections = buildDocTree();
</script>

<nav class="flex flex-1 flex-col gap-2 overflow-y-auto">
	{#each sections as section}
		<DocNavSection node={section} />
	{/each}
</nav>
