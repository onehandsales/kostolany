import { createMockSearchSource } from './mockSearchSource';

describe('local article search contract', () => {
  it('searches titles and summaries literally with AND terms and stable fixture order', async () => {
    const source = createMockSearchSource({ delayMs: 0 });
    expect((await source('금리')).items.map((item) => item.id)).toEqual(['example-latest-rates', 'example-popular-debt']);
    expect((await source('금리 계약')).items.map((item) => item.id)).toEqual(['example-popular-debt']);
    expect((await source('심리')).items.map((item) => item.id)).toEqual(['example-recommended-psychology']);
    expect((await source('.*')).items).toEqual([]);
  });

  it('normalizes case, whitespace and NFC; includes the source and excludes detail-only text', async () => {
    const source = createMockSearchSource({ delayMs: 0 });
    const result = await source('  KOSTOLANY\t 금리\n ');
    expect(result.query).toBe('kostolany 금리');
    expect(result.items).toHaveLength(2);
    expect((await source('금리'.normalize('NFD'))).items).toEqual((await source('금리')).items);
    expect((await source('Kostolany')).items).toHaveLength(10);
    expect((await source('가상 은행의 신규 예금 안내')).items).toEqual([]);
    expect(await source(' \t\n ')).toEqual({ query: '', items: [] });
  });

  it('fails once per normalized query, then retries that query successfully', async () => {
    const source = createMockSearchSource({ scenario: 'initial-error', delayMs: 0 });
    await expect(source(' 금리 ')).rejects.toThrow('Example search failed');
    expect((await source('금리')).items).toHaveLength(2);
    await expect(source('환율')).rejects.toThrow();
    expect((await source('환율')).items.map((item) => item.id)).toEqual(['example-latest-exchange']);
  });
});
