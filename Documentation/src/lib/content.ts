
type MarkdownModule = {
  default: unknown;
  metadata?: Record<string, unknown>;
};

export type DocItem = {
  slug: string;
  routeSlug: string;
  title: string;
  metadata?: Record<string, unknown>;
  default: any;
};

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

function toRouteSlug(slug: string) {
  return slug.replace(/\s+/g, '-');
}

function titleFromSlug(slug: string) {
  return slug.split('/').pop()?.replace(/-/g, ' ') ?? slug;
}

const modules = import.meta.glob('/content/**/*.md', { eager: true }) as Record<string, MarkdownModule>;

export const docs: DocItem[] = Object.entries(modules).map(([path, mod]) => {
  const slug = path.replace('/content/', '').replace(/\.md$/, '');

  return {
    slug,
    routeSlug: toRouteSlug(slug),
    title: titleFromSlug(slug),
    metadata: mod.metadata,
    default: mod.default as any
  };
});

export function getDoc(slug: string) {
  const normalizedSlug = toRouteSlug(slug);

  return docs.find((doc) => doc.routeSlug === normalizedSlug || doc.slug === slug);
}

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
      let child = current.children.find((entry): entry is Extract<DocTreeNode, { type: 'folder' }> => entry.type === 'folder' && entry.name === part);

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