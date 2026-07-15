import { createIndex } from 'pagefind';

async function doTheThing() {
	console.log('here');
	// Create a Pagefind search index to work with
	const { index } = await createIndex();

	// Index all HTML files in a directory
	await index.addDirectory({
		path: 'content'
	});

	// Add extra content
	await index.addCustomRecord({
		url: '/resume.pdf',
		content: 'Aenean lacinia bibendum nulla sed consectetur',
		language: 'en'
	});

	// Get the index files in-memory
	const { files } = await index.getFiles();

	// Or, write the index to disk
	await index.writeFiles({
		outputPath: 'static/pagefind'
	});
}

doTheThing();
console.log('index');
