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
});
