import { deferred } from '../feed/tests/helpers';
import { createReadingSettingsStore } from './createReadingSettingsStore';
import { createMockReadingSettingsSource } from './data/createMockReadingSettingsSource';
import type { ReadingSettings, ReadingSettingsSource } from './types';

const initial: ReadingSettings = { userId: 'example-reader', defaultLevel: 'adult' };

it('새 인증 범위의 기본 수준을 이전 조회·저장 실패가 오류 상태로 바꾸지 않는다', async () => {
  const old = deferred<ReadingSettings>(); const saving = deferred<ReadingSettings>();
  const read = jest.fn<Promise<ReadingSettings>, [string]>().mockReturnValueOnce(old.promise).mockResolvedValue(initial);
  const store = createReadingSettingsStore({ fetchSettings: read, setDefaultLevel: () => saving.promise }, initial.userId);
  store.setReadScope('A:1'); store.ensureLoaded();
  store.setReadScope(''); store.setReadScope('A:3'); await store.reload();
  old.reject(new Error('old read')); await Promise.resolve();
  expect(store.getSnapshot()).toMatchObject({ readStatus: 'ready', settings: initial });
  const submitted = store.save('elementary');
  store.setReadScope(''); store.setReadScope('A:5');
  saving.reject(new Error('old write')); expect(await submitted).toEqual({ status: 'failed' });
  expect(store.getSnapshot()).toMatchObject({ settings: initial, hasSaveError: false, isSaving: false });
});
async function controlled() {
  const requests: ReturnType<typeof deferred<ReadingSettings>>[] = [];
  const source = {
    fetchSettings: jest.fn<ReturnType<ReadingSettingsSource['fetchSettings']>, Parameters<ReadingSettingsSource['fetchSettings']>>(async () => initial),
    setDefaultLevel: jest.fn<ReturnType<ReadingSettingsSource['setDefaultLevel']>, Parameters<ReadingSettingsSource['setDefaultLevel']>>(() => {
      const request = deferred<ReadingSettings>(); requests.push(request); return request.promise;
    }),
  };
  const store = createReadingSettingsStore(source, initial.userId);
  await store.reload();
  return { store, source, requests };
}
it('최초 조회와 중복 조회를 합치고 변경 없는 저장은 공급부에 보내지 않는다', async () => {
  const source = createMockReadingSettingsSource({ delayMs: 0 });
  const read = jest.spyOn(source, 'fetchSettings'); const write = jest.spyOn(source, 'setDefaultLevel');
  const store = createReadingSettingsStore(source, initial.userId);
  const pending = store.reload(); store.ensureLoaded(); void store.reload();
  expect(store.getSnapshot().readStatus).toBe('loading'); await pending;
  expect(read).toHaveBeenCalledTimes(1); expect(store.getSnapshot().settings).toEqual(initial);
  expect(await store.save('adult')).toEqual({ status: 'saved' }); expect(write).not.toHaveBeenCalled();
});
it.each(['throw', 'reject', 'wrong-user'] as const)('조회 %s는 오류로 처리하고 수동 재시도로 복구한다', async (mode) => {
  const { source } = await controlled();
  source.fetchSettings.mockImplementationOnce(() => {
    if (mode === 'throw') throw new Error('sync');
    if (mode === 'reject') return Promise.reject(new Error('async'));
    return Promise.resolve({ ...initial, userId: 'foreign' });
  });
  const store = createReadingSettingsStore(source, initial.userId);
  await store.reload(); expect(store.getSnapshot()).toMatchObject({ settings: null, readStatus: 'error' });
  await store.save('middle'); expect(source.setDefaultLevel).not.toHaveBeenCalled();
  await store.reload(); expect(store.getSnapshot().settings).toEqual(initial);
});
it.each(['success', 'failure'] as const)('이전 저장 %s와 중간 제출을 정리하고 마지막 제출을 직렬 반영한다', async (outcome) => {
  const { store, source, requests } = await controlled();
  const first = store.save('elementary'); expect(store.save('elementary')).toBe(first);
  const middle = store.save('middle'); const last = store.save('high'); expect(store.save('high')).toBe(last);
  expect(await middle).toEqual({ status: 'superseded' }); expect(source.setDefaultLevel).toHaveBeenCalledTimes(1);
  if (outcome === 'success') requests[0]?.resolve({ ...initial, defaultLevel: 'elementary' });
  else requests[0]?.reject(new Error('old'));
  expect(await first).toEqual({ status: 'superseded' });
  expect(store.getSnapshot()).toMatchObject({ isSaving: true, hasSaveError: false });
  expect(source.setDefaultLevel).toHaveBeenLastCalledWith({ ...initial, defaultLevel: 'high', commandId: 3 });
  requests[1]?.resolve({ ...initial, defaultLevel: 'high' }); await last;
  expect(store.getSnapshot()).toMatchObject({ settings: { ...initial, defaultLevel: 'high' }, isSaving: false, hasSaveError: false });
});
it.each(['success', 'failure'] as const)('늦은 조회 %s는 이미 저장한 기본 수준을 덮지 않는다', async (outcome) => {
  const { store, source, requests } = await controlled(); const late = deferred<ReadingSettings>();
  source.fetchSettings.mockReturnValueOnce(late.promise); const read = store.reload();
  const write = store.save('middle'); requests[0]?.resolve({ ...initial, defaultLevel: 'middle' }); await write;
  if (outcome === 'success') late.resolve(initial); else late.reject(new Error('old read')); await read;
  expect(store.getSnapshot()).toMatchObject({ settings: { defaultLevel: 'middle' }, readStatus: 'ready' });
});
it('저장 중 최초 값으로 되돌리는 제출도 생략하지 않고 마지막 실패는 직전 확정 값을 보존한다', async () => {
  const { store, source, requests } = await controlled();
  const first = store.save('middle'); const last = store.save('adult');
  requests[0]?.resolve({ ...initial, defaultLevel: 'middle' }); await first;
  expect(source.setDefaultLevel).toHaveBeenLastCalledWith({ ...initial, commandId: 2 });
  requests[1]?.reject(new Error('last')); expect(await last).toEqual({ status: 'failed' });
  expect(store.getSnapshot()).toMatchObject({ settings: { defaultLevel: 'middle' }, isSaving: false, hasSaveError: true });
  const retry = store.save('high'); requests[2]?.resolve({ ...initial, defaultLevel: 'high' }); await retry;
  expect(store.getSnapshot()).toMatchObject({ settings: { defaultLevel: 'high' }, hasSaveError: false });
});
it.each(['wrong-user', 'wrong-level', 'throw'] as const)('저장 %s 응답은 확정하지 않는다', async (mode) => {
  const { store, source, requests } = await controlled();
  if (mode === 'throw') source.setDefaultLevel.mockImplementationOnce(() => { throw new Error('sync'); });
  const save = store.save('middle');
  if (mode !== 'throw') requests[0]?.resolve(mode === 'wrong-user' ? { userId: 'foreign', defaultLevel: 'middle' } : initial);
  expect(await save).toEqual({ status: 'failed' }); expect(store.getSnapshot().settings).toEqual(initial);
});
it('mock 저장과 실패는 A/B별로 분리되고 새 공급부에서 초기화된다', async () => {
  const source = createMockReadingSettingsSource({ delayMs: 0, scenario: 'save-error' });
  for (const userId of ['example-reader', 'example-reader-b']) {
    const input = { userId, defaultLevel: 'middle' as const, commandId: 1 };
    await expect(source.setDefaultLevel(input)).rejects.toThrow();
    await expect(source.setDefaultLevel(input)).resolves.toMatchObject({ userId, defaultLevel: 'middle' });
  }
  expect(await createMockReadingSettingsSource({ delayMs: 0 }).fetchSettings(initial.userId)).toEqual(initial);
  await expect(source.fetchSettings('foreign')).rejects.toThrow();
  await expect(source.setDefaultLevel({ ...initial, commandId: 0 })).rejects.toThrow();
});
