export function toRouteSlug(slug: string) {
	return slug.replace(/\s+/g, '-');
}
