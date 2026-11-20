import { deferred } from '../feed/tests/helpers';
import { createProfileStore } from './createProfileStore';
import { createMockProfileSource } from './data/createMockProfileSource';
import { createProfilePhotoResources } from './profilePhoto';
import { areProfileFieldsEqual, normalizeProfileFields, validateProfileFields } from './profileValidation';
import type { Profile } from './types';
import { findPronouns } from './pronouns';

const photo = (id: string) => ({ id, uri: `file:///cache/${id}.jpg`, width: 100, height: 100 });

it('사진과 대명사의 의미를 비교하고 중복·5개·알 수 없는 후보·잘못된 사진을 거부한다', () => {
  const fields = { name: '독자', bio: '', photo: photo('one'), pronouns: ['he', 'him'] };
  const copy = normalizeProfileFields(fields);
  fields.pronouns.push('they');
  expect(copy.pronouns).toEqual(['he', 'him']);
  expect(areProfileFieldsEqual(copy, { ...copy, pronouns: ['him', 'he'] })).toBe(false);
  expect(areProfileFieldsEqual(copy, { ...copy, photo: photo('two') })).toBe(false);
  expect(areProfileFieldsEqual({ name: '독자', bio: '' }, { name: '독자', bio: '', photo: null, pronouns: [] })).toBe(true);
  expect(validateProfileFields({ ...copy, pronouns: ['he', 'him', 'she', 'her'] })).toBeNull();
  for (const pronouns of [['he', 'he'], ['he', 'him', 'she', 'her', 'they'], ['unknown']]) {
    expect(validateProfileFields({ ...copy, pronouns })).toMatch(/대명사/);
  }
  expect(validateProfileFields({ ...copy, photo: { ...photo('one'), uri: 'https://example.com/photo' } })).toMatch(/사진/);
  expect(findPronouns(' He ')).toEqual(['he', 'her']);
  expect(findPronouns('')).toEqual([]);
});

it('제출 뒤 편집을 닫아도 확정까지 사진을 유지하고 교체·저장소 해제 때만 정리한다', async () => {
  const resources = createProfilePhotoResources();
  const release = jest.fn();
  const lease = resources.adopt({ photo: photo('first'), release });
  const pending = deferred<Profile>();
  const base = createMockProfileSource({ delayMs: 0 });
  const save = jest.fn().mockImplementationOnce(() => pending.promise).mockImplementation(base.saveProfile);
  const store = createProfileStore({ ...base, saveProfile: save }, 'example-reader', resources);
  await store.reload();
  const fields = { name: '독자', bio: '', photo: lease.photo, pronouns: ['they'] };
  const result = store.save(fields);
  lease.release();
  expect(release).not.toHaveBeenCalled();
  pending.resolve({ userId: 'example-reader', ...fields });
  expect(await result).toEqual({ status: 'saved' });
  expect(release).not.toHaveBeenCalled();
  await store.save({ ...fields, photo: null });
  expect(release).toHaveBeenCalledTimes(1);
  store.dispose();
  expect(release).toHaveBeenCalledTimes(1);
});

it('대기 사진 교체와 실패·저장소 이탈은 각 사진의 마지막 참조만 해제한다', async () => {
  const resources = createProfilePhotoResources();
  const releases = [jest.fn(), jest.fn(), jest.fn()];
  const leases = releases.map((release, index) => resources.adopt({ photo: photo(String(index)), release }));
  const requests = [deferred<Profile>(), deferred<Profile>()];
  let index = 0;
  const base = createMockProfileSource({ delayMs: 0 });
  const store = createProfileStore({ ...base, saveProfile: () => requests[index++]!.promise }, 'example-reader', resources);
  await store.reload();
  const commands = leases.map(lease => store.save({ name: '독자', bio: '', photo: lease.photo }));
  leases.forEach(lease => lease.release());
  expect(releases[1]).toHaveBeenCalledTimes(1);
  expect(releases[0]).not.toHaveBeenCalled();
  requests[0]!.reject(new Error('old failure'));
  await commands[0];
  expect(releases[0]).toHaveBeenCalledTimes(1);
  store.dispose();
  requests[1]!.resolve({ userId: 'example-reader', name: '독자', bio: '', photo: leases[2]!.photo });
  await commands[2];
  expect(releases[2]).toHaveBeenCalledTimes(1);
});
