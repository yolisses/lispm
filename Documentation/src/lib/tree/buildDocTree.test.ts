import { describe, expect, it } from 'vitest';
import { buildDocTree } from './buildDocTree';

describe('buildDocTree', () => {
  it('returns top-level categories in semantic order', () => {
    expect(buildDocTree().map((node) => node.name)).toEqual([
      'Methodology',
      'Parts',
      'Theory',
      'ADRs',
      'Appendices',
    ]);
  });

  it('uses the folder name as the title for its index page', () => {
    const parts = buildDocTree().find((node) => node.name === 'Parts');

    expect(parts?.title).toBe('Parts');
  });
});
