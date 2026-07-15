<script lang="ts">
	import { onMount } from 'svelte';

	import SidePanel from './SidePanel.svelte';
	const { children } = $props();
	let searchElement: HTMLElement | null = $state(null);

	onMount(() => {
		if (typeof window === 'undefined') {
			return;
		}

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

<div class="flex">
	<SidePanel />
	<main class="p-2 flex justify-center">
		{@render children()}
	</main>
</div>
