<script lang="ts">
	import { page } from '$app/stores';
	import { themeIsDark } from '$lib/themeIsDark';
	import { getDoc } from '$lib/tree/getDoc';
	import Giscus from '@giscus/svelte';

	const slug = $derived(
		Array.isArray($page.params.slug) ? $page.params.slug.join('/') : ($page.params.slug ?? '')
	);
	const doc = $derived(getDoc(slug));
</script>

{#if doc}
	{@const DocComponent = doc.default as any}
	<DocComponent />
	<Giscus
		id="comments"
		repo="yolisses/lispm"
		repoId="R_kgDORffP2w"
		category="Announcements"
		categoryId="DIC_kwDORffP284DAkxD"
		mapping="pathname"
		term="Welcome to giscus!"
		reactionsEnabled="0"
		emitMetadata="0"
		inputPosition="top"
		theme={$themeIsDark ? 'noborder_gray' : 'noborder_light'}
		lang="en"
		loading="lazy"
	></Giscus>
{:else}
	<p>Document not found.</p>
{/if}
