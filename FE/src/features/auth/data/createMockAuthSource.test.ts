import { createMockAuthSource } from './createMockAuthSource';
import { mockUserA, mockUserB } from './mockUsers';

it('실제 계정 없이 두 독자의 성공·취소·실패와 로그아웃을 재현한다', async () => {
  const source = createMockAuthSource({ delayMs: 0 });
  for (const user of [mockUserA, mockUserB]) {
    expect(await source.signIn({ userId: user.id, scenario: 'success' })).toEqual({ status: 'success', user });
    expect(await source.signIn({ userId: user.id, scenario: 'cancel' })).toEqual({ status: 'cancelled' });
    await expect(source.signIn({ userId: user.id, scenario: 'failure' })).rejects.toThrow('sign-in');
    await expect(source.signOut({ userId: user.id, scenario: 'failure' })).rejects.toThrow('sign-out');
    await expect(source.signOut({ userId: user.id, scenario: 'success' })).resolves.toBeUndefined();
  }
  await expect(source.signIn({ userId: 'unknown', scenario: 'success' })).rejects.toThrow('Unknown');
  await expect(source.signOut({ userId: 'unknown', scenario: 'success' })).rejects.toThrow('Unknown');
});

it('느린 모드는 지정 시간 전에 성공하지 않는다', async () => {
  jest.useFakeTimers();
  try {
    const source = createMockAuthSource({ slowDelayMs: 4000 });
    const resolved = jest.fn(); const request = source.signIn({ userId: mockUserA.id, scenario: 'slow' }).then(resolved);
    await jest.advanceTimersByTimeAsync(3999); expect(resolved).not.toHaveBeenCalled();
    await jest.advanceTimersByTimeAsync(1); await request;
    expect(resolved).toHaveBeenCalledWith({ status: 'success', user: mockUserA });
  } finally { jest.useRealTimers(); }
});
