import { act, render, screen, userEvent } from '@testing-library/react-native';
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

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());
const button = (name: string) => screen.getByRole('button', { name });
const flush = () => act(async () => { await jest.advanceTimersByTimeAsync(1500); });
async function setup(source = createMockOnboardingSource({ delayMs: 0 }), failing = false, permissionSource?: NotificationPermissionSource) {
  const auth = createMockAuthSource({ delayMs: 0 });
  const relationshipSource = createMockRelationshipSource({ delay: 0, scenario: failing ? 'write-error' : 'normal' });
  const permission = permissionSource ?? createMockNotificationPermission({ delayMs: 0, failures: failing ? 1 : 0, outcome: 'denied' });
  const topicSource = createMockTopicSource({ delay: 0, scenario: failing ? 'read-error' : 'normal' });
  const directorySource = createMockDirectorySource({ delay: 0, scenario: failing ? 'read-error' : 'normal' });
  const tree = (next: OnboardingSource = source) => <SafeAreaProvider><AppNavigator authSource={auth}
    onboardingSource={next} notificationPermissionSource={permission} relationshipSource={relationshipSource}
    topicSource={topicSource} directorySource={directorySource} /></SafeAreaProvider>;
  const view = await render(tree());
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await user.press(button('Write a story')); await user.press(button('Create account'));
  await user.press(button('Google로 로그인 (모의)')); await flush();
  return { user, source, relationshipSource, permission, replace: (next: OnboardingSource) => view.rerender(tree(next)) };
}
it('신규 가입은 관심사 최소 세 개와 선택 취소를 거쳐 팔로우 없이 완료하고 원래 홈에서 개인 행동을 다시 실행한다', async () => {
  const { user, source, relationshipSource } = await setup();
  await user.press(button('온보딩 계속'));
  for (const topic of ['Technology', 'Writing']) await user.press(screen.getByRole('checkbox', { name: `${topic} 관심사` }));
  expect(button('관심사 다음')).toBeDisabled();
  await user.press(screen.getByRole('checkbox', { name: 'Life 관심사' })); expect(button('관심사 다음')).toBeEnabled();
  await user.press(screen.getByRole('checkbox', { name: 'Life 관심사' })); expect(button('관심사 다음')).toBeDisabled();
  await user.press(screen.getByRole('checkbox', { name: 'Life 관심사' }));
  await user.press(button('관심사 다음')); await flush();
  await user.press(button('추천 팔로우 완료')); await user.press(button('알림 안내 건너뛰기'));
  await user.press(button('멤버십 안내 열기')); await user.press(button('멤버십 안내 닫기')); await user.press(button('온보딩 완료'));
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
