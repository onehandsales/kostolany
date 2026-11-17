import { createMockFeedSource } from './mockFeedSource';

it.each(['initial-error', 'page-error'] as const)('reproduces %s once and allows retry', async (scenario) => {
  const source = createMockFeedSource({ scenario, delayMs: 0 });
  const request = { sort: 'latest' as const, cursor: scenario === 'initial-error' ? null : '2' };
  await expect(source(request)).rejects.toThrow('Example feed request failed');
  const page = await source(request);
  expect(page.items.length).toBeGreaterThan(0);
});

it('returns bounded pages ending in a null cursor without mutating earlier pages', async () => {
  const source = createMockFeedSource({ delayMs: 0 });
  const first = await source({ sort: 'latest', cursor: null });
  expect(first.nextCursor).not.toBeNull();
  const second = await source({ sort: 'latest', cursor: first.nextCursor });
  expect(second.nextCursor).toBeNull();
  expect(new Set([...first.items, ...second.items].map((item) => item.id)).size).toBe(4);
  expect(first.items).toHaveLength(2);
});
