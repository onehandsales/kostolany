import { useEffect } from 'react';
import { act, fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppState } from 'react-native';
import { AuthProvider, useAuth } from '../../features/auth/AuthProvider';
import type { AuthStore } from '../../features/auth/createAuthStore';
import { mockUserA, mockUserB } from '../../features/auth/data/mockUsers';
import { createMockAuthSource } from '../../features/auth/data/createMockAuthSource';
import { createMockFeedSource } from '../../features/feed/data/mockFeedSource';
import { mediumArticles } from '../../features/feed/data/mediumFixtures';
import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import {
  createMockListeningOptionsSource,
  type ListeningOptionsSource,
} from '../../features/listening/listeningOptions';
import { createMockListeningSource } from '../../features/listening/createMockListeningSource';
import { createMockModerationSource } from '../../features/moderation/data/createMockModerationSource';
import type { ListeningSource, ListeningRecording } from '../../features/listening/types';
import { deferred } from '../../features/feed/tests/helpers';
import { SessionNavigation } from './AppNavigator';

const initialAppState = AppState.currentState;
beforeEach(() => {
  jest.useFakeTimers();
  AppState.currentState = 'active';
});
afterEach(() => {
  jest.useRealTimers();
  AppState.currentState = initialAppState;
});
const flush = () =>
  act(async () => {
    await jest.advanceTimersByTimeAsync(1000);
  });
const button = (name: string | RegExp) => screen.getByRole('button', { name });
function AuthProbe({ capture }: { capture: (store: AuthStore) => void }) {
  const { store } = useAuth();
  useEffect(() => capture(store), [capture, store]);
  return null;
}
async function setup(
  source: ListeningSource = createMockListeningSource({ delayMs: 10 }),
  optionsSource?: ListeningOptionsSource,
) {
  let auth: AuthStore | undefined;
  const authSource = createMockAuthSource({ delayMs: 0 });
  const articleSource = createMockArticleSource({ delayMs: 0 });
  const catalog = mediumArticles.filter(
    (article) => article.id === 'medium-brain' || article.id === 'medium-evening',
  );
  const feedSource = createMockFeedSource({
    delayMs: 0,
    catalog: { latest: catalog, popular: [], recommended: [] },
  });
  const moderationSource = createMockModerationSource({ delay: 0 });
  const tree = (current: ListeningSource) => (
    <SafeAreaProvider>
      <AuthProvider initialUser={mockUserA} source={authSource}>
        <SessionNavigation
          articleSource={articleSource}
          feedSource={feedSource}
          listeningSource={current}
          listeningOptionsSource={optionsSource}
          moderationSource={moderationSource}
        />
        <AuthProbe
          capture={(value) => {
            auth = value;
          }}
        />
      </AuthProvider>
    </SafeAreaProvider>
  );
  const view = await render(tree(source));
  await flush();
  if (!auth) throw new Error('Missing auth');
  return {
    auth,
    replace: (next: ListeningSource) => view.rerender(tree(next)),
    user: userEvent.setup({ advanceTimers: jest.advanceTimersByTime }),
  };
}

it('실제 Listen→미니→확장·시간 이동·접기·탭 복귀·View story·닫기를 한 재생 상태로 연결한다', async () => {
  const { user } = await setup();
  await user.press(button(/^ChatGPT Is Poisoning/));
  await flush();
  await user.press(button('Listen'));
  await flush();
  expect(button('Listen 일시정지')).toBeVisible();
  await user.press(button(/^플레이어 확장:/));
  await user.press(button('확장 플레이어 일시정지'));
  const before = screen.getByRole('slider', { name: '재생 위치' }).props.accessibilityValue.now;
  await user.press(button('30초 앞으로'));
  expect(screen.getByRole('slider', { name: '재생 위치' }).props.accessibilityValue.now).toBe(before + 30);
  await user.press(button('10초 뒤로'));
  expect(screen.getByRole('slider', { name: '재생 위치' }).props.accessibilityValue.now).toBe(before + 20);
  await fireEvent(screen.getByRole('slider'), 'layout', { nativeEvent: { layout: { width: 300 } } });
  await fireEvent.press(screen.getByRole('slider'), { nativeEvent: { locationX: 150 } });
  expect(screen.getByRole('slider').props.accessibilityValue.now).toBe(140);
  await fireEvent(screen.getByRole('slider'), 'accessibilityAction', {
    nativeEvent: { actionName: 'increment' },
  });
  expect(screen.getByRole('slider').props.accessibilityValue.now).toBe(170);
  await user.press(button('플레이어 더보기'));
  await user.press(button('View story'));
  expect(button('미니 플레이어 재생')).toBeVisible();
  await user.press(button('홈으로 돌아가기'));
  await user.press(screen.getByRole('tab', { name: '탐색' }));
  expect(button('미니 플레이어 재생')).toBeVisible();
  await user.press(button(/^플레이어 확장:/));
  await user.press(button('오디오 기사 공유'));
  expect(screen.getByText('공유 대상은 이 기사예요. 외부 공유는 아직 연결하지 않았어요.')).toBeVisible();
  await user.press(button('플레이어 메뉴 완료'));
  await user.press(button('플레이어 더보기'));
  await user.press(button('View story'));
  await flush();
  expect(screen.getByRole('heading', { name: 'ChatGPT Is Poisoning Your Brain...' })).toBeVisible();
  await user.press(button('플레이어 닫기'));
  expect(screen.queryByRole('button', { name: /^플레이어 확장:/ })).toBeNull();
});

it('재생 중 작가 차단을 확정하면 미니 플레이어와 타이머를 닫고 해제만으로 재개하지 않는다', async () => {
  const { user } = await setup();
  await user.press(button(/^ChatGPT Is Poisoning/));
  await flush();
  await user.press(button('Listen'));
  await flush();
  await user.press(button('홈으로 돌아가기'));
  await user.press(button('Open Jordan Gibbs profile'));
  await user.press(button('Jordan Gibbs options'));
  await user.press(button('Block author'));
  await user.press(button('Confirm Block author'));
  await flush();
  expect(screen.queryByRole('button', { name: /^플레이어 확장:/ })).toBeNull();
  await user.press(button('Jordan Gibbs options'));
  await user.press(button('Unblock author'));
  await user.press(button('Confirm Unblock author'));
  await flush();
  expect(screen.queryByRole('button', { name: /^플레이어 확장:/ })).toBeNull();
});

it('실제 준비 실패·재시도와 다른 기사 시작은 표시·시간·부모 뒤로 맥락을 교체한다', async () => {
  const { user } = await setup(createMockListeningSource({ delayMs: 10, failures: 1 }));
  await user.press(button(/^ChatGPT Is Poisoning/));
  await flush();
  await user.press(button('Listen'));
  await flush();
  expect(screen.getByText('듣기를 준비하지 못했어요. 다시 시도해 주세요.')).toBeVisible();
  await user.press(button('듣기 다시 시도'));
  await flush();
  await user.press(button('홈으로 돌아가기'));
  await user.press(button(/^10 Things To Do/));
  await flush();
  await user.press(button('Listen'));
  await flush();
  expect(button(/^플레이어 확장: 10 Things/)).toBeVisible();
  await user.press(button(/^플레이어 확장:/));
  await fireEvent(screen.getByLabelText('오디오 플레이어'), 'requestClose');
  expect(button('Listen 일시정지')).toBeVisible();
});

it.each(['success', 'failure'] as const)(
  '계정·같은 계정·source 교체 후 늦은 %s는 이전 플레이어를 복원하지 않는다',
  async (outcome) => {
    const pending = deferred<ListeningRecording>();
    const { user, auth, replace } = await setup(() => pending.promise);
    await user.press(button(/^ChatGPT Is Poisoning/));
    await flush();
    await user.press(button('Listen'));
    await act(async () => {
      auth.openLogout();
      await auth.signOut();
      auth.openLogin({ kind: 'profile' });
      await auth.signIn(mockUserB.id);
    });
    await flush();
    if (outcome === 'success')
      await act(async () =>
        pending.resolve({ articleId: 'medium-brain', durationSeconds: 280, mode: 'silent-mock' }),
      );
    else await act(async () => pending.reject(new Error('late A')));
    expect(screen.queryByRole('button', { name: /^플레이어 확장:/ })).toBeNull();
    await replace(createMockListeningSource({ delayMs: 10 }));
    await user.press(button('Listen'));
    await flush();
    await user.press(button(/^플레이어 확장:/));
    await act(async () => {
      auth.openLogout();
      await auth.signOut();
      auth.openLogin({ kind: 'profile' });
      await auth.signIn(mockUserB.id);
    });
    await flush();
    expect(screen.queryByLabelText('오디오 플레이어')).toBeNull();
    await user.press(button('Listen'));
    await flush();
    await replace(createMockListeningSource({ delayMs: 10 }));
    expect(screen.queryByRole('button', { name: /^플레이어 확장:/ })).toBeNull();
  },
);

it('속도 선택 취소·실패 재시도와 음성 검색·선택·Done은 같은 플레이어의 확정값만 바꾼다', async () => {
  const { user } = await setup(
    undefined,
    createMockListeningOptionsSource({ delayMs: 10, applyFailures: 1 }),
  );
  await user.press(button(/^ChatGPT Is Poisoning/));
  await flush();
  await user.press(button('Listen'));
  await flush();
  await user.press(button(/^플레이어 확장:/));
  await user.press(button('확장 플레이어 일시정지'));
  await user.press(button('재생 속도 1배'));
  for (let i = 0; i < 3; i++)
    await fireEvent(screen.getByRole('slider', { name: '재생 속도' }), 'accessibilityAction', {
      nativeEvent: { actionName: 'increment' },
    });
  expect(screen.getByText('490 WPM')).toBeVisible();
  await user.press(button('Select Speed 취소'));
  expect(button('재생 속도 1배')).toBeVisible();
  await user.press(button('재생 속도 1배'));
  for (let i = 0; i < 3; i++)
    await fireEvent(screen.getByRole('slider', { name: '재생 속도' }), 'accessibilityAction', {
      nativeEvent: { actionName: 'increment' },
    });
  await user.press(button('Select Speed Done'));
  await flush();
  expect(screen.getByText('적용하지 못했어요. 선택을 유지했어요. Done으로 다시 시도하세요.')).toBeVisible();
  expect(screen.getByText('490 WPM')).toBeVisible();
  await user.press(button('Select Speed Done'));
  await flush();
  expect(button('재생 속도 2.5배')).toBeVisible();
  await user.press(button('플레이어 더보기'));
  await user.press(button('Select a voice...'));
  await flush();
  await fireEvent.changeText(screen.getByLabelText('Search for a voice'), 'zzzz');
  await flush();
  expect(screen.getByText('No voices found')).toBeVisible();
  await fireEvent.changeText(screen.getByLabelText('Search for a voice'), 'Hans');
  await flush();
  await user.press(screen.getByRole('radio', { name: 'Hans, Male, Germany' }));
  await user.press(button('Select Voice 취소'));
  await user.press(button('플레이어 더보기'));
  await user.press(button('Select a voice...'));
  await flush();
  expect(screen.getByRole('radio', { name: 'Emma, Female, United States' })).toBeChecked();
  await fireEvent.changeText(screen.getByLabelText('Search for a voice'), 'Hans');
  await flush();
  await user.press(screen.getByRole('radio', { name: 'Hans, Male, Germany' }));
  await user.press(button('Select Voice Done'));
  await flush();
  expect(button('재생 속도 2.5배')).toBeVisible();
  await user.press(button('플레이어 더보기'));
  await user.press(button('Select a voice...'));
  await flush();
  await fireEvent.changeText(screen.getByLabelText('Search for a voice'), 'Hans');
  await flush();
  expect(screen.getByRole('radio', { name: 'Hans, Male, Germany' })).toBeChecked();
  await user.press(button('Select Voice 취소'));
  await user.press(button('플레이어 더보기'));
  await user.press(button('AirPlay...'));
  expect(
    screen.getByText('이 mock 플레이어는 소리를 출력하지 않아 AirPlay 장치를 연결할 수 없어요.'),
  ).toBeVisible();
  await user.press(button('플레이어 메뉴 완료'));
  await user.press(button('플레이어 더보기'));
  await user.press(button('Mute author'));
  await flush();
  expect(screen.queryByLabelText('오디오 플레이어')).toBeNull();
  await user.press(button('Confirm Mute author'));
  await flush();
  await user.press(button(/^플레이어 확장:/));
  await user.press(button('플레이어 더보기'));
  expect(button('Unmute author')).toBeVisible();
  await user.press(button('Report story...'));
  await flush();
  await user.press(screen.getByRole('radio', { name: 'Spam' }));
  await user.press(button('Submit report'));
  await flush();
  await user.press(button(/^플레이어 확장:/));
  await user.press(button('플레이어 더보기'));
  await user.press(button('Show less like this'));
  await flush();
  expect(screen.getByRole('heading', { name: 'Show less like this' })).toBeVisible();
});

it.each(['success', 'failure'] as const)(
  '음성 적용 중 A→B 전환 뒤 늦은 %s가 설정·플레이어를 노출하지 않는다',
  async (outcome) => {
    const pending = deferred<{ speed: number; voiceId: string }>();
    const optionsSource = createMockListeningOptionsSource({ delayMs: 0 });
    optionsSource.apply = () => pending.promise;
    const { user, auth } = await setup(undefined, optionsSource);
    await user.press(button(/^ChatGPT Is Poisoning/));
    await flush();
    await user.press(button('Listen'));
    await flush();
    await user.press(button(/^플레이어 확장:/));
    await user.press(button('플레이어 더보기'));
    await user.press(button('Select a voice...'));
    await flush();
    await fireEvent.changeText(screen.getByLabelText('Search for a voice'), 'Hans');
    await flush();
    await user.press(screen.getByRole('radio', { name: 'Hans, Male, Germany' }));
    await user.press(button('Select Voice Done'));
    await act(async () => {
      auth.openLogout();
      await auth.signOut();
      auth.openLogin({ kind: 'profile' });
      await auth.signIn(mockUserB.id);
    });
    await flush();
    if (outcome === 'success') await act(async () => pending.resolve({ speed: 1, voiceId: 'hans' }));
    else await act(async () => pending.reject(new Error('late A')));
    expect(screen.queryByLabelText('오디오 플레이어')).toBeNull();
    await user.press(button('Listen'));
    await flush();
    await user.press(button(/^플레이어 확장:/));
    await user.press(button('플레이어 더보기'));
    await user.press(button('Select a voice...'));
    await flush();
    expect(screen.getByRole('radio', { name: 'Emma, Female, United States' })).toBeChecked();
  },
);
