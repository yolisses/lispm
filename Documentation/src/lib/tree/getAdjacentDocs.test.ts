import { describe, expect, it } from 'vitest';
import type { DocTreeNode } from './DocTreeNode';
import { getAdjacentDocs } from './getAdjacentDocs';

function page(title: string, routeSlug: string): DocTreeNode {
  return {
    name: title,
    path: routeSlug,
    slug: routeSlug,
    routeSlug,
    title,
    default: () => {},
    children: [],
  };
}

describe('getAdjacentDocs', () => {
  const sections = [
    {
      ...page('Section', 'section'),
      children: [
        page('First', 'section/first'),
        page('Second', 'section/second'),
      ],
    },
  ];

  it('returns the previous and next pages in tree order', () => {
    expect(getAdjacentDocs('section/first', sections)).toEqual({
      previous: sections[0],
      next: sections[0].children[1],
    });
  });

  it('omits a previous page for the first page and a next page for the last', () => {
    expect(getAdjacentDocs('section', sections)).toEqual({
      previous: undefined,
      next: sections[0].children[0],
    });
    expect(getAdjacentDocs('section/second', sections)).toEqual({
      previous: sections[0].children[0],
      next: undefined,
    });
  });

  it('returns no adjacent pages for an unknown route', () => {
    expect(getAdjacentDocs('missing', sections)).toEqual({
      previous: undefined,
      next: undefined,
    });
  });
});
