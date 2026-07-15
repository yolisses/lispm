<script lang="ts">
	import { docs } from './content';
</script>

<nav class="flex flex-col">
	{#each docs as doc (doc.slug)}
		<a href={`/${doc.routeSlug}`} class="basic-button">{doc.slug}</a>
	{/each}
</nav>
