<script lang="ts">
	import Navbar from './Navbar.svelte';
	import Search from './Search.svelte';

	import logo from '$lib/assets/logo text white.svg';
	const { children } = $props();
</script>

<div class="flex flex-1 min-h-svh">
	<aside class="bg-zinc-900">
		<a href="/" class="basic-button">
			<img src={logo} width="100" />
		</a>
		<div class="sticky top-0 p-2">
			<Search />
			<Navbar />
		</div>
	</aside>
	<main class="p-2">
		{@render children()}
	</main>
</div>
