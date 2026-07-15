<script lang="ts">
	import Navbar from './Navbar.svelte';

	const { children } = $props();
</script>

<div class="flex flex-1 min-h-svh">
	<aside class="bg-zinc-900">
		<div class="sticky top-0 p-2">
			Contents
			<Navbar />
		</div>
	</aside>
	<main class="p-2">
		{@render children()}
	</main>
</div>
