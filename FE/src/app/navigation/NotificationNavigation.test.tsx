import { useEffect } from 'react';
import { act, fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '../../features/auth/AuthProvider';
import type { AuthStore } from '../../features/auth/createAuthStore';
import { mockUserA, mockUserB } from '../../features/auth/data/mockUsers';
import { createMockAuthSource } from '../../features/auth/data/createMockAuthSource';
import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import type { ArticleSource } from '../../features/article/types';
import { createMockNotificationSource } from '../../features/notifications/createMockNotificationSource';
import { notificationFixtures } from '../../features/notifications/notificationFixtures';
import type { InboxResponse, NotificationSource, PreferenceResponse } from '../../features/notifications/types';
import { createMockNotificationPermission } from '../../features/onboarding/notificationPermission';
import type { NotificationPermission, NotificationPermissionSource } from '../../features/onboarding/notificationPermission';
import { createMockRelationshipSource } from '../../features/community/data/createMockRelationshipSource';
import { createMockModerationSource } from '../../features/moderation/data/createMockModerationSource';
import type { ModerationSource } from '../../features/moderation/types';
import * as moderationContext from '../../features/moderation/ModerationContext';
import { createMockResponseSource } from '../../features/responses/data/createMockResponseSource';
import type { ResponseSource, ResponseValue } from '../../features/responses/types';
import { deferred } from '../../features/feed/tests/helpers';
import { SessionNavigation } from './AppNavigator';

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());
const flush = () => act(async () => { await jest.advanceTimersByTimeAsync(1000); });
const button = (name: string | RegExp) => screen.getByRole('button', { name });
const toggle = (name: string) => screen.getByRole('switch', { name });
function AuthProbe({ capture }: { capture: (store: AuthStore) => void }) {
  const { store } = useAuth(); useEffect(() => capture(store), [capture, store]); return null;
}
async function setup(source: NotificationSource = createMockNotificationSource({ delayMs: 0 }), guest = false, articleOverride?: ArticleSource, moderationSource?: ModerationSource, responseSource?: ResponseSource) {
  let auth: AuthStore | undefined; const authSource = createMockAuthSource({ delayMs: 0 });
  const permission = createMockNotificationPermission({ delayMs: 0, outcome: 'denied', failures: 1 });
  const relationship = createMockRelationshipSource({ delay: 0 }); const article = articleOverride ?? createMockArticleSource({ delayMs: 0 });
  const tree = (current: NotificationSource, currentPermission: NotificationPermissionSource = permission, currentArticle = article) => <SafeAreaProvider><AuthProvider source={authSource} initialUser={guest ? null : mockUserA}>
    <SessionNavigation notificationSource={current} notificationPermissionSource={currentPermission} relationshipSource={relationship} articleSource={currentArticle} moderationSource={moderationSource} responseSource={responseSource} />
    <AuthProbe capture={value => { auth = value; }} /></AuthProvider></SafeAreaProvider>;
  const view = await render(tree(source)); await flush();
  if (!auth) throw new Error('missing-auth');
  return { auth, permission, relationship, user: userEvent.setup({ advanceTimers: jest.advanceTimersByTime }),
    replace: (next: NotificationSource) => view.rerender(tree(next)),
    replacePermission: (next: NotificationPermissionSource) => view.rerender(tree(source, next)),
    replaceArticle: (next: ArticleSource) => view.rerender(tree(source, permission, next)) };
}

it.each(['success', 'failure'] as const)('대상 기사 공급부 교체 뒤 늦은 %s는 알림을 이동하거나 오류로 덮지 않는다', async outcome => {
  const pending = deferred<Awaited<ReturnType<ArticleSource>>>();
  const { user, replaceArticle } = await setup(undefined, false, () => pending.promise);
  await user.press(button('Notifications')); await flush(); await user.press(button(/mentioned you in/));
  const next = createMockArticleSource({ delayMs: 0 }); await replaceArticle(next); await flush();
  if (outcome === 'failure') await act(async () => pending.reject(new Error('old article source')));
  else { const article = next('medium-brain'); await flush(); await act(async () => pending.resolve(await article)); }
  expect(screen.getByRole('heading', { name: 'Notifications' })).toBeVisible();
  expect(screen.queryByRole('button', { name: '알림으로 돌아가기' })).toBeNull();
  expect(screen.queryByRole('button', { name: '알림 대상 재시도 notice-mention' })).toBeNull();
  await user.press(button(/mentioned you in/)); await flush(); expect(button('알림으로 돌아가기')).toBeVisible();
});

it('실제 홈→알림의 Follow는 행 이동과 분리되고 작가·목록·기사·응답과 뒤로 복귀를 연결한다', async () => {
  const { user, relationship } = await setup(); await user.press(screen.getByRole('tab', { name: 'Featured' })); await user.press(button('Notifications')); await flush();
  await user.press(button('Follow Jordan Gibbs')); await flush(); expect(screen.getByRole('heading', { name: 'Notifications' })).toBeVisible();
  await user.press(button('Following Jordan Gibbs options 닫기'));
  const result = relationship.read(mockUserA.id); await flush(); expect((await result).relationships.find(item => item.target.id === 'jordan')?.following).toBe(true);
  await user.press(button(/Jordan Gibbs started following you/)); await flush(); expect(button('Following Jordan Gibbs')).toBeVisible();
  await user.press(button('Back from profile')); await flush();
  expect(button(/Jordan Gibbs started following you, 읽음/)).toBeVisible();
  await user.press(button(/Medium Staff added 1 story/)); await flush(); expect(button('Back from public list')).toBeVisible();
  await user.press(button('Back from public list')); await flush();
  await user.press(button(/clapped for/)); await flush(); expect(button('알림으로 돌아가기')).toBeVisible();
  await user.press(button('알림으로 돌아가기')); await flush();
  await user.press(button(/Bérnie responded to/)); await flush(); expect(screen.getByText('알림의 응답을 표시하고 있어요.')).toBeVisible();
  await user.press(button('Responses 닫기')); await user.press(button('알림으로 돌아가기')); await flush();
  await user.press(button('알림에서 홈으로 돌아가기')); expect(screen.getByRole('heading', { name: '홈' })).toBeVisible();
  expect(screen.getByRole('tab', { name: 'Featured' })).toBeSelected();
});

it('기기 권한 실패·거절·재확인은 수신 선호와 독립적이며 계정 전환은 권한을 다시 요청하지 않는다', async () => {
  const { user, permission, auth } = await setup(); const request = jest.spyOn(permission, 'request');
  await user.press(screen.getByRole('tab', { name: '프로필' })); await flush(); await user.press(button('설정 열기')); await user.press(button('Push notifications')); await flush();
  expect(request).not.toHaveBeenCalled(); await user.press(button('알림 권한 요청')); await flush();
  expect(screen.getByText('권한 확인 또는 변경에 실패했어요.')).toBeVisible(); await user.press(button('알림 권한 요청')); await flush();
  expect(screen.getByText('Mock permission: denied')).toBeVisible(); expect(toggle('New Medium Digest')).toBeChecked();
  await act(async () => { auth.openLogout(); await auth.signOut(); auth.openLogin({ kind: 'profile' }); await auth.signIn(mockUserB.id); }); await flush();
  await user.press(screen.getByRole('tab', { name: '프로필' })); await user.press(button('설정 열기')); await user.press(button('Push notifications')); await flush();
  expect(screen.getByText('Mock permission: denied')).toBeVisible(); await user.press(button('알림 권한 다시 확인')); await flush(); expect(request).toHaveBeenCalledTimes(2);
});

it('권한 요청 중 공급부 교체는 이전 busy·늦은 실패를 버리고 새 권한을 다시 조회할 수 있다', async () => {
  const { user, permission, replacePermission } = await setup(); const pending = deferred<NotificationPermission>();
  jest.spyOn(permission, 'request').mockReturnValue(pending.promise);
  await user.press(screen.getByRole('tab', { name: '프로필' })); await flush(); await user.press(button('설정 열기'));
  await user.press(button('Push notifications')); await flush(); await user.press(button('알림 권한 요청'));
  await replacePermission({ kind: 'mock', read: () => 'denied', refresh: async () => 'denied', request: async () => 'denied' });
  await flush(); expect(button('알림 권한 다시 확인')).toBeEnabled();
  await act(async () => pending.reject(new Error('old source'))); await flush();
  expect(screen.getByText('Mock permission: denied')).toBeVisible();
  expect(screen.queryByText('권한 확인 또는 변경에 실패했어요.')).toBeNull();
});

it('Push 항목별 실패·재시도·Tailored 취소와 확정·Digest/Email 공유는 날짜와 작가 구독을 보존한다', async () => {
  const source = createMockNotificationSource({ delayMs: 0, scenario: 'save-error' }); const { user } = await setup(source);
  await user.press(screen.getByRole('tab', { name: '프로필' })); await flush(); await user.press(button('설정 열기')); await user.press(button('Push notifications')); await flush();
  await user.press(toggle('Your top story of the day')); await flush();
  expect(toggle('Your top story of the day')).not.toBeChecked(); expect(toggle('Stories picked by our Editors for you')).toBeChecked();
  await user.press(button('Your top story of the day 저장 재시도')); await flush();
  await user.press(button('New stories from writers you follow')); await user.press(screen.getByRole('radio', { name: 'Off' }));
  await user.press(button('New stories from writers you follow 취소')); expect(button('New stories from writers you follow').props.accessibilityValue.text).toBe('Tailored for you');
  await user.press(button('New stories from writers you follow')); await user.press(screen.getByRole('radio', { name: 'All' })); await user.press(button('알림 선택 완료')); await flush();
  await user.press(button('New stories from writers you follow 저장 재시도')); await flush();
  await user.press(toggle('New Medium Digest')); await flush(); await user.press(button('New Medium Digest 저장 재시도')); await flush();
  await user.press(button('알림 설정에서 돌아가기')); await user.press(screen.getByRole('tab', { name: '라이브러리' })); await user.press(screen.getByRole('tab', { name: 'Digest' })); await flush();
  await user.press(button('Digest 날짜 선택')); await user.press(screen.getByRole('radio', { name: 'June 11, 2025' })); await user.press(button('Digest 날짜 적용')); await flush();
  await user.press(button('Digest 설정')); await user.press(button('Digest Push notifications')); expect(toggle('New Medium Digest')).not.toBeChecked();
  expect(button('New stories from writers you follow').props.accessibilityValue.text).toBe('All');
  await user.press(button('Push notifications 뒤로')); await user.press(button('Digest Email notifications')); await user.press(toggle('Email notifications')); await flush();
  await user.press(button('Email notifications 저장 재시도')); await flush(); expect(toggle('New stories from subscribed writers')).toBeChecked();
  await user.press(button('Email notifications 뒤로')); await user.press(button('Frequency')); await user.press(screen.getByRole('radio', { name: 'Weekly' }));
  await fireEvent(screen.getByLabelText('Frequency'), 'requestClose');
  expect(screen.getByRole('heading', { name: 'Digest settings' })).toBeVisible();
  expect(button('Frequency')).toHaveAccessibilityValue({ text: 'Daily' });
  await user.press(button('Frequency')); await user.press(screen.getByRole('radio', { name: 'Weekly' }));
  await user.press(button('알림 선택 완료')); await flush(); await user.press(button('Frequency 저장 재시도')); await flush();
  await user.press(button('Digest settings 닫기')); expect(screen.getByText('June 11, 2025')).toBeVisible();
  await user.press(screen.getByRole('tab', { name: '프로필' })); await user.press(button('Email notifications')); await flush();
  expect(toggle('Email notifications')).not.toBeChecked(); expect(button('Digest email frequency').props.accessibilityValue.text).toBe('Daily');
});

it('비로그인 알림은 로그인 닫기·취소·실패·재시도 후 홈에 복귀하고 다시 누를 때 목록을 연다', async () => {
  const { user } = await setup(undefined, true); await user.press(button('Notifications')); await user.press(button('로그인 닫기'));
  await user.press(button('Notifications')); await user.press(button('모의 동작 선택 열기')); await user.press(screen.getByRole('radio', { name: '모의 결과: 사용자 취소' })); await user.press(button('Google로 로그인 (모의)')); await flush();
  expect(button('Notifications')).toBeVisible(); await user.press(button('Notifications')); await user.press(button('모의 동작 선택 열기'));
  await user.press(screen.getByRole('radio', { name: '모의 결과: 실패' })); await user.press(button('Google로 로그인 (모의)')); await flush();
  await user.press(button('로그인 다시 시도')); await flush(); expect(screen.queryByRole('heading', { name: 'Notifications' })).toBeNull();
  await user.press(button('Notifications')); await flush(); expect(button(/started following you/)).toBeVisible();
});

it('삭제·잘못된 응답·비공개 목록 목적지는 노출하거나 읽음 처리하지 않고 재시도를 제공한다', async () => {
  const seed = notificationFixtures(mockUserA.id).map(item => item.kind === 'list-story' ? { ...item, target: { kind: 'list' as const, id: 'missing-private', ownerId: 'someone' } }
    : item.kind === 'response' ? { ...item, target: { kind: 'response' as const, articleId: 'medium-brain', responseId: 'other-article-response' } } : item);
  const source = createMockNotificationSource({ delayMs: 0, seed: () => seed }); const mark = jest.spyOn(source, 'markRead'); const { user } = await setup(source);
  await user.press(button('Notifications')); await flush(); await user.press(button(/Medium Staff added/)); await flush();
  expect(button('알림 대상 재시도 notice-list')).toBeVisible(); await user.press(button(/Bérnie responded/)); await flush();
  expect(button('알림 대상 재시도 notice-response')).toBeVisible(); expect(mark).not.toHaveBeenCalled();
  expect(screen.queryByRole('button', { name: 'Back from public list' })).toBeNull();
});

it('차단 설정 조회 실패 중 목록 알림은 읽음 처리하지 않고 복구 후에만 목적지를 연다', async () => {
  const privacy = createMockModerationSource({ delay: 0, scenario: 'read-error' });
  const source = createMockNotificationSource({ delayMs: 0 }); const mark = jest.spyOn(source, 'markRead');
  const { user } = await setup(source, false, undefined, privacy);
  await user.press(button('Notifications')); await flush();
  await user.press(button(/Medium Staff added/)); await flush();
  expect(screen.getByRole('heading', { name: 'Notifications' })).toBeVisible();
  expect(button('알림 대상 재시도 notice-list')).toBeVisible();
  expect(mark).not.toHaveBeenCalled();
  await user.press(button('알림 대상 재시도 notice-list')); await flush();
  expect(button('Back from public list')).toBeVisible();
  expect(mark).toHaveBeenCalledTimes(1);
});

it('동적 mock 사용자 알림은 검색과 같은 카탈로그로 프로필을 열고 원래 알림으로 복귀한다', async () => {
  const item = notificationFixtures(mockUserA.id)[0]!;
  const source = createMockNotificationSource({ delayMs: 0, seed: () => [{ ...item,
    actorId: mockUserB.id, actorName: mockUserB.name, target: { kind: 'writer', id: mockUserB.id } }] });
  const { user } = await setup(source);
  await user.press(button('Notifications')); await flush();
  await user.press(button(/예시 독자 B started following/)); await flush();
  expect(button('Follow 예시 독자 B')).toBeVisible();
  await user.press(button('Back from profile')); await flush();
  expect(button(/예시 독자 B started following you, 읽음/)).toBeVisible();
});

it('응답 목적지 조회 중 기사 작성자를 차단하면 늦은 응답으로 이동하거나 읽음 처리하지 않는다', async () => {
  const pending = deferred<ResponseValue>(); const responses = createMockResponseSource({ delayMs: 0 });
  const source = createMockNotificationSource({ delayMs: 0 }); const mark = jest.spyOn(source, 'markRead');
  const useOriginalModeration = moderationContext.useModeration;
  let observed: ReturnType<typeof useOriginalModeration> | undefined;
  const probe = jest.spyOn(moderationContext, 'useModeration').mockImplementation(function useObservedModeration() {
    const value = useOriginalModeration(); observed = value; return value;
  });
  try {
    const { user } = await setup(source, false, undefined, createMockModerationSource({ delay: 0 }),
      { ...responses, read: () => pending.promise });
    await user.press(button('Notifications')); await flush();
    await user.press(button(/Bérnie responded/)); await flush();
    await act(async () => { await observed?.store?.execute({ operationId: 'block-during-notification',
      action: { kind: 'block', writerId: 'jordan', active: true } }); });
    const value = responses.read({ userId: mockUserA.id, target: { kind: 'article', id: 'medium-brain' } });
    await flush(); await act(async () => pending.resolve(await value)); await flush();
    expect(screen.getByRole('heading', { name: 'Notifications' })).toBeVisible();
    expect(button('알림 대상 재시도 notice-response')).toBeVisible();
    expect(mark).not.toHaveBeenCalled();
  } finally { probe.mockRestore(); }
});

it.each(['success', 'failure'] as const)('A 조회 중 계정 전환과 늦은 %s·같은 A 재로그인·source 교체는 개인 화면·선택을 격리한다', async outcome => {
  const base = createMockNotificationSource({ delayMs: 0 }); const pending = deferred<InboxResponse>(); const settings = deferred<PreferenceResponse>();
  const read = jest.fn(base.readInbox).mockImplementationOnce(() => pending.promise);
  const source = { ...base, readInbox: read }; const { user, auth, replace } = await setup(source);
  await user.press(button('Notifications'));
  async function switchTo(id: string) { await act(async () => { auth.openLogout(); await auth.signOut(); auth.openLogin({ kind: 'notifications' }); await auth.signIn(id); }); await flush(); }
  await switchTo(mockUserB.id); expect(screen.queryByRole('heading', { name: 'Notifications', includeHiddenElements: true })).toBeNull();
  await user.press(button('Notifications')); await flush(); expect(screen.getByText('You’re all caught up. No notifications yet.')).toBeVisible();
  if (outcome === 'failure') await act(async () => pending.reject(new Error('late A')));
  else { const data = base.readInbox(mockUserA.id, new AbortController().signal); await flush(); await act(async () => pending.resolve(await data)); }
  expect(screen.queryByRole('button', { name: /started following you/ })).toBeNull();
  await switchTo(mockUserA.id); await user.press(screen.getByRole('tab', { name: '프로필' })); await flush(); await user.press(button('설정 열기')); await user.press(button('Push notifications')); await flush();
  await user.press(button('Mentions')); await user.press(screen.getByRole('radio', { name: 'Off' })); await switchTo(mockUserA.id);
  expect(screen.queryByRole('radio', { name: 'Off', includeHiddenElements: true })).toBeNull();
  await replace({ ...base, readPreferences: () => settings.promise }); await flush();
  expect(screen.queryByRole('heading', { name: 'Push notifications', includeHiddenElements: true })).toBeNull();
});
