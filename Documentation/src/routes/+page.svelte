<script lang="ts">
	import { docs } from '$lib/tree/content';

	const doc = docs[0];
</script>

{#if doc}
	{@const DocComponent = doc.default as any}
	<DocComponent />
{:else}
	<p>Select a document to view its contents.</p>
{/if}
