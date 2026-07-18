<script lang="ts">
	import CommentSection from '$lib/CommentSection.svelte';
	import { getDoc } from '$lib/tree/getDoc';

	const doc = getDoc('index');
</script>

<svelte:head>
	{#if doc}
		<title>LiSPM: Low cost open source scanning probe microscope (SPM)</title>
	{/if}
</svelte:head>

{#if doc}
	{@const DocComponent = doc.default as any}
	<DocComponent />
	<hr />
	<CommentSection />
{:else}
	<p>Select a document to view its contents.</p>
{/if}
