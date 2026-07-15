<script lang="ts">
	import { page } from '$app/stores';
	import { getDoc } from '$lib/content';
	import Pagination from '$lib/Pagination.svelte';

	const slug = $derived(
		Array.isArray($page.params.slug) ? $page.params.slug.join('/') : ($page.params.slug ?? '')
	);
	const doc = $derived(getDoc(slug));
</script>

{#if doc}
	{@const DocComponent = doc.default as any}
	<DocComponent />
	<Pagination currentDoc={doc} />
{:else}
	<p>Document not found.</p>
{/if}
