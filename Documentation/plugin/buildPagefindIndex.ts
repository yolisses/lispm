import type { fs } from 'node:fs/promises';
import { createIndex } from 'pagefind';
import { relative, resolve } from 'path/posix';
import { toUrl } from './toUrl';
import { walkHtmlFiles } from './walkHtmlFiles';

export async function buildPagefindIndex() {
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

	await index.writeFiles({ outputPath: resolve(process.cwd(), 'static/pagefind') });
}
