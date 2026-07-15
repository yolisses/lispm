<script lang="ts">
	import { resolve } from '$app/paths';
	import logo from '$lib/assets/logo text white.svg';
	import GitHubButton from './GitHubButton.svelte';
	import Navbar from './Navbar.svelte';
	import SearchButton from './SearchButton.svelte';
</script>

<aside class="bg-zinc-900">
	<div class="sticky top-0 p-2">
		<a href={resolve('/')} class="basic-button">
			<img src={logo} width="100" alt="LiSPM documentation home" />
		</a>
		<SearchButton />
		<Navbar />
		<GitHubButton />
	</div>
</aside>
