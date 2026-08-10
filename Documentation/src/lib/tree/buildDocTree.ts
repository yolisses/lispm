import { docs } from './content';
import type { DocTreeNode } from './DocTreeNode';

export function buildDocTree() {
  const root: DocTreeNode = {
    name: 'Root',
    path: '',
    slug: '',
    routeSlug: '',
    title: 'Root',
    children: [],
    default: undefined,
  };

  for (const doc of docs) {
    const parts = doc.slug.split('/');
    const fileName = parts.pop() ?? '';
    let current = root;

    for (const part of parts) {
      let child = current.children.find((entry) => entry.name === part);

      if (!child) {
        child = {
          name: part,
          path: `${current.path}/${part}`.replace(/^\//, ''),
          slug: `${current.slug}/${part}`.replace(/^\//, ''),
          routeSlug: `${current.routeSlug}/${part}`.replace(/^\//, ''),
          title: part,
          children: [],
          default: undefined,
        };
        current.children.push(child);
      }

      current = child;
    }

    if (fileName === 'index') {
      current.slug = doc.slug;
      current.routeSlug = doc.routeSlug;
      current.title = doc.title;
      current.metadata = doc.metadata;
      current.default = doc.default;
    } else {
      current.children.push({
        name: doc.title,
        path: `${current.path}/${fileName}`.replace(/^\//, ''),
        slug: doc.slug,
        routeSlug: doc.routeSlug,
        title: doc.title,
        metadata: doc.metadata,
        default: doc.default,
        children: [],
      });
    }
  }

  return root.children;
}
