<script lang="ts">
	import { docs } from './content';
	console.log(docs);
</script>

<nav class="flex flex-col">
	{#each docs as doc (doc.slug)}
		<a href="/doc.link" class="basic-button">{doc.slug}</a>
	{/each}
</nav>
