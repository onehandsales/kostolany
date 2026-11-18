import { act, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import { createMockBookmarkSource } from '../../features/bookmarks/data/createMockBookmarkSource';
import { createMockUserListSource, type UserListScenario } from '../../features/bookmarks/data/createMockUserListSource';
import type { UserListSource } from '../../features/bookmarks/listTypes';
import { createMockFeedSource } from '../../features/feed/data/mockFeedSource';
import { deferred } from '../../features/feed/tests/helpers';
import { createMockLikeSource } from '../../features/likes/data/createMockLikeSource';
import { createMockSearchSource } from '../../features/search/data/mockSearchSource';
import { mockUserA } from '../../features/auth/data/mockUsers';
import { AppNavigator } from './AppNavigator';

const title = '금리가 오르면 예금과 대출에는 어떤 일이 생길까';
const articleId = 'example-latest-rates';
const userId = 'example-reader';
const getBookmark = () => screen.getByRole('togglebutton', { name: new RegExp(`^북마크, ${title}`) });
const getArticle = () => screen.getByRole('button', { name: new RegExp(`^${title}`) });

async function renderApp(lists = createMockUserListSource({ delayMs: 0 })) {
  await render(<SafeAreaProvider><AppNavigator initialUser={mockUserA} bookmarkSource={{ ...createMockBookmarkSource({ delayMs: 0 }), lists }}
    feedSource={createMockFeedSource({ delayMs: 0 })} articleSource={createMockArticleSource({ delayMs: 0 })}
    searchSource={createMockSearchSource({ delayMs: 0 })} likeSource={createMockLikeSource({ delayMs: 0 })} />
  </SafeAreaProvider>);
  await waitFor(() => expect(getBookmark()).toBeEnabled());
}

async function createList(user: ReturnType<typeof userEvent.setup>, name: string) {
  await user.press(screen.getByRole('button', { name: '새 목록' }));
  await user.type(screen.getByLabelText('목록 이름 · 필수'), name);
  await user.press(screen.getByRole('button', { name: '목록 만들기' }));
  await screen.findByRole('button', { name: `${name} 열기, 저장한 기사 0개` });
}

async function selectList(user: ReturnType<typeof userEvent.setup>, name: string) {
  await user.press(screen.getByRole('button', { name: `저장할 목록 선택, ${title}` }));
  await user.press(screen.getByRole('checkbox', { name }));
  await user.press(screen.getByRole('button', { name: '저장할 목록 적용' }));
}

it('생성부터 기사 추가·상세 복귀·이름 수정·제거·삭제까지 기본 목록과 좋아요를 보존한다', async () => {
  const user = userEvent.setup(); await renderApp();
  await user.press(screen.getByRole('tab', { name: '라이브러리' })); await createList(user, '경제 공부');
  await user.press(screen.getByRole('tab', { name: '홈' })); await user.press(getBookmark());
  await user.press(screen.getByRole('togglebutton', { name: new RegExp(`^좋아요, ${title}`) }));
  await selectList(user, '경제 공부');
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  expect(screen.getByRole('button', { name: '읽기 목록 열기, 저장한 기사 1개' })).toBeVisible();
  await user.press(screen.getByRole('button', { name: '경제 공부 열기, 저장한 기사 1개' }));
  await user.press(getArticle()); await screen.findByRole('heading', { name: title });
  await user.press(screen.getByRole('button', { name: '저장 목록으로 돌아가기' }));
  expect(screen.getByRole('heading', { name: '경제 공부' })).toBeVisible();
  await user.press(screen.getByRole('button', { name: '목록 관리, 경제 공부' }));
  await user.press(screen.getByRole('button', { name: '이름 수정' }));
  await user.clear(screen.getByLabelText('목록 이름 · 필수')); await user.type(screen.getByLabelText('목록 이름 · 필수'), '금리 공부');
  await user.press(screen.getByRole('button', { name: '목록 이름 저장' }));
  await screen.findByRole('heading', { name: '금리 공부' });
  await user.press(screen.getByRole('button', { name: `이 목록에서 제거, ${title}` }));
  expect(screen.getByText('아직 저장한 기사가 없어요.')).toBeVisible();
  await user.press(screen.getByRole('button', { name: '목록 관리, 금리 공부' }));
  await user.press(screen.getByRole('button', { name: '목록 삭제' }));
  await user.press(screen.getByRole('button', { name: '목록 삭제 취소' }));
  expect(screen.getByRole('heading', { name: '금리 공부' })).toBeVisible();
  await user.press(screen.getByRole('button', { name: '목록 관리, 금리 공부' }));
  await user.press(screen.getByRole('button', { name: '목록 삭제' }));
  await user.press(screen.getByRole('button', { name: '목록 삭제 확인' }));
  expect(await screen.findByRole('heading', { name: '라이브러리' })).toBeVisible();
  expect(screen.queryByRole('button', { name: /금리 공부 열기/ })).not.toBeOnTheScreen();
  await user.press(screen.getByRole('button', { name: '읽기 목록 열기, 저장한 기사 1개' }));
  expect(getBookmark()).toHaveProp('accessibilityState', expect.objectContaining({ checked: true }));
  expect(screen.getByRole('togglebutton', { name: new RegExp(`^좋아요, ${title}`) })).toHaveProp('accessibilityState',
    expect.objectContaining({ checked: true }));
});

it('생성·이름 편집·저장 대상 선택 취소는 데이터를 바꾸지 않으며 기본 목록은 관리 메뉴가 없다', async () => {
  const user = userEvent.setup(); await renderApp();
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  expect(screen.queryByRole('button', { name: '목록 관리, 읽기 목록' })).not.toBeOnTheScreen();
  await user.press(screen.getByRole('button', { name: '새 목록' }));
  expect(screen.getByRole('button', { name: '목록 만들기' })).toBeDisabled();
  await user.type(screen.getByLabelText('목록 이름 · 필수'), '   ');
  expect(screen.getByRole('button', { name: '목록 만들기' })).toBeDisabled();
  await user.press(screen.getByRole('button', { name: '새 목록 만들기 취소' }));
  await createList(user, '경제');
  await user.press(screen.getByRole('button', { name: '목록 관리, 경제' }));
  await user.press(screen.getByRole('button', { name: '이름 수정' }));
  await user.type(screen.getByLabelText('목록 이름 · 필수'), ' 취소할 내용');
  await user.press(screen.getByRole('button', { name: '목록 이름 수정 취소' }));
  expect(screen.getByRole('button', { name: '경제 열기, 저장한 기사 0개' })).toBeVisible();
  await user.press(screen.getByRole('tab', { name: '홈' }));
  await user.press(screen.getByRole('button', { name: `저장할 목록 선택, ${title}` }));
  await user.press(screen.getByRole('checkbox', { name: '경제' }));
  await user.press(screen.getByRole('button', { name: '저장할 목록 취소' }));
  expect(getBookmark()).toHaveProp('accessibilityState', expect.objectContaining({ checked: false }));
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  expect(screen.getByRole('button', { name: '경제 열기, 저장한 기사 0개' })).toBeVisible();
});

it('생성 실패는 입력을 보존하며 이름을 수정한 재시도도 같은 목록 ID를 사용한다', async () => {
  const source = createMockUserListSource({ delayMs: 0, scenario: 'create-error' });
  const setList = jest.fn(source.setList); const user = userEvent.setup();
  await renderApp({ ...source, setList });
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  await user.press(screen.getByRole('button', { name: '새 목록' }));
  await user.type(screen.getByLabelText('목록 이름 · 필수'), '처음 이름');
  await user.press(screen.getByRole('button', { name: '목록 만들기' }));
  expect(screen.getByLabelText('목록 이름 · 필수')).toHaveDisplayValue('처음 이름');
  await user.clear(screen.getByLabelText('목록 이름 · 필수')); await user.type(screen.getByLabelText('목록 이름 · 필수'), '수정한 이름');
  await user.press(screen.getByRole('button', { name: '목록 저장 다시 시도' }));
  expect(await screen.findByRole('button', { name: '수정한 이름 열기, 저장한 기사 0개' })).toBeVisible();
  expect(setList).toHaveBeenCalledTimes(2);
  expect(setList.mock.calls[0]?.[0].listId).toBe(setList.mock.calls[1]?.[0].listId);
});

it('이름 수정 실패 후 초안을 보존하고 재시도하면 카드와 상세 제목이 함께 바뀐다', async () => {
  const user = userEvent.setup(); await renderApp(createMockUserListSource({ delayMs: 0, scenario: 'rename-error' }));
  await user.press(screen.getByRole('tab', { name: '라이브러리' })); await createList(user, '경제');
  await user.press(screen.getByRole('button', { name: '목록 관리, 경제' }));
  await user.press(screen.getByRole('button', { name: '이름 수정' }));
  await user.clear(screen.getByLabelText('목록 이름 · 필수')); await user.type(screen.getByLabelText('목록 이름 · 필수'), '환율');
  await user.press(screen.getByRole('button', { name: '목록 이름 저장' }));
  expect(screen.getByLabelText('목록 이름 · 필수')).toHaveDisplayValue('환율');
  await user.press(screen.getByRole('button', { name: '목록 저장 다시 시도' }));
  await user.press(await screen.findByRole('button', { name: '환율 열기, 저장한 기사 0개' }));
  expect(screen.getByRole('heading', { name: '환율' })).toBeVisible();
});

it('상세에서 삭제 중 라이브러리로 복귀하고 실패하면 목록을 복원해 그곳에서 재시도한다', async () => {
  const source = createMockUserListSource({ delayMs: 0 });
  const setList = jest.fn(source.setList); const user = userEvent.setup(); await renderApp({ ...source, setList });
  await user.press(screen.getByRole('tab', { name: '라이브러리' })); await createList(user, '경제');
  await user.press(screen.getByRole('button', { name: '경제 열기, 저장한 기사 0개' }));
  const pending = deferred<Awaited<ReturnType<UserListSource['setList']>>>(); setList.mockReturnValueOnce(pending.promise);
  await user.press(screen.getByRole('button', { name: '목록 관리, 경제' }));
  await user.press(screen.getByRole('button', { name: '목록 삭제' }));
  await user.press(screen.getByRole('button', { name: '목록 삭제 확인' }));
  expect(await screen.findByRole('heading', { name: '라이브러리' })).toBeVisible();
  await act(async () => pending.reject(new Error('delete failed')));
  expect(screen.getByRole('button', { name: '경제 열기, 저장한 기사 0개' })).toBeVisible();
  await user.press(screen.getByRole('button', { name: '목록 변경 다시 시도, 경제' }));
  expect(screen.queryByRole('button', { name: /경제 열기/ })).not.toBeOnTheScreen();
  expect(screen.queryByRole('button', { name: '목록 삭제 확인' })).not.toBeOnTheScreen();
});

it.each(['add-error', 'list-remove-error'] satisfies UserListScenario[])('%s 뒤 목록에서 재시도하면 홈·검색·상세와 일치한다', async (scenario) => {
  const source = createMockUserListSource({ delayMs: 0, scenario });
  await source.setList({ userId, listId: 'custom', commandId: 1,
    content: { name: '경제', articleIds: scenario === 'list-remove-error' ? [articleId] : [] } });
  const user = userEvent.setup(); await renderApp(source);
  await selectList(user, '경제');
  expect(getBookmark()).toHaveProp('accessibilityState', expect.objectContaining({ checked: scenario === 'list-remove-error' }));
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  await user.press(screen.getByRole('button', { name: '목록 변경 다시 시도, 경제' }));
  await user.press(screen.getByRole('tab', { name: '탐색' }));
  await user.press(screen.getByRole('button', { name: '기사 검색 열기' }));
  await user.type(screen.getByLabelText('기사 검색어'), '금리');
  await waitFor(() => expect(getBookmark()).toBeEnabled());
  expect(getBookmark()).toHaveProp('accessibilityState', expect.objectContaining({ checked: scenario === 'add-error' }));
  await user.press(getArticle()); await screen.findByRole('heading', { name: title });
  expect(getBookmark()).toHaveProp('accessibilityState', expect.objectContaining({ checked: scenario === 'add-error' }));
});

it('저장 대상에서 새 목록을 만든 뒤 완료해야 기사 소속을 반영한다', async () => {
  const user = userEvent.setup(); await renderApp();
  await user.press(screen.getByRole('button', { name: `저장할 목록 선택, ${title}` }));
  await user.press(screen.getByRole('button', { name: '새 목록 만들기' }));
  await user.type(screen.getByLabelText('목록 이름 · 필수'), '나중에 읽기');
  await user.press(screen.getByRole('button', { name: '목록 만들기' }));
  expect(await screen.findByRole('checkbox', { name: '나중에 읽기' })).toBeChecked();
  await user.press(screen.getByRole('button', { name: '저장할 목록 적용' }));
  expect(getBookmark()).toHaveProp('accessibilityState', expect.objectContaining({ checked: true }));
  await user.press(getBookmark());
  expect(screen.getByRole('checkbox', { name: '나중에 읽기' })).toBeChecked();
  expect(screen.getByRole('checkbox', { name: '읽기 목록' })).not.toBeChecked();
  await user.press(screen.getByRole('button', { name: '저장할 목록 취소' }));
});

it('사용자 목록의 마지막 기사 제거 실패는 카드와 하나의 재시도 안내를 복원한다', async () => {
  const source = createMockUserListSource({ delayMs: 0, scenario: 'list-remove-error' });
  await source.setList({ userId, listId: 'custom', commandId: 1, content: { name: '경제', articleIds: [articleId] } });
  const user = userEvent.setup(); await renderApp(source);
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  await user.press(screen.getByRole('button', { name: '경제 열기, 저장한 기사 1개' }));
  await user.press(screen.getByRole('button', { name: `이 목록에서 제거, ${title}` }));
  expect(getArticle()).toBeVisible();
  expect(screen.getAllByRole('alert')).toHaveLength(1);
  await user.press(screen.getByRole('button', { name: `북마크 변경 다시 시도, ${title}` }));
  expect(screen.getByText('아직 저장한 기사가 없어요.')).toBeVisible();
});

it('저장 대상에서 생성을 확정한 뒤 선택을 취소하면 새 목록은 남고 기사는 추가하지 않는다', async () => {
  const user = userEvent.setup(); await renderApp();
  await user.press(screen.getByRole('button', { name: `저장할 목록 선택, ${title}` }));
  await user.press(screen.getByRole('button', { name: '새 목록 만들기' }));
  await user.type(screen.getByLabelText('목록 이름 · 필수'), '빈 목록으로 보관');
  await user.press(screen.getByRole('button', { name: '목록 만들기' }));
  expect(await screen.findByRole('checkbox', { name: '빈 목록으로 보관' })).toBeChecked();
  await user.press(screen.getByRole('button', { name: '저장할 목록 취소' }));
  expect(getBookmark()).toHaveProp('accessibilityState', expect.objectContaining({ checked: false }));
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  expect(screen.getByRole('button', { name: '빈 목록으로 보관 열기, 저장한 기사 0개' })).toBeVisible();
});
