export function toUrl(relativePath: string) {
	const normalized = relativePath
		.replace(/\\/g, '/')
		.replace(/\/index\.html$/, '/')
		.replace(/\.html$/, '');

	if (!normalized || normalized === '/') {
		return '/';
	}

	return `/${normalized.replace(/^\//, '')}`;
}
