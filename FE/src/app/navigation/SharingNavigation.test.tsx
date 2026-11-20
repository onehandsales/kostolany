import { useEffect } from 'react';
import { act, fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '../../features/auth/AuthProvider';
import type { AuthStore } from '../../features/auth/createAuthStore';
import { mockUserA, mockUserB } from '../../features/auth/data/mockUsers';
import { createMockAuthSource } from '../../features/auth/data/createMockAuthSource';
import { createMockFeedSource } from '../../features/feed/data/mockFeedSource';
import { mediumArticles } from '../../features/feed/data/mediumFixtures';
import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import { articleFixtures } from '../../features/article/data/fixtures';
import { articleSelectionDocument } from '../../features/article/articleSelectionDocument';
import { deferred } from '../../features/feed/tests/helpers';
import type { ShareAdapter } from '../../features/sharing/types';
import { SessionNavigation } from './AppNavigator';

beforeEach(() => jest.useFakeTimers());
afterEach(async () => {
  await act(async () => jest.runOnlyPendingTimersAsync());
  jest.useRealTimers();
});
const flush = () => act(async () => jest.advanceTimersByTimeAsync(1000));
const button = (name: string | RegExp) => screen.getByRole('button', { name });
function AuthProbe({ capture }: { capture: (store: AuthStore) => void }) {
  const { store } = useAuth();
  useEffect(() => capture(store), [capture, store]);
  return null;
}
async function setup() {
  let auth: AuthStore | undefined;
  const adapter: ShareAdapter = {
    copy: jest.fn(async () => {}),
    share: jest.fn(async () => 'cancelled'),
    capture: jest.fn(async () => ({ uri: 'file:///cache/card.png', release: jest.fn() })),
    saveImage: jest.fn(async () => 'library'),
    openSettings: jest.fn(async () => {}),
  };
  await render(
    <SafeAreaProvider>
      <AuthProvider initialUser={mockUserA} source={createMockAuthSource({ delayMs: 0 })}>
        <SessionNavigation
          shareAdapter={adapter}
          articleSource={createMockArticleSource({ delayMs: 0 })}
          feedSource={createMockFeedSource({
            delayMs: 0,
            catalog: {
              latest: mediumArticles.filter((a) => a.id === 'medium-brain'),
              popular: [],
              recommended: [],
            },
          })}
        />
        <AuthProbe
          capture={(store) => {
            auth = store;
          }}
        />
      </AuthProvider>
    </SafeAreaProvider>,
  );
  await flush();
  if (!auth) throw new Error('missing auth');
  return { adapter, auth, user: userEvent.setup({ advanceTimers: jest.advanceTimersByTime }) };
}

it('실제 기사→공유→인용→작가 진입에서 다른 타입·주소를 전달하고 부모 선택 맥락으로 복귀한다', async () => {
  const { adapter, user } = await setup();
  await user.press(button(/^ChatGPT Is Poisoning/));
  await flush();
  await user.press(button('Share story'));
  await user.press(button('Copy link'));
  expect(adapter.copy).toHaveBeenLastCalledWith(
    'https://kostolany.invalid/article/medium-brain',
    expect.any(AbortSignal),
  );
  await user.press(button('공유 닫기'));
  const article = articleFixtures.find((item) => item.id === 'medium-brain');
  if (!article) throw new Error('missing article');
  const document = articleSelectionDocument(article);
  const start = document.text.indexOf('This “yes man”');
  const end = document.text.indexOf(' last week', start);
  await user.press(button('기사 문구 선택'));
  await fireEvent(screen.getByLabelText('선택할 원문'), 'selectionChange', {
    nativeEvent: { selection: { start, end } },
  });
  await user.press(button('문구 선택 Done'));
  await user.press(button('Share passage'));
  await user.press(button('Share via...'));
  expect(adapter.share).toHaveBeenLastCalledWith(
    expect.objectContaining({
      text: `“${document.text.slice(start, end)}”\n${article.title}`,
      url: `https://kostolany.invalid/article/medium-brain#quote-${start}-${end}`,
    }),
    expect.any(AbortSignal),
  );
  await user.press(button('공유 닫기'));
  expect(button('Highlight')).toBeVisible();
  await fireEvent(button('문구 선택 취소'), 'press');
  await user.press(button('홈으로 돌아가기'));
  await user.press(button('Open Jordan Gibbs profile'));
  await flush();
  await user.press(button('Jordan Gibbs options'));
  await user.press(button('Share author'));
  await user.press(button('Copy link'));
  expect(adapter.copy).toHaveBeenLastCalledWith(
    'https://kostolany.invalid/writer/jordan',
    expect.any(AbortSignal),
  );
  await user.press(button('공유 닫기'));
  expect(screen.getByRole('heading', { name: 'Jordan Gibbs' })).toBeVisible();
});

it('실제 탐색→토픽→공개 목록의 공유는 주소·제목을 구분하고 같은 화면으로 돌아간다', async () => {
  const { adapter, user } = await setup();
  await user.press(screen.getByRole('tab', { name: '탐색' }));
  await user.press(button('Open topic Life'));
  await flush();
  await user.press(button('Share topic Life'));
  await user.press(button('Copy link'));
  expect(adapter.copy).toHaveBeenLastCalledWith(
    'https://kostolany.invalid/topic/life',
    expect.any(AbortSignal),
  );
  await user.press(button('공유 닫기'));
  await user.press(button('Open topic Self Improvement'));
  await flush();
  await user.press(button('See the full list The power of a morning routine'));
  await flush();
  await user.press(button('Share list The power of a morning routine'));
  await user.press(button('Copy link'));
  expect(adapter.copy).toHaveBeenLastCalledWith(
    'https://kostolany.invalid/list/public-morning-routine',
    expect.any(AbortSignal),
  );
  await user.press(button('공유 닫기'));
  await user.press(button('Back from public list'));
  expect(screen.getByRole('heading', { name: 'Self Improvement' })).toBeVisible();
});

it.each(['success', 'failure'] as const)(
  '복사 중 A→B→A와 같은 A 재로그인 뒤 늦은 %s는 이전 시트·오류를 복원하지 않는다',
  async (outcome) => {
    const { adapter, user, auth } = await setup();
    const pending = deferred<void>();
    jest.mocked(adapter.copy).mockImplementationOnce(() => pending.promise);
    await user.press(button(/^ChatGPT Is Poisoning/));
    await flush();
    await user.press(button('Share story'));
    await user.press(button('Copy link'));
    await act(async () => {
      auth.openLogout();
      await auth.signOut();
      auth.openLogin({ kind: 'profile' });
      await auth.signIn(mockUserB.id);
    });
    await flush();
    expect(screen.queryByRole('heading', { name: 'Share' })).toBeNull();
    if (outcome === 'success') await act(async () => pending.resolve());
    else await act(async () => pending.reject(new Error('late A')));
    await act(async () => {
      auth.openLogout();
      await auth.signOut();
      auth.openLogin({ kind: 'profile' });
      await auth.signIn(mockUserA.id);
    });
    await flush();
    expect(screen.queryByRole('button', { name: '공유 다시 시도' })).toBeNull();
    await user.press(button('Share story'));
    expect(button('Copy link')).toBeEnabled();
    await act(async () => {
      auth.openLogout();
      await auth.signOut();
      auth.openLogin({ kind: 'profile' });
      await auth.signIn(mockUserA.id);
    });
    await flush();
    expect(screen.queryByRole('heading', { name: 'Share' })).toBeNull();
  },
);
