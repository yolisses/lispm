<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import GlobalLayout from '$lib/GlobalLayout.svelte';
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<GlobalLayout>
	<div class="prose dark:prose-invert">
		{@render children()}
	</div>
</GlobalLayout>
