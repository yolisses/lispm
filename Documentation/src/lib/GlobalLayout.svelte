<script lang="ts">
	import SidePanel from './SidePanel.svelte';
	const { children } = $props();
</script>

<svelte:head>
	<link rel="stylesheet" href="/pagefind/pagefind-ui.css" />
</svelte:head>

<div class="flex">
	<SidePanel />
	<div class="flex justify-center flex-1 p-2">
		<main class="justify-center w-full max-w-2xl">
			{@render children()}
		</main>
	</div>
</div>
