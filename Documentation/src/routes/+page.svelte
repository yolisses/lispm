<script lang="ts">
	import CommentSection from '$lib/CommentSection.svelte';
	import { getDoc } from '$lib/tree/getDoc';

	const doc = getDoc('index');
</script>

{#if doc}
	{@const DocComponent = doc.default as any}
	<DocComponent />
	<CommentSection />
{:else}
	<p>Select a document to view its contents.</p>
{/if}
