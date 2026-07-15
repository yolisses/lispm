import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { playwright } from '@vitest/browser-playwright';
import { mdsvex } from 'mdsvex';
import { promises as fs } from 'node:fs';
import { extname, relative, resolve } from 'node:path';
import { createIndex } from 'pagefind';
import { svelteSitemap } from 'svelte-sitemap/vite'; // <-- Add svelte-sitemap vite plugin
import { defineConfig } from 'vitest/config';

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

async function buildPagefindIndex() {
	const buildDir = resolve(process.cwd(), 'build');

	try {
		await fs.access(buildDir);
	} catch {
		return;
	}

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
		outputPath: resolve(process.cwd(), 'static/pagefind')
	});
}

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
			preprocess: [mdsvex({ extensions: ['.svx', '.md'] })],
			extensions: ['.svelte', '.svx', '.md']
		}),
		{
			name: 'pagefind-build-plugin',
			apply: 'build',
			enforce: 'post',
			async closeBundle() {
				await buildPagefindIndex();
			}
		},
		svelteSitemap({ domain: 'https://lispm.site' })
	],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},

			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
