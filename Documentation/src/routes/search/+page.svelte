<script lang="ts">
	import { onMount } from 'svelte';

	let searchElement: HTMLElement | null = $state(null);

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
	<div bind:this={searchElement} class="mt-6"></div>
</div>
