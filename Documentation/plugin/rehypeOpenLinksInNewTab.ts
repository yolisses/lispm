type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

export function rehypeOpenLinksInNewTab() {
  return (tree: HastNode) => {
    const visit = (node: HastNode) => {
      const href = node.properties?.href;
      if (
        node.type === 'element' &&
        node.tagName === 'a' &&
        typeof href === 'string' &&
        /^(https?:)?\/\//i.test(href)
      ) {
        node.properties ??= {};
        node.properties.target = '_blank';
        node.properties.rel = ['noopener', 'noreferrer'];
      }

      node.children?.forEach(visit);
    };

    visit(tree);
  };
}
