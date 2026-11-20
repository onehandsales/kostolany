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
import { createMockClapSource } from '../../features/reactions/data/createMockClapSource';
import { ClapProvider } from '../../features/reactions/ClapProvider';
import { ArticleRouteScreen } from './ArticleRouteScreen';

function LibraryProbe({ onStore }: { onStore: (store: LibraryStore) => void }) {
  const store = useBookmarkStore(); useEffect(() => onStore(store), [onStore, store]); return null;
}

it.each(['Library', 'Profile'] as const)('%s 기사의 원래 목록 삭제 시 목록 ID 대신 기존 상위 경로로 복귀한다', async (origin) => {
  const source = createMockBookmarkSource({ delayMs: 0 }); if (!source.lists) throw new Error('Missing lists');
  await source.lists.setList({ userId: mockUserA.id, listId: 'deleted', commandId: 1,
    content: { name: '삭제될 목록', articleIds: ['example-latest-rates'] } });
  let library: LibraryStore | undefined; const onBack = jest.fn(); const user = userEvent.setup();
  await render(<SafeAreaProvider><AuthProvider initialUser={mockUserA}>
    <ClapProvider userId="example-reader" source={createMockClapSource({ delayMs: 0 })}><BookmarkProvider source={source}>
      <LibraryProbe onStore={(store) => { library = store; }} />
      <ArticleRouteScreen params={{ articleId: 'example-latest-rates', origin, listId: 'deleted',
        ownerUserId: mockUserA.id, sessionRevision: 0 }} source={createMockArticleSource({ delayMs: 0 })} onBack={onBack} />
    </BookmarkProvider></ClapProvider>
  </AuthProvider></SafeAreaProvider>);
  expect(await screen.findByRole('button', { name: '저장 목록으로 돌아가기' })).toBeVisible();
  await act(async () => { library?.userLists.deleteList('deleted'); });
  expect(screen.queryByRole('button', { name: '저장 목록으로 돌아가기' })).not.toBeOnTheScreen();
  await user.press(screen.getByRole('button', { name: origin === 'Profile' ? '프로필로 돌아가기' : '라이브러리로 돌아가기' }));
  expect(onBack).toHaveBeenCalledTimes(1);
});
