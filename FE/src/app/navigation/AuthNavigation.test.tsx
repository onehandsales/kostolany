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
import { createMockLikeSource } from '../../features/likes/data/createMockLikeSource';
import type { ArticleLike, LikeSource } from '../../features/likes/types';
import { createMockSearchSource } from '../../features/search/data/mockSearchSource';
import { AppNavigator } from './AppNavigator';

const title = '금리가 오르면 예금과 대출에는 어떤 일이 생길까';
const getLike = () => screen.getByRole('togglebutton', { name: new RegExp(`^좋아요, ${title}`) });
const getBookmark = () => screen.getByRole('togglebutton', { name: new RegExp(`^북마크, ${title}`) });
const getGuestBookmark = () => screen.getByRole('button', { name: `북마크, ${title}, 로그인 필요` });
const getArticle = () => screen.getByRole('button', { name: new RegExp(`^${title}`) });

async function renderApp({ likeSource = createMockLikeSource({ delayMs: 0 }),
  bookmarkSource = createMockBookmarkSource({ delayMs: 0 }) }: {
  likeSource?: LikeSource; bookmarkSource?: BookmarkSource;
} = {}) {
  await render(<SafeAreaProvider><AppNavigator authSource={createMockAuthSource({ delayMs: 0 })}
    likeSource={likeSource} bookmarkSource={bookmarkSource} feedSource={createMockFeedSource({ delayMs: 0 })}
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
  const like = createMockLikeSource({ delayMs: 0 }); const bookmarks = createMockBookmarkSource({ delayMs: 0 });
  const setArticleLiked = jest.fn(like.setArticleLiked); const setArticleSaved = jest.fn(bookmarks.setArticleSaved);
  const user = userEvent.setup();
  await renderApp({ likeSource: { ...like, setArticleLiked }, bookmarkSource: { ...bookmarks, setArticleSaved } });
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
  await user.press(screen.getByRole('button', { name: 'Google로 로그인 (모의)' }));
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  expect(getGuestBookmark()).toBeVisible();
  await user.press(getGuestBookmark());
  await user.press(screen.getByRole('radio', { name: mockUserB.name }));
  await user.press(screen.getByRole('button', { name: '모의 동작 선택 열기' }));
  await user.press(screen.getByRole('radio', { name: '모의 결과: 실패' }));
  await user.press(screen.getByRole('button', { name: 'Google로 로그인 (모의)' }));
  expect(screen.getByRole('alert')).toHaveTextContent(/로그인하지 못했어요/);
  await user.press(screen.getByRole('button', { name: '로그인 다시 시도' }));
  await waitFor(() => expect(getBookmark()).toBeEnabled());
  expect(getBookmark()).toHaveProp('accessibilityState', expect.objectContaining({ checked: false })); expect(getLike()).toHaveProp('accessibilityState', expect.objectContaining({ checked: false }));
  expect(setArticleSaved).not.toHaveBeenCalled(); expect(setArticleLiked).not.toHaveBeenCalled();
  await user.press(getBookmark()); await user.press(getLike());
  expect(setArticleSaved).toHaveBeenCalledTimes(1); expect(setArticleLiked).toHaveBeenCalledTimes(1);
  expect(setArticleSaved.mock.calls[0]?.[0]).toMatchObject({ userId: mockUserB.id, saved: true });
  expect(setArticleLiked.mock.calls[0]?.[0]).toMatchObject({ userId: mockUserB.id, liked: true });
  await user.press(screen.getByRole('button', { name: '탐색으로 돌아가기' }));
  expect(screen.getByLabelText('기사 검색어')).toHaveDisplayValue('금리');
  expect(getBookmark()).toHaveProp('accessibilityState', expect.objectContaining({ checked: true })); expect(getLike()).toHaveProp('accessibilityState', expect.objectContaining({ checked: true }));
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
  expect(screen.getByText('1개의 기사')).toBeVisible();
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
  expect(screen.queryByText('1개의 기사')).not.toBeOnTheScreen();
  await logOut(user); await logIn(user);
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  expect(await screen.findByRole('button', { name: '읽기 목록 열기, 저장한 기사 1개' })).toBeVisible();
}, 15000);

it.each(['success', 'failure'] as const)('A 개인 변경 중 로그아웃→B에서 늦은 %s를 격리하고 A 복귀 시 결과 또는 재시도를 이어간다', async (outcome) => {
  const likePending = deferred<ArticleLike>();
  const savePending = deferred<Awaited<ReturnType<BookmarkSource['setArticleSaved']>>>();
  const listPending = deferred<Awaited<ReturnType<UserListSource['setList']>>>();
  const like = createMockLikeSource({ delayMs: 0 }); const bookmarks = createMockBookmarkSource({ delayMs: 0 });
  if (!bookmarks.lists) throw new Error('Missing lists');
  const setArticleLiked = jest.fn(like.setArticleLiked).mockReturnValueOnce(likePending.promise);
  const setArticleSaved = jest.fn(bookmarks.setArticleSaved).mockReturnValueOnce(savePending.promise);
  const setList = jest.fn(bookmarks.lists.setList).mockReturnValueOnce(listPending.promise);
  const user = userEvent.setup();
  await renderApp({ likeSource: { ...like, setArticleLiked },
    bookmarkSource: { ...bookmarks, setArticleSaved, lists: { ...bookmarks.lists, setList } } });
  await user.press(screen.getByRole('tab', { name: '프로필' })); await logIn(user);
  await user.press(screen.getByRole('tab', { name: '홈' }));
  await waitFor(() => expect(getLike()).toBeEnabled()); await user.press(getLike()); await user.press(getBookmark());
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
      likePending.resolve({ userId: mockUserA.id, articleId: 'example-latest-rates', isLiked: true, count: 25 });
      savePending.resolve({ userId: mockUserA.id, articleId: 'example-latest-rates', saved: true });
      listPending.resolve(command);
    } else {
      likePending.reject(new Error('A like')); savePending.reject(new Error('A save')); listPending.reject(new Error('A list'));
    }
  });
  await user.press(screen.getByRole('tab', { name: '홈' }));
  await waitFor(() => expect(getLike()).toBeEnabled());
  expect(getLike()).toHaveProp('accessibilityState', expect.objectContaining({ checked: false })); expect(getBookmark()).toHaveProp('accessibilityState', expect.objectContaining({ checked: false }));
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  expect(screen.queryByRole('button', { name: /A 비공개 공부/ })).not.toBeOnTheScreen();
  expect(screen.queryByLabelText('목록 이름 · 필수')).not.toBeOnTheScreen();
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  await logOut(user); await logIn(user);
  await user.press(screen.getByRole('tab', { name: '홈' }));
  if (outcome === 'failure') {
    await user.press(screen.getByRole('button', { name: `좋아요 변경 다시 시도, ${title}` }));
    await user.press(screen.getByRole('button', { name: `북마크 변경 다시 시도, ${title}` }));
  }
  expect(getLike()).toHaveProp('accessibilityState', expect.objectContaining({ checked: true })); expect(getBookmark()).toHaveProp('accessibilityState', expect.objectContaining({ checked: true }));
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  if (outcome === 'failure') await user.press(screen.getByRole('button', { name: '목록 변경 다시 시도, A 비공개 공부' }));
  expect(screen.getByRole('button', { name: 'A 비공개 공부 열기, 저장한 기사 0개' })).toBeVisible();
  expect(screen.queryByLabelText('목록 이름 · 필수')).not.toBeOnTheScreen();
}, 15000);
