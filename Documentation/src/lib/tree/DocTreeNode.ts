export type DocTreeNode = {
  name: string;
  path: string;
  slug: string;
  routeSlug: string;
  title: string;
  metadata?: Record<string, unknown>;
  default: unknown;
  children: DocTreeNode[];
};
