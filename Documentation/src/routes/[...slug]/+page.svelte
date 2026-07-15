<script lang="ts">
	import { page } from '$app/stores';
	import CommentSection from '$lib/CommentSection.svelte';
	import { getDoc } from '$lib/tree/getDoc';

	const slug = $derived(
		Array.isArray($page.params.slug) ? $page.params.slug.join('/') : ($page.params.slug ?? '')
	);
	const doc = $derived(getDoc(slug));
</script>

{#if doc}
	{@const DocComponent = doc.default as any}
	<DocComponent />
	<hr />
	{#key doc.routeSlug}
		<CommentSection />
	{/key}
{:else}
	<p>Document not found.</p>
{/if}
