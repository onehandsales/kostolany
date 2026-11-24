import { useEffect } from 'react';
import { act, fireEvent, render, screen, userEvent, within } from '@testing-library/react-native';
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
import { createMockPublicListSource } from '../../features/public-lists/data/createMockPublicListSource';
import { publicListFixtures } from '../../features/public-lists/data/publicListFixtures';
import type { PublicListSource } from '../../features/public-lists/types';

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
async function setup(publicListSource?: PublicListSource) {
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
          publicListSource={publicListSource}
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

it('토픽 공유 중 실제 다른 토픽 경로로 이동하면 늦은 복사 결과와 이전 시트가 복귀하지 않는다', async () => {
  const { adapter, user } = await setup();
  await user.press(screen.getByRole('tab', { name: '탐색' }));
  await user.press(button('Open topic Life'));
  await flush();
  await user.press(button('Share topic Life'));
  const pending = deferred<void>();
  jest.mocked(adapter.copy).mockImplementationOnce(() => pending.promise);
  await user.press(button('Copy link'));
  const signal = jest.mocked(adapter.copy).mock.calls.at(-1)?.[1];
  // 모달 뒤의 경로 변경을 직접 유발하되 실제 navigator의 push와 focus 수명을 검증한다.
  await fireEvent.press(screen.getByRole('button', { name: 'Open topic Self Improvement', includeHiddenElements: true }));
  await flush();
  expect(screen.queryByRole('heading', { name: 'Share' })).toBeNull();
  expect(signal?.aborted).toBe(true);
  await act(async () => pending.resolve());
  await user.press(button('Back from topic'));
  expect(screen.queryByText('Link copied')).toBeNull();
  expect(screen.queryByRole('heading', { name: 'Share' })).toBeNull();
  await user.press(button('Share topic Life'));
  expect(button('Copy link')).toBeEnabled();
});

it('실제 공개 목록 공유 중 제목 갱신·접근 철회는 이전 카드와 늦은 복사를 폐기한다', async () => {
  const lists = publicListFixtures.map(list => ({ ...list }));
  const source = createMockPublicListSource({ delayMs: 0, lists });
  const { adapter, user } = await setup(source);
  await user.press(screen.getByRole('tab', { name: '탐색' }));
  await user.press(button('Open topic Life')); await flush();
  await user.press(button('Open topic Self Improvement')); await flush();
  await user.press(button('See the full list The power of a morning routine')); await flush();
  await user.press(button('Share list The power of a morning routine'));
  const pending = deferred<void>();
  jest.mocked(adapter.copy).mockImplementationOnce(() => pending.promise);
  await user.press(button('Copy link'));
  const signal = jest.mocked(adapter.copy).mock.calls.at(-1)?.[1];
  const list = lists.find(item => item.id === 'public-morning-routine');
  if (!list) throw new Error('missing list');
  await act(async () => {
    list.title = '갱신된 목록 제목';
    source.setVisibility(list.id, 'public');
  });
  await flush();
  expect(within(screen.getByLabelText('공유 이미지 카드')).getByText('갱신된 목록 제목')).toBeVisible();
  expect(signal?.aborted).toBe(true);
  await act(async () => pending.resolve());
  expect(screen.queryByText('Link copied')).toBeNull();
  const revoked = deferred<void>();
  jest.mocked(adapter.copy).mockImplementationOnce(() => revoked.promise);
  await user.press(button('Copy link'));
  const revokedSignal = jest.mocked(adapter.copy).mock.calls.at(-1)?.[1];
  await act(async () => source.setVisibility(list.id, 'private'));
  await flush();
  expect(revokedSignal?.aborted).toBe(true);
  expect(screen.queryByRole('heading', { name: 'Share' })).toBeNull();
  await act(async () => revoked.reject(new Error('late revoked')));
  await act(async () => source.setVisibility(list.id, 'public')); await flush();
  expect(screen.queryByRole('heading', { name: 'Share' })).toBeNull();
  expect(screen.queryByRole('button', { name: '공유 다시 시도' })).toBeNull();
});

it('기사 공유 중 작성자 경로로 이동했다 돌아와도 이전 시트와 늦은 성공을 복원하지 않는다', async () => {
  const { adapter, user } = await setup();
  await user.press(button(/^ChatGPT Is Poisoning/)); await flush();
  await user.press(button('Share story'));
  const pending = deferred<void>();
  jest.mocked(adapter.copy).mockImplementationOnce(() => pending.promise);
  await user.press(button('Copy link'));
  const signal = jest.mocked(adapter.copy).mock.calls.at(-1)?.[1];
  const article = within(screen.getByLabelText('기사 본문', { includeHiddenElements: true }));
  await fireEvent.press(article.getAllByRole('button', { name: 'Open Jordan Gibbs profile', includeHiddenElements: true })[0]!);
  await flush();
  expect(signal?.aborted).toBe(true);
  await act(async () => pending.resolve());
  await user.press(button('Back from profile'));
  expect(screen.queryByRole('heading', { name: 'Share' })).toBeNull();
  expect(screen.queryByText('Link copied')).toBeNull();
});

it('프로필 목록 공유 중 재조회 실패는 이전 복사를 취소하고 복구 전 공유를 막는다', async () => {
  const source = createMockPublicListSource({ delayMs: 0 });
  const read = jest.spyOn(source, 'read');
  const { adapter, user } = await setup(source);
  await user.press(button(/^ChatGPT Is Poisoning/)); await flush();
  await user.press(screen.getAllByRole('button', { name: 'Open Jordan Gibbs profile' })[0]!);
  await flush();
  await user.press(screen.getByRole('tab', { name: 'Lists' })); await flush();
  await user.press(button('List options, AAA AI'));
  await user.press(button('Share list'));
  const pending = deferred<void>();
  jest.mocked(adapter.copy).mockImplementationOnce(() => pending.promise);
  await user.press(button('Copy link'));
  const signal = jest.mocked(adapter.copy).mock.calls.at(-1)?.[1];
  read.mockRejectedValueOnce(new Error('reload failed'));
  await act(async () => source.setVisibility('public-aaa-ai', 'public')); await flush();
  expect(signal?.aborted).toBe(true);
  expect(screen.queryByLabelText('공유 이미지 카드')).toBeNull();
  expect(screen.queryByRole('button', { name: 'Copy link' })).toBeNull();
  await act(async () => pending.resolve());
  expect(screen.queryByText('Link copied')).toBeNull();
  await user.press(button('공유 닫기'));
  await user.press(button('Retry public lists')); await flush();
  await user.press(button('List options, AAA AI'));
  await user.press(button('Share list'));
  await user.press(button('Copy link'));
  expect(adapter.copy).toHaveBeenLastCalledWith('https://kostolany.invalid/list/public-aaa-ai', expect.any(AbortSignal));
  expect(screen.getByText('Link copied')).toBeVisible();
});
