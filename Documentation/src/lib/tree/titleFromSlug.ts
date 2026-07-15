export function titleFromSlug(slug: string) {
	return slug.split('/').pop()?.replace(/-/g, ' ') ?? slug;
}
