import { deferred } from '../feed/tests/helpers';
import { createProfileStore } from './createProfileStore';
import { createMockProfileSource } from './data/createMockProfileSource';
import type { Profile, ProfileFields, ProfileSource } from './types';

const initial: Profile = { userId: 'example-reader', name: '예시 독자 A', bio: '' };
const fields = (name: string): ProfileFields => ({ name, bio: '새 소개' });
const response = (name: string): Profile => ({ userId: initial.userId, ...fields(name) });

it('재로그인의 새 프로필 조회를 이전 실패와 분리하고 제출한 쓰기의 오류를 새 화면에 남기지 않는다', async () => {
  const old = deferred<Profile>(); const saving = deferred<Profile>();
  const read = jest.fn<Promise<Profile>, [string]>().mockReturnValueOnce(old.promise).mockResolvedValue(initial);
  const store = createProfileStore({ readProfile: read, saveProfile: () => saving.promise }, initial.userId);
  store.setReadScope('A:1'); store.ensureLoaded();
  store.setReadScope(''); store.setReadScope('A:3'); await store.reload();
  old.reject(new Error('old read')); await Promise.resolve();
  expect(store.getSnapshot()).toMatchObject({ readStatus: 'ready', profile: initial });
  const submitted = store.save(fields('확정 요청'));
  store.setReadScope(''); store.setReadScope('A:5');
  saving.reject(new Error('old write')); expect(await submitted).toEqual({ status: 'failed' });
  expect(store.getSnapshot()).toMatchObject({ profile: initial, hasSaveError: false, isSaving: false });
});

async function controlled() {
  const requests: ReturnType<typeof deferred<Profile>>[] = [];
  const source = {
    readProfile: jest.fn<ReturnType<ProfileSource['readProfile']>, Parameters<ProfileSource['readProfile']>>(async () => initial),
    saveProfile: jest.fn<ReturnType<ProfileSource['saveProfile']>, Parameters<ProfileSource['saveProfile']>>(() => {
      const request = deferred<Profile>(); requests.push(request); return request.promise;
    }),
  };
  const store = createProfileStore(source, initial.userId);
  await store.reload();
  return { source, store, requests };
}

it('첫 조회를 합치고 빈 소개를 표시하며 변경 없는 저장은 요청하지 않는다', async () => {
  const source = createMockProfileSource({ delayMs: 0 });
  const spy = jest.spyOn(source, 'readProfile');
  const write = jest.spyOn(source, 'saveProfile');
  const store = createProfileStore(source, initial.userId);
  const read = store.reload(); store.ensureLoaded(); void store.reload();
  expect(store.getSnapshot().readStatus).toBe('loading');
  await read;
  expect(spy).toHaveBeenCalledTimes(1);
  expect(store.getSnapshot().profile).toEqual(initial);
  expect(await store.save({ name: ' 예시  독자 A ', bio: '' })).toEqual({ status: 'saved' });
  expect(write).not.toHaveBeenCalled();
});

it.each(['throw', 'reject', 'wrong-user', 'invalid-fields'] as const)('조회 %s 실패는 데이터 없이 오류를 표시하고 수동 재시도로 복구한다', async (mode) => {
  const { source, store } = await controlled();
  source.readProfile.mockImplementationOnce(() => {
    if (mode === 'throw') throw new Error('sync');
    if (mode === 'reject') return Promise.reject(new Error('async'));
    return Promise.resolve(mode === 'wrong-user' ? { ...initial, userId: 'foreign' } : { ...initial, name: '' });
  });
  const fresh = createProfileStore(source, initial.userId);
  await fresh.reload();
  expect(fresh.getSnapshot()).toMatchObject({ profile: null, readStatus: 'error' });
  await fresh.reload(); expect(fresh.getSnapshot().profile).toEqual(initial);
  expect(store.getSnapshot().profile).toEqual(initial);
});

it('중복 저장은 같은 명령을 공유하고 소개 삭제와 이름 변경을 함께 확정한다', async () => {
  const { store, source, requests } = await controlled();
  const save = store.save(fields('변경'));
  expect(store.save(fields('변경'))).toBe(save);
  expect(source.saveProfile).toHaveBeenCalledTimes(1);
  requests[0]?.resolve(response('변경')); await save;
  const clear = store.save({ name: '변경', bio: '' });
  requests[1]?.resolve({ ...response('변경'), bio: '' }); await clear;
  expect(store.getSnapshot()).toMatchObject({ profile: { name: '변경', bio: '' }, isSaving: false });
});

it.each(['success', 'failure'] as const)('이전 저장 %s 뒤에도 중간 목표를 합치고 마지막 제출만 직렬 저장한다', async (outcome) => {
  const { store, source, requests } = await controlled();
  const first = store.save(fields('첫째'));
  const middle = store.save(fields('둘째'));
  const latest = store.save(fields('마지막'));
  expect(await middle).toEqual({ status: 'superseded' });
  expect(source.saveProfile).toHaveBeenCalledTimes(1);
  if (outcome === 'success') requests[0]?.resolve(response('첫째')); else requests[0]?.reject(new Error('old'));
  expect(await first).toEqual({ status: 'superseded' });
  expect(source.saveProfile).toHaveBeenLastCalledWith(expect.objectContaining({ fields: fields('마지막') }));
  expect(store.getSnapshot()).toMatchObject({ isSaving: true, hasSaveError: false });
  requests[1]?.resolve(response('마지막')); await latest;
  expect(store.getSnapshot()).toMatchObject({ profile: response('마지막'), isSaving: false, hasSaveError: false });
});

it.each(['success', 'failure'] as const)('저장 후 늦은 조회 %s 응답은 새 확정 값을 덮지 않는다', async (outcome) => {
  const { store, source, requests } = await controlled();
  const late = deferred<Profile>(); source.readProfile.mockReturnValueOnce(late.promise);
  const read = store.reload();
  const write = store.save(fields('최신'));
  requests[0]?.resolve(response('최신')); await write;
  if (outcome === 'success') late.resolve(initial); else late.reject(new Error('old read'));
  await read;
  expect(store.getSnapshot()).toMatchObject({ profile: response('최신'), readStatus: 'ready', hasSaveError: false });
});

it('마지막 저장 실패는 확정 값을 지키고 수정한 목표를 다시 제출할 수 있다', async () => {
  const { store, source, requests } = await controlled();
  const save = store.save(fields('실패')); requests[0]?.reject(new Error('write'));
  expect(await save).toEqual({ status: 'failed' });
  expect(store.getSnapshot()).toMatchObject({ profile: initial, isSaving: false, hasSaveError: true });
  const retry = store.save(fields('수정 후 재시도')); requests[1]?.resolve(response('수정 후 재시도')); await retry;
  expect(store.getSnapshot().profile).toEqual(response('수정 후 재시도'));
  expect(source.saveProfile.mock.calls.map(([input]) => input.commandId)).toEqual([1, 2]);
});

it.each(['wrong-user', 'wrong-fields', 'throw'] as const)('저장 %s 응답은 확정하지 않으며 입력 오류는 공급부에 보내지 않는다', async (mode) => {
  const { store, source, requests } = await controlled();
  if (mode === 'throw') source.saveProfile.mockImplementationOnce(() => { throw new Error('sync write'); });
  const saved = store.save(fields('제출'));
  if (mode !== 'throw') requests[0]?.resolve(mode === 'wrong-user' ? { ...response('제출'), userId: 'foreign' } : response('다른 값'));
  expect(await saved).toEqual({ status: 'failed' });
  expect(store.getSnapshot().profile).toEqual(initial);
  await store.save({ name: ' ', bio: '' }); expect(source.saveProfile).toHaveBeenCalledTimes(1);
});

it('첫 저장이 진행 중이어도 원래 값으로 돌아가려는 마지막 의도를 생략하지 않는다', async () => {
  const { store, requests, source } = await controlled();
  const first = store.save(fields('변경')); const last = store.save(initial);
  requests[0]?.resolve(response('변경')); await first;
  expect(source.saveProfile).toHaveBeenLastCalledWith(expect.objectContaining({ fields: { name: initial.name, bio: '' } }));
  requests[1]?.resolve(initial); await last; expect(store.getSnapshot().profile).toEqual(initial);
});

it('mock은 사용자별 저장·실패를 격리하고 같은 이름을 허용하며 새 공급부에서 초기화한다', async () => {
  const source = createMockProfileSource({ delayMs: 0, scenario: 'save-error' });
  for (const userId of ['example-reader', 'example-reader-b']) {
    const input = { userId, commandId: 1, fields: fields('같은 이름') };
    await expect(source.saveProfile(input)).rejects.toThrow();
    await expect(source.saveProfile(input)).resolves.toMatchObject({ userId, name: '같은 이름' });
  }
  expect(await source.readProfile(initial.userId)).toMatchObject({ name: '같은 이름' });
  expect(await createMockProfileSource({ delayMs: 0 }).readProfile(initial.userId)).toEqual(initial);
  await expect(source.readProfile('foreign')).rejects.toThrow();
});
