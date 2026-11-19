import { act, fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import { AuthProvider, useAuth } from '../../features/auth/AuthProvider';
import type { AuthStore } from '../../features/auth/createAuthStore';
import { createMockAuthSource } from '../../features/auth/data/createMockAuthSource';
import { mockUserA, mockUserB } from '../../features/auth/data/mockUsers';
import { createMockBookmarkSource } from '../../features/bookmarks/data/createMockBookmarkSource';
import { createMockFeedSource } from '../../features/feed/data/mockFeedSource';
import { deferred } from '../../features/feed/tests/helpers';
import { createMockLikeSource } from '../../features/likes/data/createMockLikeSource';
import { SessionNavigation } from './AppNavigator';

const title = '금리가 오르면 예금과 대출에는 어떤 일이 생길까';
const articleId = 'example-latest-rates';

function AuthProbe({ onStore }: { onStore: (store: AuthStore) => void }) {
  const { store } = useAuth(); useEffect(() => onStore(store), [onStore, store]); return null;
}

async function renderSession() {
  const bookmarks = createMockBookmarkSource({ delayMs: 0 });
  if (!bookmarks.lists) throw new Error('Missing lists');
  for (const user of [mockUserA, mockUserB]) {
    await bookmarks.lists.setList({ userId: user.id, listId: 'same-list-id', commandId: 1,
      content: { name: `${user.name}의 비공개 목록`, articleIds: [articleId] } });
  }
  let auth: AuthStore | undefined;
  await render(<SafeAreaProvider><AuthProvider source={createMockAuthSource({ delayMs: 0 })} initialUser={mockUserA}>
    <SessionNavigation bookmarkSource={bookmarks} likeSource={createMockLikeSource({ delayMs: 0 })}
      feedSource={createMockFeedSource({ delayMs: 0 })} articleSource={createMockArticleSource({ delayMs: 0 })} />
    <AuthProbe onStore={(store) => { auth = store; }} />
  </AuthProvider></SafeAreaProvider>);
  await waitFor(() => expect(screen.getByRole('togglebutton', { name: new RegExp(`^북마크, ${title}`) })).toBeEnabled());
  if (!auth) throw new Error('Missing auth store');
  return { auth, user: userEvent.setup() };
}

async function changeUser(auth: AuthStore, userId: string) {
  await act(async () => {
    auth.openLogout(); await auth.signOut(); auth.openLogin({ kind: 'profile' }); await auth.signIn(userId);
  });
}

describe('저장 시트의 사용자 전환', () => {
  // 가상화 목록의 예약 갱신도 사용자 이벤트와 같은 제어된 시간 안에서 검증한다.
  beforeEach(() => jest.useFakeTimers());
  afterEach(async () => {
    try {
      await act(async () => { await jest.runOnlyPendingTimersAsync(); });
    } finally {
      jest.useRealTimers();
    }
  });

  it('저장 시트 안의 미제출 생성 초안은 A→B→A 전환에서 즉시 사라지고 다른 목록을 노출하지 않는다', async () => {
    const { auth, user } = await renderSession();
    await user.press(screen.getByRole('button', { name: `저장할 목록 선택, ${title}` }));
    await user.press(screen.getByRole('button', { name: '새 목록 만들기' }));
    await user.type(screen.getByLabelText('목록 이름 · 필수'), '이전 사용자의 비밀 초안');
    await changeUser(auth, mockUserB.id);
    expect(screen.queryByLabelText('목록 이름 · 필수', { includeHiddenElements: true })).not.toBeOnTheScreen();
    expect(screen.queryByText('이전 사용자의 비밀 초안', { includeHiddenElements: true })).not.toBeOnTheScreen();
    await user.press(screen.getByRole('button', { name: `저장할 목록 선택, ${title}` }));
    expect(screen.getByRole('checkbox', { name: `${mockUserB.name}의 비공개 목록` })).toBeVisible();
    expect(screen.queryByRole('checkbox', { name: `${mockUserA.name}의 비공개 목록` })).not.toBeOnTheScreen();
    await changeUser(auth, mockUserA.id);
    expect(screen.queryByRole('checkbox', { name: `${mockUserB.name}의 비공개 목록` })).not.toBeOnTheScreen();
    await user.press(screen.getByRole('tab', { name: '라이브러리' }));
    await user.press(screen.getByRole('button', { name: '새 목록' }));
    expect(screen.getByLabelText('목록 이름 · 필수')).toHaveDisplayValue('');
  });
});

it('A 목록의 기사에서 B로 바뀌면 동일한 목록 ID가 있어도 B 목록 상세 대신 라이브러리 처음으로 돌아간다', async () => {
  const { auth, user } = await renderSession();
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  await user.press(screen.getByRole('button', { name: `${mockUserA.name}의 비공개 목록 열기, 저장한 기사 1개` }));
  await user.press(screen.getByRole('button', { name: new RegExp(`^${title}`) }));
  await screen.findByRole('heading', { name: title });
  await changeUser(auth, mockUserB.id);
  expect(screen.getByRole('heading', { name: title })).toBeVisible();
  expect(screen.queryByRole('button', { name: '저장 목록으로 돌아가기' })).not.toBeOnTheScreen();
  await user.press(screen.getByRole('button', { name: '라이브러리로 돌아가기' }));
  expect(await screen.findByRole('heading', { name: '라이브러리' })).toBeVisible();
  expect(screen.queryByRole('heading', { name: `${mockUserA.name}의 비공개 목록` })).not.toBeOnTheScreen();
  expect(screen.queryByRole('heading', { name: `${mockUserB.name}의 비공개 목록` })).not.toBeOnTheScreen();
  expect(screen.getByRole('button', { name: `${mockUserB.name}의 비공개 목록 열기, 저장한 기사 1개` })).toBeVisible();
});

it('동일한 A 계정으로 즉시 재로그인해도 이전 개인 화면과 입력을 이어 열지 않는다', async () => {
  const { auth, user } = await renderSession();
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  await user.press(screen.getByRole('button', { name: `${mockUserA.name}의 비공개 목록 열기, 저장한 기사 1개` }));
  await user.press(screen.getByRole('button', { name: `목록 관리, ${mockUserA.name}의 비공개 목록` }));
  await user.press(screen.getByRole('button', { name: '이름 수정' }));
  await user.type(screen.getByLabelText('목록 이름 · 필수'), ' 초안');
  await changeUser(auth, mockUserA.id);
  expect(screen.queryByLabelText('목록 이름 · 필수', { includeHiddenElements: true })).not.toBeOnTheScreen();
  expect(await screen.findByRole('heading', { name: '라이브러리' })).toBeVisible();
});

it.each(['success', 'failure'] as const)('로그인 Modal의 native 닫기 후 늦은 %s는 공개 화면에 영향을 주지 않는다', async (outcome) => {
  const source = createMockAuthSource({ delayMs: 0 });
  const response = deferred<Awaited<ReturnType<typeof source.signIn>>>();
  const signIn = jest.fn(() => response.promise); const user = userEvent.setup();
  await render(<SafeAreaProvider><AuthProvider source={{ ...source, signIn }}>
    <SessionNavigation feedSource={createMockFeedSource({ delayMs: 0 })} />
  </AuthProvider></SafeAreaProvider>);
  await user.press(await screen.findByRole('button', { name: `좋아요, ${title}, 로그인 필요` }));
  await user.press(screen.getByRole('button', { name: 'Google로 로그인 (모의)' }));
  expect(screen.getByRole('button', { name: 'Google로 로그인 (모의)' })).toBeBusy();
  await fireEvent(screen.getByLabelText('모의 로그인'), 'requestClose');
  await act(async () => {
    if (outcome === 'success') response.resolve({ status: 'success', user: mockUserA });
    else response.reject(new Error('late'));
  });
  expect(screen.getByRole('button', { name: `좋아요, ${title}, 로그인 필요` })).toBeVisible();
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  expect(signIn).toHaveBeenCalledTimes(1);
});
