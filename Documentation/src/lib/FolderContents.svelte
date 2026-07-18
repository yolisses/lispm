<script lang="ts">
	import { page } from '$app/stores';
	import { docs } from './tree/content';
	import { getDoc } from './tree/getDoc';
	import { getFolderPathForSlug } from './tree/getFolderPathForSlug';

	const slug = $derived(
		Array.isArray($page.params.slug) ? $page.params.slug.join('/') : ($page.params.slug ?? '')
	);

	const currentDoc = $derived(getDoc(slug));
	const folderPath = $derived(getFolderPathForSlug(currentDoc?.slug ?? ''));
	const folderEntries = $derived.by(() => {
		if (!currentDoc?.slug.endsWith('/index') || !folderPath) {
			return [];
		}

		const folderPrefix = `${folderPath}/`;
		return docs
			.filter((doc) => {
				const docSlug = doc.slug.replace(/\/index$/, '');
				return (
					docSlug.startsWith(folderPrefix) &&
					!docSlug.slice(folderPrefix.length).includes('/') &&
					docSlug !== folderPath
				);
			})
			.sort((a, b) => a.title.localeCompare(b.title));
	});
</script>

{#if folderEntries.length}
	<nav
		class="not-prose mb-6 rounded border border-black/10 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5"
	>
		<h2 class="mb-2 text-sm font-semibold uppercase tracking-wide">Contents</h2>
		<ul class="m-0 list-none p-0">
			{#each folderEntries as entry}
				<li class="mb-1">
					<a class="text-blue-600 hover:underline dark:text-blue-400" href="/{entry.routeSlug}">
						{entry.title}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}
