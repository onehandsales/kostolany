import { createHighlightStore } from './createHighlightStore';
import { createMockHighlightSource } from './data/createMockHighlightSource';
import { createSelectionDocument, passageAt, resolvePassage } from './selectionDocument';
import { highlightId, type Highlight, type HighlightValue } from './types';

const document = createSelectionDocument('article', '기사', '작가', [{ text: '첫 문단의 한국어와 🥳 이모지', selectable: true }, { text: '두 번째 문단', selectable: true }]);
const passage = passageAt(document, 0, 5)!;
const highlight: Highlight = { ...passage, id: highlightId(passage), title: document.title, author: document.author, createdAt: '2026-11-19T10:00:00Z' };
const deferred = <T,>() => { let resolve!: (value: T) => void; let reject!: (error: Error) => void; const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; }); return { promise, resolve, reject }; };
beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

it('여러 문단과 UTF-16 구간을 보존하고 미수록 구간·원문 변경·잘못된 범위를 거부한다', () => {
  const selected = passageAt(document, 2, document.text.length)!;
  expect(selected.text).toContain('🥳 이모지\n\n두 번째');
  expect(resolvePassage(document, selected)).toBe(true);
  expect(passageAt(document, -1, 5)).toBeNull();
  expect(passageAt(document, 0, document.text.length + 1)).toBeNull();
  const changed = createSelectionDocument('article', '기사', '작가', [{ text: document.text + '수정', selectable: true }]);
  expect(resolvePassage(changed, selected)).toBe(false);
  const missing = createSelectionDocument('article', '기사', '작가', [{ text: '앞', selectable: true }, { text: '[미수록]', selectable: false }, { text: '뒤', selectable: true }]);
  expect(passageAt(missing, 0, missing.text.length)).toBeNull();
});
it('이모지의 UTF-16 두 코드 단위 중간을 선택 시작이나 끝으로 저장하지 않는다', () => {
  const start = document.text.indexOf('🥳');
  expect(passageAt(document, start, start + 2)?.text).toBe('🥳');
  expect(passageAt(document, start, start + 1)).toBeNull();
  expect(passageAt(document, start + 1, start + 2)).toBeNull();
});
it('저장 중 접근 철회는 확정을 막고 복구 후 재시도와 기존 개인 강조 제거는 허용한다', async () => {
  let available = true;
  const source = createMockHighlightSource({ delayMs: 100, canHighlight: () => available });
  const store = createHighlightStore(source, 'A');
  const command = { operationId: 'pending-access', highlight, selected: true };
  const pending = store.set(command);
  await Promise.resolve(); available = false;
  await jest.runAllTimersAsync();
  expect(await pending).toBe(false);
  const denied = source.read('A'); await jest.runAllTimersAsync();
  expect((await denied).highlights).toEqual([]);
  available = true;
  const retry = store.set(command); await jest.runAllTimersAsync();
  expect(await retry).toBe(true);
  available = false;
  const remove = store.set({ operationId: 'remove-after-revocation', highlight, selected: false });
  await jest.runAllTimersAsync();
  expect(await remove).toBe(true);
  expect(store.getSnapshot().value?.highlights).toEqual([]);
});
it('동일 구간 중복과 재시도가 이중 저장하거나 제거 뒤 되살리지 않는다', async () => {
  const source = createMockHighlightSource({ delayMs: 0 });
  const store = createHighlightStore(source, 'A');
  const add = { operationId: 'add', highlight, selected: true };
  const a = store.set(add); const duplicate = store.set(add);
  expect(a).toBe(duplicate);
  const remove = store.set({ operationId: 'remove', highlight, selected: false });
  await jest.runAllTimersAsync();
  expect(await a).toBe(true); expect(await remove).toBe(true);
  expect(await store.set(add)).toBe(true);
  const repeatSource = source.set('A', add); await jest.runAllTimersAsync();
  expect((await repeatSource).highlights).toEqual([]);
  expect(store.getSnapshot().value?.highlights).toEqual([]);
  expect(await store.set({ ...add, selected: false })).toBe(false);
});
it.each(['success', 'failure'] as const)('저장 뒤 늦은 최초 조회 %s가 최신 하이라이트를 덮지 않는다', async mode => {
  const initial = deferred<HighlightValue>();
  const store = createHighlightStore({ read: () => initial.promise, set: async () => ({ userId: 'A', version: 1, highlights: [highlight] }) }, 'A');
  store.ensure();
  expect(await store.set({ operationId: 'add', highlight, selected: true })).toBe(true);
  if (mode === 'success') initial.resolve({ userId: 'A', version: 0, highlights: [] }); else initial.reject(new Error('old'));
  await Promise.resolve(); await Promise.resolve();
  expect(store.getSnapshot()).toMatchObject({ status: 'ready', readError: false, value: { highlights: [highlight] } });
});
it('삭제 실패는 저장값을 유지하고 같은 명령 재시도로 해당 구간만 제거한다', async () => {
  const other = { ...highlight, articleId: 'other', id: highlightId({ ...highlight, articleId: 'other' }) };
  let fail = true;
  const store = createHighlightStore({ read: async () => ({ userId: 'A', version: 1, highlights: [highlight, other] }), set: async () => {
    if (fail) { fail = false; throw new Error('failure'); }
    return { userId: 'A', version: 2, highlights: [other] };
  } }, 'A');
  store.ensure(); await Promise.resolve();
  const remove = { operationId: 'remove', highlight, selected: false };
  expect(await store.set(remove)).toBe(false);
  expect(store.getSnapshot().value?.highlights).toHaveLength(2);
  expect(await store.set(remove)).toBe(true);
  expect(store.getSnapshot().value?.highlights).toEqual([other]);
});
it('같은 source의 계정별 데이터와 잘못된 소유자·미반영 성공을 격리한다', async () => {
  const source = createMockHighlightSource({ delayMs: 0 });
  const a = createHighlightStore(source, 'A'); const b = createHighlightStore(source, 'B');
  const saving = a.set({ operationId: 'save', highlight, selected: true }); b.ensure(); await jest.runAllTimersAsync();
  expect(await saving).toBe(true); expect(b.getSnapshot().value?.highlights).toEqual([]);
  const bad = createHighlightStore({ read: source.read, set: async () => ({ userId: 'B', version: 2, highlights: [highlight] }) }, 'A');
  expect(await bad.set({ operationId: 'invalid', highlight, selected: true })).toBe(false);
  const missing = createHighlightStore({ read: source.read, set: async () => ({ userId: 'A', version: 2, highlights: [] }) }, 'A');
  expect(await missing.set({ operationId: 'missing', highlight, selected: true })).toBe(false);
});
