import { docs } from './content';
import { toRouteSlug } from './toRouteSlug';

export function getDoc(slug: string) {
	const normalizedSlug = toRouteSlug(slug);

	return docs.find((doc) => doc.routeSlug === normalizedSlug || doc.slug === slug);
}
