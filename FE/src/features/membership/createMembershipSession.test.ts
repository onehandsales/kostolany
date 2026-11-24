import { createMembershipSession } from './createMembershipSession';
import { createMockMembershipSource, existingMember } from './createMockMembershipSource';
import { hasMembershipBenefit, type MembershipRecord, type MembershipSource } from './types';
import { deferred } from '../feed/tests/helpers';

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());
it('중복 제출·실패 후 재시도는 선택을 보존하고 확정된 권한만 공유한다', async () => {
  const source = createMockMembershipSource({ records: [], scenario: 'fail-once', delayMs: 20 });
  const purchase = jest.spyOn(source, 'purchase');
  const session = createMembershipSession(source, 'A', () => true);
  session.activate();
  session.setPeriod('annually');
  const first = session.select('friend');
  await session.select('member');
  expect(purchase).toHaveBeenCalledTimes(1);
  expect(source.getSnapshot()).toEqual([]);
  await jest.advanceTimersByTimeAsync(20);
  await first;
  expect(session.getSnapshot()).toEqual({ period: 'annually', selected: 'friend', phase: 'error' });
  const retry = session.select('friend');
  await jest.advanceTimersByTimeAsync(20);
  await retry;
  expect(source.getSnapshot()[0]).toMatchObject({ userId: 'A', tier: 'friend', period: 'annually' });
  expect(session.getSnapshot().phase).toBe('success');
  session.close();
  expect(source.getSnapshot()).toHaveLength(1);
});
it('주기 변경과 닫기는 미확정 요청을 취소하며 이미 확정된 저장을 되돌리지 않는다', async () => {
  const source = createMockMembershipSource({ records: [], delayMs: 30 });
  const session = createMembershipSession(source, 'A', () => true);
  session.activate();
  const old = session.select('member');
  session.setPeriod('annually');
  const latest = session.select('friend');
  await jest.advanceTimersByTimeAsync(30);
  await Promise.all([old, latest]);
  expect(source.getSnapshot()).toHaveLength(1);
  expect(source.getSnapshot()[0]).toMatchObject({ tier: 'friend', period: 'annually' });
  session.close();
  expect(source.getSnapshot()[0]?.tier).toBe('friend');
  const other = createMembershipSession(source, 'B', () => true);
  other.activate();
  const cancelled = other.select('member');
  other.close();
  await jest.advanceTimersByTimeAsync(30);
  await cancelled;
  expect(source.getSnapshot()).toHaveLength(1);
});
it.each(['success', 'failure'] as const)(
  '계정·화면 수명 종료 뒤 늦은 %s는 초안·오류를 부활시키지 않는다',
  async (outcome) => {
    const pending = deferred<Awaited<ReturnType<MembershipSource['purchase']>>>();
    const source = createMockMembershipSource({ records: [] });
    const controlled = { ...source, purchase: jest.fn(() => pending.promise) };
    let current = true;
    const session = createMembershipSession(controlled, 'A', () => current);
    const dispose = session.activate();
    const request = session.select('friend');
    current = false;
    dispose();
    session.close();
    if (outcome === 'success') pending.resolve({ ...existingMember, userId: 'A', tier: 'friend' });
    else pending.reject(new Error('late'));
    await request;
    expect(session.getSnapshot().phase).toBe('choosing');
    expect(source.getSnapshot()).toEqual([]);
  },
);
it('source는 취소된 세션의 권한을 확정하지 않고 기존 계정의 확정 권한은 보존한다', async () => {
  const source = createMockMembershipSource({ delayMs: 10 });
  let current = true;
  const promise = source.purchase(
    { userId: 'B', tier: 'friend', period: 'monthly', requestId: 'old' },
    new AbortController().signal,
    () => current,
  );
  const rejected = expect(promise).rejects.toThrow('MEMBERSHIP_CANCELLED');
  current = false;
  await jest.advanceTimersByTimeAsync(10);
  await rejected;
  expect(source.getSnapshot()).toEqual([existingMember]);
});
it('같은 명령 재시도는 한 권한을 유지하고 응답 소유자·기준 저장소 불일치를 거절한다', async () => {
  const source = createMockMembershipSource({ records: [], delayMs: 0 });
  const request = { userId: 'A', tier: 'member' as const, period: 'monthly' as const, requestId: 'same' };
  const first = await source.purchase(request, new AbortController().signal, () => true);
  expect(await source.purchase(request, new AbortController().signal, () => true)).toBe(first);
  expect(source.getSnapshot()).toHaveLength(1);
  await expect(
    source.purchase({ ...request, tier: 'friend' }, new AbortController().signal, () => true),
  ).rejects.toThrow('MEMBERSHIP_CONFLICT');
  const invalid = createMembershipSession(
    { ...source, purchase: async () => ({ ...first, userId: 'B' }) },
    'A',
    () => true,
  );
  invalid.activate();
  await invalid.select('member');
  expect(invalid.getSnapshot().phase).toBe('error');
});
it('Free·Member·Friend의 오디오·오프라인·Friend 링크·아이콘 권한을 구분한다', () => {
  for (const tier of ['free', 'member', 'friend'] as const) {
    expect(hasMembershipBenefit(tier, 'audio')).toBe(tier !== 'free');
    expect(hasMembershipBenefit(tier, 'offline')).toBe(tier !== 'free');
    expect(hasMembershipBenefit(tier, 'friend-link')).toBe(tier === 'friend');
    expect(hasMembershipBenefit(tier, 'custom-icon')).toBe(tier === 'friend');
  }
});

it.each(['missing-id', 'different-plan'] as const)('확정되지 않은 %s 응답은 성공 안내를 열지 않고 재시도 선택을 보존한다', async kind => {
  const record: MembershipRecord = { ...existingMember, userId: 'A', tier: 'friend', period: 'annually',
    requestId: kind === 'missing-id' ? undefined as unknown as string : 'same-id' };
  const source = createMockMembershipSource({ records: kind === 'missing-id' ? [] : [{ ...record, tier: 'member' }] });
  source.purchase = async () => record;
  const session = createMembershipSession(source, 'A', () => true);
  session.activate(); session.setPeriod('annually');
  await session.select('friend');
  expect(session.getSnapshot()).toEqual({ period: 'annually', selected: 'friend', phase: 'error' });
});

it('이미 완료한 명령의 재요청은 더 새로운 변경 요청을 무효화하지 않는다', async () => {
  const source = createMockMembershipSource({ records: [], delayMs: 10 });
  const request = { userId: 'A', tier: 'member' as const, period: 'monthly' as const, requestId: 'old' };
  const first = source.purchase(request, new AbortController().signal, () => true);
  await jest.advanceTimersByTimeAsync(10);
  await first;
  const latest = source.purchase(
    { ...request, tier: 'friend', requestId: 'latest' },
    new AbortController().signal,
    () => true,
  );
  await source.purchase(request, new AbortController().signal, () => true);
  await jest.advanceTimersByTimeAsync(10);
  await latest;
  expect(source.getSnapshot()[0]?.tier).toBe('friend');
});
