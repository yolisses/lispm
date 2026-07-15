import type { DocItem } from './DocItem';
import type { MarkdownModule } from './MarkdownModule';
import { titleFromSlug } from './titleFromSlug';
import { toRouteSlug } from './toRouteSlug';

const modules = import.meta.glob('/content/**/*.md', { eager: true }) as Record<
	string,
	MarkdownModule
>;

export const docs: DocItem[] = Object.entries(modules).map(([path, mod]) => {
	const slug = path.replace('/content/', '').replace(/\.md$/, '');

	return {
		slug,
		routeSlug: toRouteSlug(slug),
		title: titleFromSlug(slug),
		metadata: mod.metadata,
		default: mod.default as any
	};
});
