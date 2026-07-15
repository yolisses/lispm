<script lang="ts">
	import { resolve } from '$app/paths';
	import logo from '$lib/assets/logo text white.svg';
	import GitHubButton from './GitHubButton.svelte';
	import Navbar from './Navbar.svelte';
	import SearchButton from './SearchButton.svelte';
</script>

<aside class="bg-zinc-900 sticky top-0 max-h-dvh overflow-hidden p-2 flex flex-col">
	<div class="flex py-2 justify-between items-center border-b dark:border-white/10 border-black/10">
		<a href={resolve('/')} class="basic-button">
			<img src={logo} width="100" alt="LiSPM documentation home" />
		</a>
		<SearchButton />
	</div>
	<Navbar />
	<div class="flex justify-between items-center border-t dark:border-white/10 border-black/10">
		<GitHubButton />
	</div>
</aside>
