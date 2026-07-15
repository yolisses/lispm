<script lang="ts">
	import GitHubButton from './GitHubButton.svelte';
	import LogoButton from './LogoButton.svelte';
	import Navbar from './Navbar.svelte';
	import SearchButton from './SearchButton.svelte';
	import ThemeButton from './ThemeButton.svelte';
</script>

<aside
	class="dark:bg-zinc-900 bg-zinc-200 sticky top-0 max-h-dvh overflow-hidden p-2 flex flex-col"
>
	<div class="flex py-2 justify-between items-center border-b dark:border-white/10 border-black/10">
		<LogoButton />
		<div class="flex gap-1">
			<ThemeButton />
			<SearchButton />
		</div>
	</div>
	<Navbar />
	<div class="flex justify-between items-center border-t dark:border-white/10 border-black/10">
		<GitHubButton />
	</div>
</aside>
