
type MarkdownModule = {
  default: unknown;
  metadata?: Record<string, unknown>;
};

const modules = import.meta.glob('/content/**/*.md', { eager: true }) as Record<string, MarkdownModule>;

export const docs = Object.entries(modules).map(([path, mod]) => {
  const slug = path.replace('/content/', '').replace(/\.md$/, '');

  return {
    slug,
    metadata: mod.metadata,
    default: mod.default as any
  };
});

export function getDoc(slug: string) {
  return docs.find((doc) => doc.slug === slug);
}