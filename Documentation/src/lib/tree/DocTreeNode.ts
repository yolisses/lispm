import type { DocItem } from './DocItem';

export type DocTreeNode =
	| {
			type: 'folder';
			name: string;
			path: string;
			indexDoc?: DocItem;
			files: DocItem[];
			children: DocTreeNode[];
	  }
	| {
			type: 'file';
			doc: DocItem;
	  };
