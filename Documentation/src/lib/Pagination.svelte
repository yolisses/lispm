<script lang="ts">
	import { resolve } from '$app/paths';
	import { getAdjacentDocs } from './content';

	const { currentDoc }: { currentDoc?: { slug: string; title: string; routeSlug: string } | null } =
		$props();

	const navigation = $derived(currentDoc ? getAdjacentDocs(currentDoc.slug) : null);
</script>

{#if navigation?.prev || navigation?.next}
	<nav
		class="mt-8 flex flex-col gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between"
	>
		{#if navigation.prev}
			<a
				href={resolve(`/${navigation.prev.routeSlug}`)}
				class="basic-button justify-start rounded-full border border-zinc-200 bg-white/80 px-4 py-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/80"
			>
				<span aria-hidden="true">←</span>
				<span class="line-clamp-1">{navigation.prev.title}</span>
			</a>
		{:else}
			<span></span>
		{/if}

		{#if navigation.next}
			<a
				href={resolve(`/${navigation.next.routeSlug}`)}
				class="basic-button justify-end rounded-full border border-zinc-200 bg-white/80 px-4 py-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/80"
			>
				<span class="line-clamp-1">{navigation.next.title}</span>
				<span aria-hidden="true">→</span>
			</a>
		{/if}
	</nav>
{/if}
