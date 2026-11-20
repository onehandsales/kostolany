import { createDigestStore } from './createDigestStore';
import { createMockDigestSource, digestFixtures } from './createMockDigestSource';
import type { DigestSource } from './types';

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
const flush = async () => { for (let i = 0; i < 10; i++) await Promise.resolve(); };

it('서로 다른 시간대의 발행을 실제 시각으로 정렬하고 달력에 없는 날짜는 거절한다', async () => {
  const source = createMockDigestSource({ delayMs: 0, initial: [
    { ...digestFixtures[0]!, id: 'earlier', publishedAt: '2025-06-12T08:00:00+09:00' },
    { ...digestFixtures[0]!, id: 'later', publishedAt: '2025-06-12T01:00:00Z' },
  ] });
  const store = createDigestStore(source, 'A'); const close = store.connect(); await flush();
  expect(store.getSnapshot().selectedId).toBe('later');
  source.replaceIssues([{ ...digestFixtures[0]!, date: '2025-02-31' }]); await flush();
  expect(store.getSnapshot()).toMatchObject({ catalogStatus: 'error', digest: null }); close();
});

it('발행 묶음 열 개를 고르며 날짜 간격과 빈 기사를 수신 주기와 혼동하지 않는다', async () => {
  const source = createMockDigestSource({ delayMs: 0 });
  const store = createDigestStore(source, 'A'); const close = store.connect(); await flush();
  expect(store.getSnapshot().issues).toHaveLength(10);
  expect(store.getSnapshot().issues[9]?.date).toBe('2025-05-31');
  await store.select('digest-2025-06-07');
  expect(store.getSnapshot()).toMatchObject({ status: 'ready', digest: { articleIds: [] } });
  close();
});

it('조회 실패 재시도는 같은 날짜를 유지하고 잘못된 계정 응답을 거절한다', async () => {
  const source = createMockDigestSource({ delayMs: 0, scenario: 'detail-error' });
  const store = createDigestStore(source, 'A'); const close = store.connect(); await flush();
  expect(store.getSnapshot().status).toBe('error');
  await store.retry(); expect(store.getSnapshot().status).toBe('ready');
  source.fetchDigest = async () => ({ userId: 'B', digest: digestFixtures[0]! });
  await store.retry(); expect(store.getSnapshot().status).toBe('error');
  close();
});

it('빠른 날짜 A·B·A 선택에서 오래된 성공과 실패가 마지막 선택을 덮지 않는다', async () => {
  const source = createMockDigestSource({ delayMs: 0 });
  const store = createDigestStore(source, 'A'); const close = store.connect(); await flush();
  const first = deferred<Awaited<ReturnType<DigestSource['fetchDigest']>>>();
  const second = deferred<Awaited<ReturnType<DigestSource['fetchDigest']>>>();
  const original = source.fetchDigest;
  source.fetchDigest = jest.fn().mockReturnValueOnce(first.promise).mockReturnValueOnce(second.promise).mockImplementation(original);
  const p1 = store.select('digest-2025-06-12'); const p2 = store.select('digest-2025-06-11');
  await store.select('digest-2025-06-12');
  second.resolve(await original('A', 'digest-2025-06-11')); first.reject(new Error('OLD'));
  await Promise.all([p1, p2]);
  expect(store.getSnapshot()).toMatchObject({ selectedId: 'digest-2025-06-12', status: 'ready', digest: { id: 'digest-2025-06-12' } });
  close();
});

it('원본에서 선택 발행이 사라지면 최신 묶음으로 이동하고 늦은 상세를 폐기한다', async () => {
  const source = createMockDigestSource({ delayMs: 0 });
  const store = createDigestStore(source, 'A'); const close = store.connect(); await flush();
  const old = deferred<Awaited<ReturnType<DigestSource['fetchDigest']>>>();
  const original = source.fetchDigest;
  source.fetchDigest = jest.fn().mockReturnValueOnce(old.promise).mockImplementation(original);
  const pending = store.select('digest-2025-06-12');
  source.replaceIssues(digestFixtures.slice(1)); await flush();
  old.resolve({ userId: 'A', digest: digestFixtures[0]! }); await pending;
  expect(store.getSnapshot()).toMatchObject({ selectedId: 'digest-2025-06-11', digest: { id: 'digest-2025-06-11' } });
  source.replaceIssues([]); await flush();
  expect(store.getSnapshot()).toMatchObject({ selectedId: null, status: 'ready', digest: null }); close();
});

it('계정 수명 종료와 같은 계정 재연결 뒤 이전 응답은 새 조회를 덮지 않는다', async () => {
  const source = createMockDigestSource({ delayMs: 0 });
  const old = deferred<Awaited<ReturnType<DigestSource['fetchIssues']>>>();
  const original = source.fetchIssues;
  source.fetchIssues = jest.fn().mockReturnValueOnce(old.promise).mockImplementation(original);
  const store = createDigestStore(source, 'A'); const close = store.connect(); close();
  const closeAgain = store.connect(); await flush();
  old.resolve({ userId: 'A', issues: [] }); await flush();
  expect(store.getSnapshot().issues).toHaveLength(10);
  closeAgain();
});

it('카탈로그 실패와 빈 원본을 구분하고 수동 복구한다', async () => {
  const source = createMockDigestSource({ delayMs: 0, scenario: 'catalog-error' });
  const store = createDigestStore(source, 'A'); const close = store.connect(); await flush();
  expect(store.getSnapshot().catalogStatus).toBe('error');
  await store.retry(); expect(store.getSnapshot().catalogStatus).toBe('ready');
  source.replaceIssues([]); await flush(); expect(store.getSnapshot().status).toBe('ready'); close();
});
