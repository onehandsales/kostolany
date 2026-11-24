import { act, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import { createMockBookmarkSource } from '../../features/bookmarks/data/createMockBookmarkSource';
import type { ArticleBookmark, BookmarkSource } from '../../features/bookmarks/types';
import { createMockFeedSource } from '../../features/feed/data/mockFeedSource';
import { deferred } from '../../features/feed/tests/helpers';
import { createMockClapSource } from '../../features/reactions/data/createMockClapSource';
import { createMockSearchSource } from '../../features/search/data/mockSearchSource';
import { mockUserA } from '../../features/auth/data/mockUsers';
import { AppNavigator } from './AppNavigator';

// VirtualizedList의 50ms 예약 갱신도 사용자 이벤트·waitFor의 act 안에서 진행한다.
beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

const title = '금리가 오르면 예금과 대출에는 어떤 일이 생길까';
const articleId = 'example-latest-rates';
const getBookmark = () => screen.getByRole('togglebutton', { name: new RegExp(`^북마크, ${title}`) });
const getArticle = () => screen.getByRole('button', { name: new RegExp(`^${title}`) });

async function renderApp(bookmarkSource = createMockBookmarkSource({ delayMs: 0 })) {
  await render(<SafeAreaProvider><AppNavigator initialUser={mockUserA} bookmarkSource={bookmarkSource}
    feedSource={createMockFeedSource({ delayMs: 0 })} articleSource={createMockArticleSource({ delayMs: 0 })}
    searchSource={createMockSearchSource({ delayMs: 0 })} clapSource={createMockClapSource({ delayMs: 0,
      // 이 테스트의 기존 북마크 공급부는 기본 목록을 공개 카탈로그에 투영하지 않는다.
      baselineFor: ({ target }) => target.kind === 'list' ? 0 : undefined })} />
  </SafeAreaProvider>);
  await waitFor(() => expect(getBookmark()).toBeEnabled());
}

it('홈에서 저장한 기사를 목록·상세·검색에서 다시 찾고 해제하면 모든 화면에 반영한다', async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await renderApp();
  await user.press(getBookmark());
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  await user.press(screen.getByRole('button', { name: '읽기 목록 열기, 저장한 기사 1개' }));
  expect(screen.getByRole('heading', { name: '읽기 목록' })).toBeVisible();
  expect(getBookmark()).toHaveProp('accessibilityState', expect.objectContaining({ checked: true }));
  await user.press(getArticle());
  expect(await screen.findByRole('heading', { name: title })).toBeVisible();
  await user.press(getBookmark());
  await user.press(screen.getByRole('button', { name: '읽기 목록으로 돌아가기' }));
  expect(screen.getByLabelText('아직 저장한 기사가 없어요.')).toBeVisible();
  await user.press(screen.getByRole('button', { name: '라이브러리로 돌아가기' }));
  expect(screen.getByRole('button', { name: '읽기 목록 열기, 저장한 기사 0개' })).toBeVisible();
  await user.press(screen.getByRole('tab', { name: '탐색' }));
  await user.press(screen.getByRole('button', { name: '기사 검색 열기' }));
  await user.type(screen.getByLabelText('기사 검색어'), '금리');
  await waitFor(() => expect(getBookmark()).toBeEnabled());
  expect(getBookmark()).toHaveProp('accessibilityState', expect.objectContaining({ checked: false }));
  await user.press(getBookmark());
  await user.press(getArticle());
  await screen.findByRole('heading', { name: title });
  expect(getBookmark()).toHaveProp('accessibilityState', expect.objectContaining({ checked: true }));
  await user.press(screen.getByRole('button', { name: '탐색으로 돌아가기' }));
  expect(screen.getByLabelText('기사 검색어')).toHaveDisplayValue('금리');
  await user.press(screen.getByRole('tab', { name: '홈' }));
  expect(getBookmark()).toHaveProp('accessibilityState', expect.objectContaining({ checked: true }));
});

it('빈 목록의 둘러보기로 홈에 복귀하고 목록에 다시 진입해도 올바른 경로를 유지한다', async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await renderApp();
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  await user.press(screen.getByRole('button', { name: '읽기 목록 열기, 저장한 기사 0개' }));
  await user.press(screen.getByRole('button', { name: '기사 둘러보기' }));
  expect(screen.getByRole('tab', { name: '홈' })).toBeSelected();
  await user.press(getBookmark());
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  expect(screen.getByRole('heading', { name: '읽기 목록' })).toBeVisible();
  expect(getArticle()).toBeVisible();
});

it('목록의 마지막 기사를 해제하다 실패하면 카드와 재시도를 복원하고 기사 원문은 유지한다', async () => {
  const source = createMockBookmarkSource({ delayMs: 0 });
  await source.setArticleSaved({ userId: 'example-reader', articleId, saved: true, commandId: 0 });
  const pending = deferred<ArticleBookmark>();
  const injected = { ...source, setArticleSaved: jest.fn(source.setArticleSaved).mockReturnValueOnce(pending.promise) };
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await renderApp(injected);
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  await user.press(screen.getByRole('button', { name: '읽기 목록 열기, 저장한 기사 1개' }));
  await user.press(getBookmark());
  expect(screen.getByLabelText('아직 저장한 기사가 없어요.')).toBeVisible();
  await act(async () => pending.reject(new Error('not applied')));
  expect(getArticle()).toBeVisible();
  expect(getBookmark()).toHaveProp('accessibilityState', expect.objectContaining({ checked: true }));
  expect(screen.getAllByRole('alert')).toHaveLength(1);
  await user.press(screen.getByRole('button', { name: `북마크 변경 다시 시도, ${title}` }));
  expect(screen.getByLabelText('아직 저장한 기사가 없어요.')).toBeVisible();
  await user.press(screen.getByRole('button', { name: '기사 둘러보기' }));
  await user.press(getArticle());
  expect(await screen.findByRole('heading', { name: title })).toBeVisible();
});

it.each([true, false])('화면을 떠난 뒤 목표 %s가 실패해도 목록에서 재시도하고 같은 기사를 읽을 수 있다', async (target) => {
  const pending = deferred<ArticleBookmark>();
  const source = createMockBookmarkSource({ delayMs: 0 });
  if (!target) await source.setArticleSaved({ userId: 'example-reader', articleId, saved: true, commandId: 0 });
  const injected: BookmarkSource = { ...source, setArticleSaved: jest.fn(source.setArticleSaved).mockReturnValueOnce(pending.promise) };
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await renderApp(injected);
  await user.press(getArticle());
  await screen.findByRole('heading', { name: title });
  await user.press(getBookmark());
  await user.press(screen.getByRole('button', { name: '홈으로 돌아가기' }));
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  await act(async () => pending.reject(new Error('not applied')));
  expect(screen.getByRole('alert')).toHaveTextContent(target ? /저장하지 못했어요/ : /저장 해제하지 못했어요/);
  await user.press(screen.getByRole('button', { name: /^목록에서 북마크 변경 다시 시도,/ }));
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  await user.press(screen.getByRole('button', { name: `읽기 목록 열기, 저장한 기사 ${target ? 1 : 0}개` }));
  if (target) {
    await user.press(getArticle());
    await screen.findByRole('heading', { name: title });
    expect(getBookmark()).toHaveProp('accessibilityState', expect.objectContaining({ checked: true }));
  } else expect(screen.getByLabelText('아직 저장한 기사가 없어요.')).toBeVisible();
});
