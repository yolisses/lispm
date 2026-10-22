import type { DocTreeNode } from './DocTreeNode';
import { buildDocTree } from './buildDocTree';

function flattenPages(nodes: DocTreeNode[]): DocTreeNode[] {
  return nodes.flatMap((node) => [
    ...(node.default ? [node] : []),
    ...flattenPages(node.children),
  ]);
}

export function getAdjacentDocs(
  routeSlug: string,
  sections: DocTreeNode[] = buildDocTree(),
) {
  const pages = flattenPages(sections);
  const currentIndex = pages.findIndex((doc) => doc.routeSlug === routeSlug);

  if (currentIndex === -1) {
    return { previous: undefined, next: undefined };
  }

  return {
    previous: pages[currentIndex - 1],
    next: pages[currentIndex + 1],
  };
}
