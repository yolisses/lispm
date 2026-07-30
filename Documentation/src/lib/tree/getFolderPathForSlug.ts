export function getFolderPathForSlug(slug: string) {
  const normalizedSlug = slug
    .replace(/\\/g, '/')
    .replace(/^\//, '')
    .replace(/\/$/, '');

  if (!normalizedSlug || normalizedSlug === 'index') {
    return '';
  }

  const parts = normalizedSlug.split('/');
  const lastPart = parts.at(-1);

  if (lastPart === 'index') {
    return parts.slice(0, -1).join('/');
  }

  if (parts.length > 1) {
    return '';
  }

  return normalizedSlug;
}
