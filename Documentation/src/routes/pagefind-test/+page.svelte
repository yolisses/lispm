<script>
	// prettier-ignore
	import { onMount } from 'svelte';

	async function doTheThing() {
		const a = await import('pagefind');
		console.log('here');
		// Create a Pagefind search index to work with
		const { index } = await a.createIndex();

		// Index all HTML files in a directory
		await index.addDirectory({
			path: 'public'
		});

		// Add extra content
		await index.addCustomRecjord({
			url: '/resume.pdf',
			content: 'Aenean lacinia bibendum nulla sed consectetur',
			language: 'en'
		});

		// Get the index files in-memory
		const { files } = await index.getFiles();

		// Or, write the index to disk
		await index.writeFiles({
			outputPath: 'public/pagefind'
		});
	}

	onMount(() => doTheThing());
</script>
