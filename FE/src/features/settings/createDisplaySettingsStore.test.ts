import { deferred } from '../feed/tests/helpers';
import { createDisplaySettingsStore } from './createDisplaySettingsStore';
import { createMockDisplaySettingsSource } from './data/createMockDisplaySettingsSource';
import { defaultDisplaySettings, type DisplaySettings, type DisplaySettingsSource } from './displayTypes';

type Result = { owner: string; settings: DisplaySettings };
const initial: Result = { owner: 'A', settings: { ...defaultDisplaySettings } };
const tick = async () => { await Promise.resolve(); await Promise.resolve(); };
function controlled() {
  const requests: ReturnType<typeof deferred<Result>>[] = [];
  const source = {
    read: jest.fn<ReturnType<DisplaySettingsSource['read']>, Parameters<DisplaySettingsSource['read']>>(async () => initial),
    save: jest.fn<ReturnType<DisplaySettingsSource['save']>, Parameters<DisplaySettingsSource['save']>>(() => {
      const request = deferred<Result>(); requests.push(request); return request.promise;
    }),
  };
  return { source, requests, store: createDisplaySettingsStore(source, 'A') };
}

it('중복 조회와 같은 선택을 합치고 메모리 공급부의 소유자를 분리한다', async () => {
  const { source, store } = controlled();
  const read = store.reload(); store.ensureLoaded(); await store.reload(); await read;
  expect(source.read).toHaveBeenCalledTimes(1);
  store.update({ appTheme: 'system' }); expect(source.save).not.toHaveBeenCalled();
  const memory = createMockDisplaySettingsSource({ delayMs: 0 });
  await memory.save('A', { ...defaultDisplaySettings, appTheme: 'dark' }, 1);
  expect((await memory.read('B')).settings.appTheme).toBe('system');
  expect((await memory.read('A')).settings.appTheme).toBe('dark');
  expect((await createMockDisplaySettingsSource({ delayMs: 0 }).read('A')).settings.appTheme).toBe('system');
});

it.each(['success', 'failure'] as const)('빠른 연속 선택에서 이전 저장 %s가 마지막 의도를 덮지 않는다', async (outcome) => {
  const { source, requests, store } = controlled(); await store.reload();
  store.update({ appTheme: 'dark' }); store.update({ fontScale: 120 }); store.update({ appTheme: 'light' });
  expect(source.save).toHaveBeenCalledTimes(1);
  const final = { ...defaultDisplaySettings, appTheme: 'light' as const, fontScale: 120 };
  if (outcome === 'success') requests[0]?.resolve({ owner: 'A', settings: { ...defaultDisplaySettings, appTheme: 'dark' } });
  else requests[0]?.reject(new Error('늦은 실패'));
  await tick();
  expect(source.save).toHaveBeenLastCalledWith('A', final, 3);
  expect(store.getSnapshot()).toMatchObject({ settings: final, hasSaveError: false, isSaving: true });
  requests[1]?.resolve({ owner: 'A', settings: final }); await tick();
  expect(store.getSnapshot()).toMatchObject({ settings: final, isSaving: false, hasSaveError: false });
});

it.each(['success', 'failure'] as const)('최초 조회 %s 중 수동 변경은 지키고 미조회 설정을 기본값으로 덮어쓰지 않는다', async (outcome) => {
  const { source, requests, store } = controlled(); const late = deferred<Result>();
  source.read.mockReturnValueOnce(late.promise); const read = store.reload();
  store.update({ fontScale: 120 });
  expect(source.save).not.toHaveBeenCalled();
  const loaded = { ...defaultDisplaySettings, fontFamily: 'sans' as const, showHighlights: false };
  if (outcome === 'success') late.resolve({ owner: 'A', settings: loaded }); else late.reject(new Error('늦은 조회 실패'));
  await read;
  expect(store.getSnapshot().settings.fontScale).toBe(120);
  if (outcome === 'failure') {
    expect(store.getSnapshot().readStatus).toBe('error');
    expect(source.save).not.toHaveBeenCalled();
    source.read.mockResolvedValueOnce({ owner: 'A', settings: loaded }); await store.reload();
  }
  const merged = { ...loaded, fontScale: 120 };
  expect(source.save).toHaveBeenLastCalledWith('A', merged, 1);
  requests[0]?.resolve({ owner: 'A', settings: merged }); await tick();
  expect(store.getSnapshot()).toMatchObject({ settings: merged, readStatus: 'ready', isSaving: false });
});

it('저장 실패와 잘못된 소유자 응답은 선택을 보존하고 재시도하며 타인 강조 숨김은 다른 설정을 지우지 않는다', async () => {
  const { requests, store } = controlled(); await store.reload();
  const selected = { ...defaultDisplaySettings, showHighlights: false, fontScale: 120 };
  store.update(selected); requests[0]?.resolve({ owner: 'B', settings: selected }); await tick();
  expect(store.getSnapshot()).toMatchObject({ settings: selected, hasSaveError: true });
  store.retry(); requests[1]?.reject(new Error('실패')); await tick();
  expect(store.getSnapshot()).toMatchObject({ settings: selected, hasSaveError: true });
  store.retry(); requests[2]?.resolve({ owner: 'A', settings: selected }); await tick();
  expect(store.getSnapshot()).toMatchObject({ settings: selected, hasSaveError: false });
});

it('조회 실패는 재시도하고 잘못된 값과 다른 값의 저장 응답을 확정하지 않는다', async () => {
  const { source, store, requests } = controlled();
  source.read.mockResolvedValueOnce({ owner: 'B', settings: defaultDisplaySettings });
  await store.reload(); expect(store.getSnapshot().readStatus).toBe('error');
  await store.reload(); expect(store.getSnapshot().readStatus).toBe('ready');
  store.update({ fontScale: 300 }); expect(source.save).not.toHaveBeenCalled();
  store.update({ fontScale: 120 }); requests[0]?.resolve(initial); await tick();
  expect(store.getSnapshot()).toMatchObject({ settings: { fontScale: 120 }, hasSaveError: true });
});
