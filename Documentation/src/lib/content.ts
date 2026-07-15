
const modules = import.meta.glob('/content/**/*.md', { eager: true });

export const docs = Object.entries(modules).map(([path, mod]) => {
  console.log(mod)
  const slug = path.replace('/content/', '').replace('.md', '');
  return {
    slug,
    metadata: mod.metadata, // frontmatter, if using mdsvex
    default: mod.default    // the compiled component
  };
});