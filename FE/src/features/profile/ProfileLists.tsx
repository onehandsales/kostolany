import { View } from 'react-native';

import { LibraryListCard } from '../bookmarks/LibraryListCard';
import { DEFAULT_LIST_ID } from '../bookmarks/listTypes';
import { ReadingListFeedback } from '../bookmarks/ReadingListFeedback';
import { useBookmarkStore, useReadingList, useUserLists } from '../bookmarks/useBookmarks';
import { UserListFeedback } from '../bookmarks/UserListFeedback';

type ProfileListsProps = { onOpenList: (listId: string) => void };

export function ProfileLists({ onOpenList }: ProfileListsProps) {
  const { state, retryReadingList, retryBookmark } = useReadingList();
  const lists = useUserLists();
  const store = useBookmarkStore();
  return (
    <View>
      <ReadingListFeedback state={state} onRetry={retryReadingList} onRetryBookmark={retryBookmark} />
      <UserListFeedback />
      {state.status === 'ready' && (
        <LibraryListCard
          listId={DEFAULT_LIST_ID}
          name="읽기 목록"
          articles={state.articles}
          onOpen={onOpenList}
        />
      )}
      {lists.entries.map(
        (entry) =>
          entry.content && (
            <LibraryListCard
              key={entry.listId}
              listId={entry.listId}
              name={entry.content.name}
              isPrivate={entry.content.isPrivate}
              onOpen={onOpenList}
              articles={store.articles.filter((article) => entry.content?.articleIds.includes(article.id))}
            />
          ),
      )}
    </View>
  );
}
