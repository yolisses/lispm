<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from './Navbar.svelte';

	import logo from '$lib/assets/logo text white.svg';
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

<div class="flex min-h-svh flex-1">
	<aside class="bg-zinc-900">
		<a href="/" class="basic-button">
			<img src={logo} width="100" alt="LiSPM documentation home" />
		</a>
		<div class="sticky top-0 p-2">
			<div bind:this={searchElement} class="mb-4"></div>
			Contents
			<Navbar />
		</div>
	</aside>
	<main class="p-2">
		{@render children()}
	</main>
</div>
