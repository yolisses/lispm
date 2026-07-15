export type DocItem = {
	slug: string;
	routeSlug: string;
	title: string;
	metadata?: Record<string, unknown>;
	default: any;
};
