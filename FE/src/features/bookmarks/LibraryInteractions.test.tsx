import { act, fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { deferred } from '../feed/tests/helpers';
import { ArticleBookmarkControl } from './ArticleBookmarkControl';
import { BookmarkProvider } from './BookmarkProvider';
import type { LibraryStore } from './createLibraryStore';
import { createMockBookmarkSource } from './data/createMockBookmarkSource';
import { LibraryScreen } from './LibraryScreen';
import type { UserListSource } from './listTypes';
import type { BookmarkSource } from './types';
import { useBookmarkStore } from './useBookmarks';

const articleId = 'example-latest-rates';
const onOpen = jest.fn();

it('원본 카드의 작은 저장 버튼은 선택 시트를 열고 취소는 저장하지 않으며 완료만 반영한다', async () => {
  const mock = createMockBookmarkSource({ delayMs: 0 });
  const write = jest.fn(mock.setArticleSaved);
  const user = userEvent.setup();
  await render(<SafeAreaProvider><BookmarkProvider userId="reader-a" source={{ ...mock, setArticleSaved: write }}>
    <ArticleBookmarkControl articleId="medium-love" articleTitle="원본 기사" compact />
  </BookmarkProvider></SafeAreaProvider>);
  await user.press(await screen.findByLabelText('북마크, 원본 기사, 저장 안 됨'));
  await user.press(await screen.findByRole('checkbox', { name: '읽기 목록' }));
  await user.press(screen.getByRole('button', { name: '저장할 목록 취소' }));
  expect(write).not.toHaveBeenCalled();
  await user.press(screen.getByLabelText('북마크, 원본 기사, 저장 안 됨'));
  expect(await screen.findByRole('checkbox', { name: '읽기 목록' })).not.toBeChecked();
  await user.press(screen.getByRole('checkbox', { name: '읽기 목록' }));
  await user.press(screen.getByRole('button', { name: '저장할 목록 적용' }));
  await waitFor(() => expect(write).toHaveBeenCalledTimes(1));
  expect(await screen.findByLabelText('북마크, 원본 기사, 저장됨')).toBeVisible();
});

function StoreProbe({ onStore }: { onStore: (store: LibraryStore) => void }) {
  const store = useBookmarkStore();
  useEffect(() => onStore(store), [onStore, store]);
  return null;
}

function TestLibrary({ source, userId = 'reader-a', onStore }: {
  source: BookmarkSource; userId?: string; onStore?: (store: LibraryStore) => void;
}) {
  return <SafeAreaProvider><BookmarkProvider source={source} userId={userId}>
    {onStore && <StoreProbe onStore={onStore} />}
    <LibraryScreen onOpenList={onOpen} />
    <ArticleBookmarkControl articleId={articleId} articleTitle="금리 기사" />
  </BookmarkProvider></SafeAreaProvider>;
}

it('사용자 전환은 열린 초안을 지우고 A로 복귀하면 A의 진행 중 생성 결과를 이어 받는다', async () => {
  const mock = createMockBookmarkSource({ delayMs: 0 }); if (!mock.lists) throw new Error('Missing source');
  const pending = deferred<Awaited<ReturnType<UserListSource['setList']>>>();
  const setList = jest.fn(mock.lists.setList).mockReturnValueOnce(pending.promise);
  const source = { ...mock, lists: { ...mock.lists, setList } };
  const user = userEvent.setup(); const view = await render(<TestLibrary source={source} />);
  await user.press(screen.getByRole('button', { name: '새 목록' }));
  await user.type(screen.getByLabelText('목록 이름 · 필수'), 'A의 목록');
  await user.press(screen.getByRole('button', { name: '목록 만들기' }));
  await view.rerender(<TestLibrary source={source} userId="reader-b" />);
  expect(screen.queryByLabelText('목록 이름 · 필수')).not.toBeOnTheScreen();
  expect(screen.queryByRole('button', { name: /A의 목록 열기/ })).not.toBeOnTheScreen();
  const command = setList.mock.calls[0]?.[0]; if (!command) throw new Error('Missing command');
  await act(async () => pending.resolve(command));
  await view.rerender(<TestLibrary source={source} />);
  expect(screen.getByRole('button', { name: 'A의 목록 열기, 저장한 기사 0개' })).toBeVisible();
  expect(screen.queryByLabelText('목록 이름 · 필수')).not.toBeOnTheScreen();
});

it.each(['success', 'failure'] as const)('공급부 교체는 생성 폼을 닫고 이전 %s 응답을 새 범위에서 격리한다', async (outcome) => {
  const mock = createMockBookmarkSource({ delayMs: 0 }); if (!mock.lists) throw new Error('Missing source');
  const pending = deferred<Awaited<ReturnType<UserListSource['setList']>>>();
  const setList = jest.fn(mock.lists.setList).mockReturnValueOnce(pending.promise);
  const source = { ...mock, lists: { ...mock.lists, setList } };
  const user = userEvent.setup(); const view = await render(<TestLibrary source={source} />);
  await user.press(screen.getByRole('button', { name: '새 목록' }));
  await user.type(screen.getByLabelText('목록 이름 · 필수'), '이전 범위');
  await user.press(screen.getByRole('button', { name: '목록 만들기' }));
  await view.rerender(<TestLibrary source={createMockBookmarkSource({ delayMs: 0 })} />);
  const command = setList.mock.calls[0]?.[0]; if (!command) throw new Error('Missing command');
  await act(async () => { if (outcome === 'success') pending.resolve(command); else pending.reject(new Error('old failure')); });
  expect(screen.queryByLabelText('목록 이름 · 필수')).not.toBeOnTheScreen();
  expect(screen.queryByRole('button', { name: /이전 범위 열기/ })).not.toBeOnTheScreen();
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
});

it('시트의 native 닫기 이벤트는 미제출 입력을 버리고 저장 요청을 만들지 않는다', async () => {
  const source = createMockBookmarkSource({ delayMs: 0 }); if (!source.lists) throw new Error('Missing source');
  const setList = jest.fn(source.lists.setList); const user = userEvent.setup();
  await render(<TestLibrary source={{ ...source, lists: { ...source.lists, setList } }} />);
  await user.press(screen.getByRole('button', { name: '새 목록' }));
  await user.type(screen.getByLabelText('목록 이름 · 필수'), '취소할 입력');
  // 기기 제스처 대신 Modal 경계가 전달하는 닫기 이벤트만 검증한다.
  await fireEvent(screen.getByLabelText('새 목록 만들기'), 'requestClose');
  expect(screen.queryByLabelText('목록 이름 · 필수')).not.toBeOnTheScreen(); expect(setList).not.toHaveBeenCalled();
  await user.press(screen.getByRole('button', { name: '새 목록' }));
  expect(screen.getByLabelText('목록 이름 · 필수')).toHaveDisplayValue('');
});

it('열린 저장 시트는 삭제된 목록을 되살리지 않고 변경하지 않은 다른 목록의 최신 선택을 보존한다', async () => {
  const source = createMockBookmarkSource({ delayMs: 0 }); if (!source.lists) throw new Error('Missing source');
  await source.lists.setList({ userId: 'reader-a', listId: 'first', commandId: 1, content: { name: '첫 목록', articleIds: [] } });
  await source.lists.setList({ userId: 'reader-a', listId: 'second', commandId: 2, content: { name: '둘째 목록', articleIds: [] } });
  let store: LibraryStore | undefined;
  const onStore = (current: LibraryStore) => { store = current; };
  const user = userEvent.setup(); await render(<TestLibrary source={source} onStore={onStore} />);
  await user.press(screen.getByRole('button', { name: '저장할 목록 선택, 금리 기사' }));
  await user.press(screen.getByRole('checkbox', { name: '첫 목록' }));
  await act(async () => { store?.userLists.deleteList('first'); store?.setArticleInList('second', articleId, true); });
  expect(screen.queryByRole('checkbox', { name: '첫 목록' })).not.toBeOnTheScreen();
  expect(screen.getByRole('checkbox', { name: '둘째 목록' })).toBeChecked();
  await user.press(screen.getByRole('button', { name: '저장할 목록 적용' }));
  expect(screen.queryByRole('button', { name: /첫 목록 열기/ })).not.toBeOnTheScreen();
  expect(screen.getByRole('button', { name: '둘째 목록 열기, 저장한 기사 1개' })).toBeVisible();
  await waitFor(() => expect(screen.getByRole('togglebutton')).not.toBeBusy());
});

it('편집 중인 목록이 삭제되면 이전 이름 입력과 관리 시트를 남기지 않는다', async () => {
  const source = createMockBookmarkSource({ delayMs: 0 }); if (!source.lists) throw new Error('Missing source');
  await source.lists.setList({ userId: 'reader-a', listId: 'editing', commandId: 1, content: { name: '수정할 목록', articleIds: [] } });
  let store: LibraryStore | undefined;
  const user = userEvent.setup(); await render(<TestLibrary source={source} onStore={(value) => { store = value; }} />);
  await user.press(await screen.findByRole('button', { name: '목록 관리, 수정할 목록' }));
  await user.press(screen.getByRole('button', { name: '이름 수정' }));
  await user.type(screen.getByLabelText('목록 이름 · 필수'), ' 초안');
  await act(async () => store?.userLists.deleteList('editing'));
  expect(screen.queryByLabelText('목록 이름 · 필수')).not.toBeOnTheScreen();
  expect(screen.queryByRole('button', { name: '목록 이름 수정 취소' })).not.toBeOnTheScreen();
  expect(screen.queryByRole('button', { name: '수정할 목록 열기, 저장한 기사 0개' })).not.toBeOnTheScreen();
});
