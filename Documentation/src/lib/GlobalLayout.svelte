<script lang="ts">
	import SidePanel from './SidePanel.svelte';
	import { themeIsDark } from './themeIsDark';
	const { children } = $props();

	themeIsDark.subscribe((value) => {
		if (typeof document != 'undefined') {
			document.documentElement.classList.toggle('dark', value);
		}
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="/pagefind/pagefind-ui.css" />
</svelte:head>

<svelte:document class:dark={$themeIsDark}></svelte:document>
<div class="flex">
	<SidePanel />
	<div class="flex justify-center flex-1 p-2">
		<main class="justify-center w-full max-w-2xl">
			{@render children()}
		</main>
	</div>
</div>
