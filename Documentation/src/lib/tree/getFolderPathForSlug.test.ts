import { describe, expect, it } from 'vitest';
import { getFolderPathForSlug } from './getFolderPathForSlug';

describe('getFolderPathForSlug', () => {
	it('returns the folder path for folder index routes', () => {
		expect(getFolderPathForSlug('Appendices')).toBe('Appendices');
		expect(getFolderPathForSlug('Appendices/index')).toBe('Appendices');
		expect(getFolderPathForSlug('Methodology/Subsection/index')).toBe('Methodology/Subsection');
	});

	it('returns an empty path for the root index and regular document routes', () => {
		expect(getFolderPathForSlug('')).toBe('');
		expect(getFolderPathForSlug('index')).toBe('');
		expect(getFolderPathForSlug('Appendices/Bootstraping')).toBe('');
	});
});
