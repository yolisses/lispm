import { docs } from './content';
import type { DocTreeNode } from './DocTreeNode';

export function buildDocTree() {
	const root: DocTreeNode = {
		type: 'folder',
		name: 'Root',
		path: '',
		files: [],
		children: []
	};

	for (const doc of docs) {
		const parts = doc.slug.split('/');
		const fileName = parts.pop() ?? '';
		let current = root;

		for (const part of parts) {
			let child = current.children.find(
				(entry): entry is Extract<DocTreeNode, { type: 'folder' }> =>
					entry.type === 'folder' && entry.name === part
			);

			if (!child) {
				child = {
					type: 'folder',
					name: part,
					path: `${current.path}/${part}`.replace(/^\//, ''),
					files: [],
					children: []
				};
				current.children.push(child);
			}

			current = child;
		}

		if (fileName === 'index') {
			current.indexDoc = doc;
		} else {
			current.files.push(doc);
		}
	}

	return root.children;
}
