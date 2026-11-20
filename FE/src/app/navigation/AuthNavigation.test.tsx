import { act, fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import { createMockAuthSource } from '../../features/auth/data/createMockAuthSource';
import { mockUserA, mockUserB } from '../../features/auth/data/mockUsers';
import { createMockBookmarkSource } from '../../features/bookmarks/data/createMockBookmarkSource';
import type { UserListSource } from '../../features/bookmarks/listTypes';
import type { BookmarkSource } from '../../features/bookmarks/types';
import { createMockFeedSource } from '../../features/feed/data/mockFeedSource';
import { deferred } from '../../features/feed/tests/helpers';
import { createMockClapSource } from '../../features/reactions/data/createMockClapSource';
import type { ClapValue, ClapSource } from '../../features/reactions/types';
import { createMockSearchSource } from '../../features/search/data/mockSearchSource';
import { AppNavigator } from './AppNavigator';

const title = '금리가 오르면 예금과 대출에는 어떤 일이 생길까';
const getClap = () => screen.getByRole('button', { name: new RegExp(`^박수 보내기, ${title}`) });
const getBookmark = () => screen.getByRole('togglebutton', { name: new RegExp(`^북마크, ${title}`) });
const getGuestBookmark = () => screen.getByRole('button', { name: `북마크, ${title}, 로그인 필요` });
const getArticle = () => screen.getByRole('button', { name: new RegExp(`^${title}`) });

async function renderApp({ clapSource = createMockClapSource({ delayMs: 0 }),
  bookmarkSource = createMockBookmarkSource({ delayMs: 0 }) }: {
  clapSource?: ClapSource; bookmarkSource?: BookmarkSource;
} = {}) {
  await render(<SafeAreaProvider><AppNavigator authSource={createMockAuthSource({ delayMs: 0 })}
    clapSource={clapSource} bookmarkSource={bookmarkSource} feedSource={createMockFeedSource({ delayMs: 0 })}
    articleSource={createMockArticleSource({ delayMs: 0 })} searchSource={createMockSearchSource({ delayMs: 0 })} />
  </SafeAreaProvider>);
  await screen.findByRole('button', { name: new RegExp(`^${title}`) });
}

async function logIn(user: ReturnType<typeof userEvent.setup>, name = mockUserA.name) {
  await user.press(screen.getByRole('button', { name: '모의 로그인 시작' }));
  await user.press(screen.getByRole('radio', { name }));
  await user.press(screen.getByRole('button', { name: 'Google로 로그인 (모의)' }));
  expect(await screen.findByText(`${name} · 로그인됨`)).toBeVisible();
}

async function logOut(user: ReturnType<typeof userEvent.setup>) {
  await user.press(screen.getByRole('tab', { name: '프로필' }));
  await user.press(screen.getByRole('button', { name: '로그아웃' }));
  await user.press(screen.getByRole('button', { name: '로그아웃 확인' }));
  expect(screen.getByText('로그인하지 않은 상태예요.')).toBeVisible();
}

it('검색 기사에서 닫기·공급자 취소·실패·재시도 후 원래 기사와 검색어를 보존하며 저장을 자동 실행하지 않는다', async () => {
  const like = createMockClapSource({ delayMs: 0 }); const bookmarks = createMockBookmarkSource({ delayMs: 0 });
  const save = jest.fn(like.save); const setArticleSaved = jest.fn(bookmarks.setArticleSaved);
  const user = userEvent.setup();
  await renderApp({ clapSource: { ...like, save }, bookmarkSource: { ...bookmarks, setArticleSaved } });
  await user.press(screen.getByRole('tab', { name: '탐색' }));
  await user.press(screen.getByRole('button', { name: '기사 검색 열기' }));
  await fireEvent.changeText(screen.getByLabelText('기사 검색어'), '금리');
  await user.press(await screen.findByRole('button', { name: new RegExp(`^${title}`) }));
  await screen.findByRole('heading', { name: title });
  await user.press(getGuestBookmark());
  await user.press(screen.getByRole('button', { name: '로그인 닫기' }));
  expect(screen.getByRole('heading', { name: title })).toBeVisible();
  await user.press(getGuestBookmark());
  await user.press(screen.getByRole('button', { name: '모의 동작 선택 열기' }));
  await user.press(screen.getByRole('radio', { name: '모의 결과: 사용자 취소' }));
  expect(screen.getByRole('radio', { name: '모의 결과: 사용자 취소' })).toBeChecked();
  await user.press(screen.getByRole('button', { name: 'Google로 로그인 (모의)' }));
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  expect(getGuestBookmark()).toBeVisible();
  await user.press(getGuestBookmark());
  await user.press(screen.getByRole('radio', { name: mockUserB.name }));
  expect(screen.getByRole('radio', { name: mockUserB.name })).toBeChecked();
  await user.press(screen.getByRole('button', { name: '모의 동작 선택 열기' }));
  await user.press(screen.getByRole('radio', { name: '모의 결과: 실패' }));
  await user.press(screen.getByRole('button', { name: 'Google로 로그인 (모의)' }));
  expect(screen.getByRole('alert')).toHaveTextContent(/로그인하지 못했어요/);
  await user.press(screen.getByRole('button', { name: '로그인 다시 시도' }));
  await waitFor(() => expect(getBookmark()).toBeEnabled());
  expect(getBookmark()).toHaveProp('accessibilityState', expect.objectContaining({ checked: false })); expect(getClap()).toHaveProp('accessibilityValue', expect.objectContaining({ now: 0 }));
  expect(setArticleSaved).not.toHaveBeenCalled(); expect(save).not.toHaveBeenCalled();
  await user.press(getBookmark()); await user.press(getClap());
  expect(setArticleSaved).toHaveBeenCalledTimes(1); expect(save).toHaveBeenCalledTimes(1);
  expect(setArticleSaved.mock.calls[0]?.[0]).toMatchObject({ userId: mockUserB.id, saved: true });
  expect(save.mock.calls[0]?.[0]).toMatchObject({ userId: mockUserB.id, mine: 1 });
  await user.press(screen.getByRole('button', { name: '탐색으로 돌아가기' }));
  expect(screen.getByLabelText('기사 검색어')).toHaveDisplayValue('금리');
  expect(getBookmark()).toHaveProp('accessibilityState', expect.objectContaining({ checked: true })); expect(getClap()).toHaveProp('accessibilityValue', expect.objectContaining({ now: 1 }));
}, 15000);

it('라이브러리 로그인과 기사 복귀 뒤 로그아웃 취소·실패는 A 데이터를 지키고 재시도 후 B에는 개인 목록이 없다', async () => {
  const user = userEvent.setup(); await renderApp();
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  await user.press(screen.getByRole('button', { name: '라이브러리 모의 로그인' }));
  await user.press(screen.getByRole('button', { name: 'Google로 로그인 (모의)' }));
  await user.press(await screen.findByRole('button', { name: '읽기 목록 열기, 저장한 기사 0개' }));
  await user.press(screen.getByRole('button', { name: '기사 둘러보기' }));
  await user.press(getBookmark());
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  await user.press(getArticle()); await screen.findByRole('heading', { name: title });
  await user.press(screen.getByRole('button', { name: '읽기 목록으로 돌아가기' }));
  expect(screen.getByLabelText('1개의 기사')).toBeVisible();
  await user.press(screen.getByRole('tab', { name: '프로필' }));
  await user.press(screen.getByRole('button', { name: '로그아웃' }));
  await user.press(screen.getByRole('button', { name: '로그아웃 취소' }));
  expect(screen.getByText(`${mockUserA.name} · 로그인됨`)).toBeVisible();
  await user.press(screen.getByRole('button', { name: '로그아웃' }));
  await user.press(screen.getByRole('button', { name: '모의 동작 선택 열기' }));
  await user.press(screen.getByRole('radio', { name: '모의 결과: 실패' }));
  await user.press(screen.getByRole('button', { name: '로그아웃 확인' }));
  expect(screen.getByRole('alert')).toHaveTextContent(/로그인 상태를 유지했어요/);
  await user.press(screen.getByRole('button', { name: '로그아웃 다시 시도' }));
  await logIn(user, mockUserB.name);
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  expect(screen.getByRole('heading', { name: '라이브러리' })).toBeVisible();
  expect(await screen.findByRole('button', { name: '읽기 목록 열기, 저장한 기사 0개' })).toBeVisible();
  expect(screen.queryByLabelText('1개의 기사')).not.toBeOnTheScreen();
  await logOut(user); await logIn(user);
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  expect(await screen.findByRole('button', { name: '읽기 목록 열기, 저장한 기사 1개' })).toBeVisible();
}, 15000);

it.each(['success', 'failure'] as const)('A 개인 변경의 늦은 %s를 격리하고 재로그인에서는 확정 목록만 복원한다', async (outcome) => {
  const clapPending = deferred<ClapValue>();
  const savePending = deferred<Awaited<ReturnType<BookmarkSource['setArticleSaved']>>>();
  const listPending = deferred<Awaited<ReturnType<UserListSource['setList']>>>();
  const like = createMockClapSource({ delayMs: 0 }); const bookmarks = createMockBookmarkSource({ delayMs: 0 });
  if (!bookmarks.lists) throw new Error('Missing lists');
  const save = jest.fn(like.save).mockReturnValueOnce(clapPending.promise);
  const setArticleSaved = jest.fn(bookmarks.setArticleSaved).mockReturnValueOnce(savePending.promise);
  const setList = jest.fn(bookmarks.lists.setList).mockReturnValueOnce(listPending.promise);
  const user = userEvent.setup();
  await renderApp({ clapSource: { ...like, save },
    bookmarkSource: { ...bookmarks, setArticleSaved, lists: { ...bookmarks.lists, setList } } });
  await user.press(screen.getByRole('tab', { name: '프로필' })); await logIn(user);
  await user.press(screen.getByRole('tab', { name: '홈' }));
  await waitFor(() => expect(getClap()).toBeEnabled()); await user.press(getClap()); await user.press(getBookmark());
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  await user.press(screen.getByRole('button', { name: '새 목록' }));
  await user.type(screen.getByLabelText('목록 이름 · 필수'), 'A 비공개 공부');
  await user.press(screen.getByRole('button', { name: '목록 만들기' }));
  await user.press(screen.getByRole('button', { name: '새 목록 만들기 닫기' }));
  await logOut(user); await logIn(user, mockUserB.name);
  const command = setList.mock.calls[0]?.[0]; if (!command) throw new Error('Missing command');
  expect(command.userId).toBe(mockUserA.id);
  await act(async () => {
    if (outcome === 'success') {
      clapPending.resolve({ userId: mockUserA.id, target: { kind: 'article', id: 'example-latest-rates' }, mine: 1, total: 25 });
      savePending.resolve({ userId: mockUserA.id, articleId: 'example-latest-rates', saved: true });
      if (!bookmarks.lists) throw new Error('Missing lists');
      listPending.resolve(await bookmarks.lists.setList(command));
    } else {
      clapPending.reject(new Error('A like')); savePending.reject(new Error('A save')); listPending.reject(new Error('A list'));
    }
  });
  await user.press(screen.getByRole('tab', { name: '홈' }));
  await waitFor(() => expect(getClap()).toBeEnabled());
  expect(getClap()).toHaveProp('accessibilityValue', expect.objectContaining({ now: 0 })); expect(getBookmark()).toHaveProp('accessibilityState', expect.objectContaining({ checked: false }));
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  expect(screen.queryByRole('button', { name: /A 비공개 공부/ })).not.toBeOnTheScreen();
  expect(screen.queryByLabelText('목록 이름 · 필수')).not.toBeOnTheScreen();
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  await logOut(user); await logIn(user);
  await user.press(screen.getByRole('tab', { name: '홈' }));
  if (outcome === 'failure') {
    expect(screen.queryByRole('button', { name: `박수 다시 시도, ${title}` })).toBeNull();
    await user.press(getClap());
    await user.press(screen.getByRole('button', { name: `북마크 변경 다시 시도, ${title}` }));
  }
  expect(getClap()).toHaveProp('accessibilityValue', expect.objectContaining({ now: 1 })); expect(getBookmark()).toHaveProp('accessibilityState', expect.objectContaining({ checked: true }));
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  if (outcome === 'failure') {
    expect(screen.queryByRole('button', { name: '목록 변경 다시 시도, A 비공개 공부' })).toBeNull();
    await user.press(screen.getByRole('button', { name: '새 목록' }));
    await user.type(screen.getByLabelText('목록 이름 · 필수'), 'A 비공개 공부');
    await user.press(screen.getByRole('button', { name: '목록 만들기' }));
  }
  expect(screen.getByRole('button', { name: 'A 비공개 공부 열기, 저장한 기사 0개' })).toBeVisible();
  expect(screen.queryByLabelText('목록 이름 · 필수')).not.toBeOnTheScreen();
}, 15000);

it('가입/로그인 소개 전환과 미연결 공급자 안내는 인증하거나 원래 기사를 잃지 않는다', async () => {
  const user = userEvent.setup(); await renderApp();
  await user.press(getArticle()); await screen.findByRole('heading', { name: title });
  await user.press(getGuestBookmark());
  await user.press(screen.getByRole('button', { name: 'Create account' }));
  expect(screen.queryByRole('button', { name: 'Sign up with X' })).not.toBeOnTheScreen();
  await user.press(screen.getByRole('button', { name: 'Sign up with Email' }));
  expect(screen.getByRole('heading', { name: 'Email authentication' })).toBeVisible();
  await user.press(screen.getByRole('button', { name: 'Got it' }));
  await user.press(screen.getByRole('button', { name: 'Sign in' }));
  expect(screen.getByRole('button', { name: 'Sign in with X' })).toBeVisible();
  await user.press(screen.getByRole('button', { name: '로그인 닫기' }));
  expect(screen.getByRole('heading', { name: title })).toBeVisible();
  expect(getGuestBookmark()).toBeVisible();
});
