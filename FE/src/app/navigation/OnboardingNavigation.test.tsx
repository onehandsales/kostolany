import { act, fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import type { ComponentProps } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './AppNavigator';
import { createMockAuthSource } from '../../features/auth/data/createMockAuthSource';
import { createMockOnboardingSource, type OnboardingRecord, type OnboardingSource } from '../../features/onboarding/onboardingSource';
import { createMockNotificationPermission } from '../../features/onboarding/notificationPermission';
import type { NotificationPermission, NotificationPermissionSource } from '../../features/onboarding/notificationPermission';
import { createMockRelationshipSource } from '../../features/community/data/createMockRelationshipSource';
import { createMockDirectorySource } from '../../features/community/DirectoryProvider';
import { createMockTopicSource } from '../../features/topics/TopicProvider';
import { deferred } from '../../features/feed/tests/helpers';
import { createMockModerationSource } from '../../features/moderation/data/createMockModerationSource';
import type { ModerationValue } from '../../features/moderation/types';
import { mockUserA, mockUserB } from '../../features/auth/data/mockUsers';

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());
const button = (name: string) => screen.getByRole('button', { name });
const flush = () => act(async () => { await jest.advanceTimersByTimeAsync(1500); });
async function setup(source = createMockOnboardingSource({ delayMs: 0 }), failing = false, permissionSource?: NotificationPermissionSource,
  extra: Partial<ComponentProps<typeof AppNavigator>> = {}) {
  const auth = createMockAuthSource({ delayMs: 0 });
  const relationshipSource = createMockRelationshipSource({ delay: 0, scenario: failing ? 'write-error' : 'normal' });
  const permission = permissionSource ?? createMockNotificationPermission({ delayMs: 0, failures: failing ? 1 : 0, outcome: 'denied' });
  const topicSource = createMockTopicSource({ delay: 0, scenario: failing ? 'read-error' : 'normal' });
  const directorySource = createMockDirectorySource({ delay: 0, scenario: failing ? 'read-error' : 'normal' });
  const tree = (next: OnboardingSource = source, overrides: Partial<ComponentProps<typeof AppNavigator>> = {}) => <SafeAreaProvider><AppNavigator authSource={auth}
    onboardingSource={next} notificationPermissionSource={permission} relationshipSource={relationshipSource}
    topicSource={topicSource} directorySource={directorySource} {...extra} {...overrides} /></SafeAreaProvider>;
  const view = await render(tree());
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await user.press(button('Write a story')); await user.press(button('Create account'));
  await user.press(button('Google로 로그인 (모의)')); await flush();
  return { user, source, relationshipSource, permission, replace: (next: OnboardingSource) => view.rerender(tree(next)),
    replaceSources: (next: Partial<ComponentProps<typeof AppNavigator>>) => view.rerender(tree(source, next)) };
}
async function followingSource() {
  const source = createMockOnboardingSource({ delayMs: 0 });
  await source.save(mockUserA.id, { operationId: 'interests', expectedVersion: 0, step: 'interests' }, new AbortController().signal);
  await source.save(mockUserA.id, { operationId: 'following', expectedVersion: 1, step: 'following' }, new AbortController().signal);
  return source;
}
it('추천은 동적 B와 같은 ID의 Publication을 구분하고 확정 Follow를 관계 관리에서 해제한다', async () => {
  const source = await followingSource();
  const relationshipSource = createMockRelationshipSource({ delay: 0, scenario: 'write-error' });
  const { user } = await setup(source, false, undefined, {
    relationshipSource,
    directorySource: async () => ({ identities: [{ kind: 'publication', id: mockUserA.id, name: '같은 ID 발행물', stories: [], pinned: [], lists: [] }], following: {} }),
  });
  expect(button('Follow 같은 ID 발행물')).toBeVisible();
  await user.press(button(`Follow ${mockUserB.name}`)); await flush();
  await user.press(button(`Retry following ${mockUserB.name}`)); await flush();
  expect(button(`Following ${mockUserB.name}`)).toBeVisible();
  await user.press(button('온보딩 닫기')); await user.press(screen.getByRole('tab', { name: '프로필' })); await flush();
  await user.press(button('My following')); await flush();
  await user.press(button(`Following ${mockUserB.name}`)); await user.press(button(`Unfollow ${mockUserB.name}`)); await flush();
  const read = relationshipSource.read(mockUserA.id); await flush();
  expect((await read).relationships.find(item => item.target.id === mockUserB.id)?.following).toBe(false);
}, 30000);
it('Mute/Block 조회 중·실패에는 추천을 노출하지 않고 재시도 후 필터와 Publication 종류를 유지한다', async () => {
  const source = await followingSource(); const moderation = createMockModerationSource({ delay: 0 });
  const late = deferred<ModerationValue>();
  await moderation.execute(mockUserA.id, { operationId: 'mute', action: { kind: 'mute', target: { kind: 'writer', id: mockUserB.id }, active: true } });
  const read = jest.fn(moderation.read).mockReturnValueOnce(late.promise);
  const { user } = await setup(source, false, undefined, { moderationSource: { ...moderation, read } });
  expect(screen.queryByRole('button', { name: `Follow ${mockUserB.name}` })).toBeNull();
  await act(async () => late.reject(new Error('read failed')));
  expect(screen.queryByRole('button', { name: 'Follow iris ୨୧' })).toBeNull();
  await user.press(button('추천 다시 불러오기')); await flush();
  expect(screen.queryByRole('button', { name: `Follow ${mockUserB.name}` })).toBeNull();
  expect(button('Follow Write A Catalyst')).toBeVisible();
}, 30000);
it('알림 요청 중 OS 뒤로는 단계를 바꾸지 않고 닫기·A→B→A 뒤 늦은 허용은 새 세션에 적용하지 않는다', async () => {
  const source = await followingSource(); const late = deferred<NotificationPermission>();
  const permission: NotificationPermissionSource = { kind: 'mock', read: () => 'undetermined', request: () => late.promise };
  const { user } = await setup(source, false, permission);
  await user.press(button('추천 팔로우 완료')); await user.press(button('모의 알림 사용'));
  await fireEvent(screen.getByLabelText('관심사 온보딩'), 'requestClose'); await flush();
  expect(screen.getByText('Stay up to date.')).toBeVisible();
  await user.press(button('온보딩 닫기'));
  await user.press(screen.getByRole('tab', { name: '프로필' })); await flush();
  await user.press(button('로그아웃')); await user.press(button('로그아웃 확인'));
  await user.press(screen.getByRole('radio', { name: mockUserB.name })); await user.press(button('Google로 로그인 (모의)')); await flush();
  await act(async () => late.resolve('granted'));
  expect(screen.queryByText('Stay up to date.')).toBeNull();
  expect((await source.read(mockUserA.id, new AbortController().signal)).step).toBe('notifications');
  await user.press(button('로그아웃')); await user.press(button('로그아웃 확인'));
  await user.press(button('Google로 로그인 (모의)')); await flush();
  expect(screen.getByText('Stay up to date.')).toBeVisible();
  expect(button('모의 알림 사용')).toBeEnabled();
}, 30000);
it('토픽 공급부 교체는 확정 관심사는 보존하고 화면의 미제출 선택을 폐기한다', async () => {
  const { user, replaceSources } = await setup(createMockOnboardingSource({ delayMs: 0, showWelcome: false }));
  await user.press(screen.getByRole('checkbox', { name: 'Life 관심사' }));
  await replaceSources({ topicSource: createMockTopicSource({ delay: 0 }) }); await flush();
  expect(screen.getByRole('checkbox', { name: 'Life 관심사' })).not.toBeChecked();
}, 30000);
it('현재 카탈로그에 없는 확정 관심사는 보이지 않는 선택 해제로 처리하지 않는다', async () => {
  const relationshipSource = createMockRelationshipSource({ delay: 0 });
  const seed = relationshipSource.set(mockUserA.id, { operationId: 'archived-topic',
    relationship: { target: { kind: 'topic', id: 'archived-topic' }, following: true, email: false } });
  await flush(); await seed;
  const { user } = await setup(createMockOnboardingSource({ delayMs: 0, showWelcome: false }), false, undefined, { relationshipSource });
  for (const name of ['Technology', 'Writing', 'Life']) await user.press(screen.getByRole('checkbox', { name: `${name} 관심사` }));
  await user.press(button('관심사 다음')); await flush();
  const read = relationshipSource.read(mockUserA.id); await flush();
  expect((await read).relationships.find(item => item.target.id === 'archived-topic')?.following).toBe(true);
}, 30000);
it('신규 가입은 관심사 최소 세 개와 선택 취소를 거쳐 팔로우 없이 완료하고 원래 홈에서 개인 행동을 다시 실행한다', async () => {
  const { user, source, relationshipSource } = await setup();
  await user.press(button('온보딩 계속'));
  for (const topic of ['Technology', 'Writing']) await user.press(screen.getByRole('checkbox', { name: `${topic} 관심사` }));
  expect(button('관심사 다음')).toBeDisabled();
  await user.press(screen.getByRole('checkbox', { name: 'Life 관심사' })); expect(button('관심사 다음')).toBeEnabled();
  await user.press(screen.getByRole('checkbox', { name: 'Life 관심사' })); expect(button('관심사 다음')).toBeDisabled();
  await user.press(screen.getByRole('checkbox', { name: 'Life 관심사' }));
  await user.press(button('관심사 다음')); await flush();
  const recommended = screen.getAllByRole('button', { name: /^Follow / }).slice(0, 4).map(item => item.props.accessibilityLabel);
  expect(recommended).toEqual(['Follow iris ୨୧', 'Follow Write A Catalyst', 'Follow GeekSociety', 'Follow Level Up Coding']);
  await user.press(button('추천 팔로우 완료')); await user.press(button('알림 안내 건너뛰기'));
  await user.press(button('멤버십 안내 열기')); await user.press(button('멤버십 닫기')); await user.press(button('온보딩 완료'));
  expect(screen.queryByLabelText('글 제목')).toBeNull();
  expect((await source.read('example-reader', new AbortController().signal)).step).toBe('complete');
  const relationships = relationshipSource.read('example-reader'); await flush();
  expect((await relationships).relationships.filter(value => value.following)).toHaveLength(3);
  await user.press(screen.getByRole('tab', { name: 'Following' })); await flush();
  expect(screen.getByRole('button', { name: /^How Much Time Do We Have Before/ })).toBeVisible();
  await user.press(button('Write a story')); expect(screen.getByLabelText('글 제목')).toBeVisible();
}, 30000);
it('최초 조회 중 닫기는 모달을 닫고 수동 재개 뒤 이전 조회가 늦게 와도 새 단계를 유지한다', async () => {
  const base = createMockOnboardingSource({ delayMs: 0 }); const late = deferred<OnboardingRecord>();
  const source = { ...base, read: jest.fn(base.read).mockReturnValueOnce(late.promise) };
  const { user } = await setup(source);
  await user.press(button('온보딩 닫기')); expect(screen.queryByRole('button', { name: '온보딩 닫기' })).toBeNull();
  await user.press(screen.getByRole('tab', { name: '프로필' })); await flush(); await user.press(button('온보딩 이어서 하기')); await flush();
  await user.press(button('온보딩 계속'));
  await act(async () => { late.resolve(await base.read('example-reader', new AbortController().signal)); });
  expect(screen.getByText('What are you interested in?')).toBeVisible();
}, 30000);
it('관심사 저장 실패의 선택을 보존하고 중단 후 확정 단계로 재진입하며 모의 권한 실패와 거절을 복구한다', async () => {
  const { user } = await setup(createMockOnboardingSource({ delayMs: 0 }), true);
  await user.press(button('온보딩 계속'));
  await user.press(button('관심사 다시 불러오기')); await flush();
  for (const topic of ['Technology', 'Writing', 'Life']) await user.press(screen.getByRole('checkbox', { name: `${topic} 관심사` }));
  await user.press(button('관심사 다음')); await flush();
  expect(screen.getByRole('checkbox', { name: 'Life 관심사' })).toBeChecked();
  expect(screen.getByText('관심사를 저장하지 못했어요. 선택을 유지했으니 다시 시도해 주세요.')).toBeVisible();
  await user.press(button('관심사 다음')); await flush();
  await user.press(button('추천 다시 불러오기')); await flush(); await user.press(button('온보딩 닫기'));
  await user.press(screen.getByRole('tab', { name: '프로필' })); await flush(); await user.press(button('온보딩 이어서 하기')); await flush();
  expect(screen.getByText('Recommended for you.')).toBeVisible(); await user.press(button('추천 팔로우 완료'));
  await user.press(button('모의 알림 사용')); expect(screen.getByText('알림 권한을 확인하거나 요청할 수 없어요. 다시 시도하거나 건너뛰세요.')).toBeVisible();
  await user.press(button('모의 알림 사용')); expect(screen.getByText('이전 알림 권한 요청이 거절됐어요. 알림 없이 계속 읽을 수 있어요.')).toBeVisible();
  await user.press(button('온보딩 완료')); expect(screen.queryByRole('button', { name: '온보딩 이어서 하기' })).toBeNull();
}, 30000);
it('응답 유실 뒤 닫기와 재진입은 저장소의 확정 단계를 읽고 공급부 교체는 이전 화면 선택을 폐기한다', async () => {
  const { user, replace } = await setup(createMockOnboardingSource({ delayMs: 0, lostResponses: 1 }));
  await user.press(button('온보딩 계속')); await user.press(button('온보딩 닫기'));
  await user.press(screen.getByRole('tab', { name: '프로필' })); await flush(); await user.press(button('온보딩 이어서 하기')); await flush();
  expect(screen.getByText('What are you interested in?')).toBeVisible();
  await user.press(screen.getByRole('checkbox', { name: 'Life 관심사' }));
  await replace(createMockOnboardingSource({ delayMs: 0, showWelcome: false })); await flush();
  expect(screen.getByRole('checkbox', { name: 'Life 관심사' })).not.toBeChecked();
}, 30000);

it.each(['undetermined', 'unsupported'] as const)('권한 요청의 %s 응답은 거절로 저장하지 않고 알림 단계에서 건너뛰기를 허용한다', async outcome => {
  const { user, source, permission } = await setup();
  jest.spyOn(permission, 'request').mockResolvedValue(outcome);
  await user.press(button('온보딩 계속'));
  for (const topic of ['Technology', 'Writing', 'Life']) await user.press(screen.getByRole('checkbox', { name: `${topic} 관심사` }));
  await user.press(button('관심사 다음')); await flush(); await user.press(button('추천 팔로우 완료'));
  await user.press(button('모의 알림 사용')); await flush();
  expect(screen.getByText('알림 권한을 확인하거나 요청할 수 없어요. 다시 시도하거나 건너뛰세요.')).toBeVisible();
  expect((await source.read('example-reader', new AbortController().signal)).step).toBe('notifications');
  await user.press(button('알림 안내 건너뛰기')); await flush();
  expect((await source.read('example-reader', new AbortController().signal)).notificationChoice).toBe('skipped');
}, 30000);

it.each(['동기 예외', '늦은 실패'] as const)('권한 조회의 %s는 화면을 깨뜨리거나 새 요청의 오류를 덮지 않는다', async outcome => {
  const pending = deferred<NotificationPermission>();
  const permission: NotificationPermissionSource = {
    kind: 'mock', read: () => 'undetermined', request: async () => { throw new Error('request failure'); },
    refresh: () => { if (outcome === '동기 예외') throw new Error('sync read'); return pending.promise; },
  };
  const { user } = await setup(createMockOnboardingSource({ delayMs: 0 }), false, permission);
  await user.press(button('온보딩 계속'));
  for (const topic of ['Technology', 'Writing', 'Life']) await user.press(screen.getByRole('checkbox', { name: `${topic} 관심사` }));
  await user.press(button('관심사 다음')); await flush(); await user.press(button('추천 팔로우 완료')); await flush();
  if (outcome === '동기 예외') expect(screen.getByText('기기 알림 권한을 조회하지 못했어요. 다시 요청하거나 건너뛰세요.')).toBeVisible();
  await user.press(button('모의 알림 사용')); await flush();
  if (outcome === '늦은 실패') await act(async () => pending.reject(new Error('old read')));
  expect(screen.getByText('알림 권한을 확인하거나 요청할 수 없어요. 다시 시도하거나 건너뛰세요.')).toBeVisible();
  expect(screen.queryByText('기기 알림 권한을 조회하지 못했어요. 다시 요청하거나 건너뛰세요.')).toBeNull();
}, 30000);
