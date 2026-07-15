
type MarkdownModule = {
  default: unknown;
  metadata?: Record<string, unknown>;
};

function toRouteSlug(slug: string) {
  return slug.replace(/\s+/g, '-');
}

const modules = import.meta.glob('/content/**/*.md', { eager: true }) as Record<string, MarkdownModule>;

export const docs = Object.entries(modules).map(([path, mod]) => {
  const slug = path.replace('/content/', '').replace(/\.md$/, '');

  return {
    slug,
    routeSlug: toRouteSlug(slug),
    metadata: mod.metadata,
    default: mod.default as any
  };
});

export function getDoc(slug: string) {
  const normalizedSlug = toRouteSlug(slug);

  return docs.find((doc) => doc.routeSlug === normalizedSlug || doc.slug === slug);
}