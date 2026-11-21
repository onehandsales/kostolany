import { createAppIconStore } from './createAppIconStore';
import type { AppIconAdapter, DeviceIcon } from './types';
import { deferred } from '../feed/tests/helpers';

it('미지원·권한 철회·중복 변경을 차단하며 OS 확정은 화면 취소와 분리한다', async () => {
  const pending = deferred<DeviceIcon>();
  const adapter: AppIconAdapter = {
    read: async () => ({ supported: true, applied: 'wordmark-black' }),
    apply: jest.fn(() => pending.promise),
  };
  const store = createAppIconStore(adapter);
  await store.refresh();
  expect(await store.apply('friend', () => false)).toBe('unavailable');
  let active = true;
  const write = store.apply('friend', () => active);
  expect(await store.apply('wordmark-white', () => true)).toBe('unavailable');
  active = false;
  pending.resolve({ supported: true, applied: 'friend' });
  expect(await write).toBe('applied');
  expect(store.getSnapshot().device?.applied).toBe('friend');
  expect(adapter.apply).toHaveBeenCalledTimes(1);
  const unavailable = createAppIconStore({
    ...adapter,
    read: async () => ({ supported: false, applied: null }),
  });
  await unavailable.refresh();
  expect(await unavailable.apply('friend', () => true)).toBe('unavailable');
});
it('오래된 조회가 새 적용을 덮지 않고 실패 후 실제 기기 상태를 재조회한다', async () => {
  const pending = deferred<DeviceIcon>();
  let actual: DeviceIcon = { supported: true, applied: 'wordmark-black' };
  let count = 0;
  const adapter: AppIconAdapter = {
    read: () => (++count === 2 ? pending.promise : Promise.resolve(actual)),
    apply: async (id) => {
      actual = { supported: true, applied: id };
      return actual;
    },
  };
  const store = createAppIconStore(adapter);
  await store.refresh();
  const old = store.refresh();
  await store.apply('friend', () => true);
  pending.resolve({ supported: true, applied: 'wordmark-black' });
  await old;
  expect(store.getSnapshot().device?.applied).toBe('friend');
  adapter.apply = async () => {
    actual = { supported: true, applied: 'wordmark-white' };
    throw new Error('response-lost');
  };
  expect(await store.apply('wordmark-white', () => true)).toBe('failed');
  expect(store.getSnapshot()).toMatchObject({ applying: false, status: 'ready', device: actual });
});
it('동기 예외·잘못된 적용 응답은 성공으로 표시하지 않고 다음 시도를 허용한다', async () => {
  const adapter: AppIconAdapter = {
    read: () => {
      throw new Error('read');
    },
    apply: async () => ({ supported: true, applied: 'wordmark-black' }),
  };
  const store = createAppIconStore(adapter);
  await store.refresh();
  expect(store.getSnapshot().status).toBe('error');
  adapter.read = async () => ({ supported: true, applied: 'wordmark-black' });
  await store.refresh();
  expect(await store.apply('friend', () => true)).toBe('failed');
  adapter.apply = async (id) => ({ supported: true, applied: id });
  expect(await store.apply('friend', () => true)).toBe('applied');
});
