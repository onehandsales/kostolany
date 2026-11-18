import { act, render, screen, userEvent } from '@testing-library/react-native';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import { AuthProvider } from '../../features/auth/AuthProvider';
import { mockUserA } from '../../features/auth/data/mockUsers';
import { BookmarkProvider } from '../../features/bookmarks/BookmarkProvider';
import type { LibraryStore } from '../../features/bookmarks/createLibraryStore';
import { createMockBookmarkSource } from '../../features/bookmarks/data/createMockBookmarkSource';
import { useBookmarkStore } from '../../features/bookmarks/useBookmarks';
import { createMockLikeSource } from '../../features/likes/data/createMockLikeSource';
import { LikeProvider } from '../../features/likes/LikeProvider';
import { ArticleRouteScreen } from './ArticleRouteScreen';

function LibraryProbe({ onStore }: { onStore: (store: LibraryStore) => void }) {
  const store = useBookmarkStore(); useEffect(() => onStore(store), [onStore, store]); return null;
}

it('기사 열람 중 원래 목록이 삭제되면 목록 ID로 이동하지 않고 기존 라이브러리 경로로 돌아간다', async () => {
  const source = createMockBookmarkSource({ delayMs: 0 }); if (!source.lists) throw new Error('Missing lists');
  await source.lists.setList({ userId: mockUserA.id, listId: 'deleted', commandId: 1,
    content: { name: '삭제될 목록', articleIds: ['example-latest-rates'] } });
  let library: LibraryStore | undefined; const onBack = jest.fn(); const user = userEvent.setup();
  await render(<SafeAreaProvider><AuthProvider initialUser={mockUserA}>
    <LikeProvider source={createMockLikeSource({ delayMs: 0 })}><BookmarkProvider source={source}>
      <LibraryProbe onStore={(store) => { library = store; }} />
      <ArticleRouteScreen params={{ articleId: 'example-latest-rates', origin: 'Library', listId: 'deleted',
        ownerUserId: mockUserA.id, sessionRevision: 0 }} source={createMockArticleSource({ delayMs: 0 })} onBack={onBack} />
    </BookmarkProvider></LikeProvider>
  </AuthProvider></SafeAreaProvider>);
  expect(await screen.findByRole('button', { name: '저장 목록으로 돌아가기' })).toBeVisible();
  await act(async () => { library?.userLists.deleteList('deleted'); });
  expect(screen.queryByRole('button', { name: '저장 목록으로 돌아가기' })).not.toBeOnTheScreen();
  await user.press(screen.getByRole('button', { name: '라이브러리로 돌아가기' }));
  expect(onBack).toHaveBeenCalledTimes(1);
});
