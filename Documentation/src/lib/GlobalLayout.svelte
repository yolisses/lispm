<script lang="ts">
	import { browser } from '$app/environment';
	import { resolve } from '$app/paths';
	import logoLight from '$lib/assets/logo text black.svg';
	import logoDark from '$lib/assets/logo text white.svg';
	import { onMount } from 'svelte';
	import GitHubButton from './GitHubButton.svelte';
	import Navbar from './Navbar.svelte';

	const { children } = $props();
	let searchElement: HTMLElement | null = $state(null);
	let isDark = $state(true);
	let sidebarOpen = $state(true);

	function applyTheme(nextDark: boolean) {
		if (!browser) {
			return;
		}

		const root = document.documentElement;
		root.classList.toggle('dark', nextDark);
		root.style.colorScheme = nextDark ? 'dark' : 'light';
		localStorage.setItem('lispm-theme', nextDark ? 'dark' : 'light');
	}

	function toggleTheme() {
		isDark = !isDark;
		applyTheme(isDark);
	}

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function attachSearchResultBehavior() {
		if (!searchElement) {
			return;
		}

		const apply = () => {
			searchElement?.querySelectorAll('.pagefind-ui__result-link').forEach((link) => {
				link.setAttribute('target', '_blank');
				link.setAttribute('rel', 'noopener noreferrer');
			});
		};

		apply();
		const observer = new MutationObserver(apply);
		observer.observe(searchElement, { childList: true, subtree: true });
	}

	onMount(() => {
		if (!browser) {
			return;
		}

		const storedTheme = localStorage.getItem('lispm-theme');
		isDark = storedTheme === 'light' ? false : true;
		applyTheme(isDark);

		const loadPagefindUi = () => {
			const PagefindUI = window.PagefindUI;

			if (!PagefindUI || !searchElement) {
				return;
			}

			new PagefindUI({
				element: searchElement,
				showImages: false
			});
			attachSearchResultBehavior();
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

<div
	class="flex min-h-svh flex-1 bg-zinc-50 text-zinc-900 transition-colors duration-200 dark:bg-zinc-950 dark:text-zinc-100"
>
	<button
		type="button"
		class="fixed left-3 top-3 z-40 rounded-full border border-zinc-200 bg-white/90 p-2 shadow-lg backdrop-blur md:hidden dark:border-zinc-700 dark:bg-zinc-900/90"
		onclick={toggleSidebar}
		aria-label="Toggle navigation"
	>
		<span class="text-lg">☰</span>
	</button>

	<aside
		class={`fixed inset-y-0 left-0 z-30 w-80 max-w-[90vw] shrink-0 border-r border-zinc-200 bg-white/95 px-3 py-4 shadow-2xl backdrop-blur transition-transform duration-200 dark:border-zinc-800 dark:bg-zinc-950/95 md:sticky md:top-0 md:h-screen md:w-72 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
	>
		<div class="flex h-full flex-col overflow-hidden">
			<div class="flex items-center justify-between gap-3 px-1 pb-3">
				<a href={resolve('/')} class="basic-button w-fit rounded-full p-1.5">
					<img src={isDark ? logoDark : logoLight} width="100" alt="LiSPM documentation home" />
				</a>
				<button
					type="button"
					class="basic-button rounded-full border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700"
					onclick={toggleTheme}
				>
					{isDark ? '☀️ Light' : '🌙 Dark'}
				</button>
			</div>

			<div
				class="mb-4 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/80 p-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80"
			>
				<div bind:this={searchElement} class="min-h-12"></div>
			</div>

			<div class="flex-1 overflow-y-auto pr-1">
				<div
					class="mb-2 px-1 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400"
				>
					Contents
				</div>
				<Navbar />
			</div>

			<div class="mt-4 border-t border-zinc-200 pt-3 dark:border-zinc-800">
				<GitHubButton />
			</div>
		</div>
	</aside>

	<main class="flex-1 p-3 pb-8 md:p-6 lg:p-8">
		<div class="mx-auto max-w-5xl">
			{@render children()}
		</div>
	</main>
</div>
