import { promises as fs } from 'node:fs';
import { extname, relative, resolve } from 'node:path';
import { createIndex } from 'pagefind';

async function walkHtmlFiles(dir) {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const files = [];

	for (const entry of entries) {
		const fullPath = resolve(dir, entry.name);

		if (entry.isDirectory()) {
			files.push(...(await walkHtmlFiles(fullPath)));
		} else if (entry.isFile() && extname(entry.name) === '.html') {
			files.push(fullPath);
		}
	}

	return files;
}

function toUrl(relativePath) {
	const normalized = relativePath
		.replace(/\\/g, '/')
		.replace(/\/index\.html$/, '/')
		.replace(/\.html$/, '');

	if (!normalized || normalized === '/') {
		return '/';
	}

	return `/${normalized.replace(/^\//, '')}`;
}

async function doTheThing() {
	console.log('indexing generated html files');
	const buildDir = resolve(process.cwd(), 'build');
	const htmlFiles = await walkHtmlFiles(buildDir);
	const { index } = await createIndex();

	for (const filePath of htmlFiles) {
		const relativePath = relative(buildDir, filePath).replace(/\\/g, '/');
		const html = await fs.readFile(filePath, 'utf8');

		if (!relativePath.startsWith('_app/')) {
			await index.addHTMLFile({
				sourcePath: relativePath,
				url: toUrl(relativePath),
				content: html
			});
		}
	}

	await index.writeFiles({
		outputPath: 'static/pagefind'
	});

	console.log(`indexed ${htmlFiles.length} html files`);
}

doTheThing().catch((error) => {
	console.error(error);
	process.exit(1);
});
