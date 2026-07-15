<script lang="ts">
	import { onMount } from 'svelte';

	let searchElement: HTMLElement | null = $state(null);
	let isReady = $state(false);

	onMount(() => {
		const loadPagefindUi = () => {
			const PagefindUI = window.PagefindUI;

			if (!PagefindUI || !searchElement) {
				return;
			}

			new PagefindUI({
				element: searchElement,
				showImages: false
			});
			isReady = true;
		};

		if (typeof window === 'undefined') {
			return;
		}

		if (window.PagefindUI) {
			loadPagefindUi();
			return;
		}

		const script = document.createElement('script');
		script.src = '/pagefind/pagefind-ui.js';
		script.onload = loadPagefindUi;
		document.head.appendChild(script);
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="/pagefind/pagefind-ui.css" />
</svelte:head>

<div class="mx-auto max-w-3xl p-8">
	<h1 class="text-2xl font-semibold">Pagefind search test</h1>
	<p class="mt-2 text-slate-600">
		This page renders the docs search box for the generated Pagefind index.
	</p>

	<div bind:this={searchElement} class="mt-6"></div>

	{#if isReady}
		<p class="mt-4 text-sm text-slate-500">The search box is ready.</p>
	{/if}
</div>
