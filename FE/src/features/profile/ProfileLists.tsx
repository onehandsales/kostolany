import type { ReactNode } from 'react';
import { FlatList, View, type StyleProp, type ViewStyle } from 'react-native';

import { LibraryListCard } from '../bookmarks/LibraryListCard';
import { DEFAULT_LIST_ID } from '../bookmarks/listTypes';
import { ReadingListFeedback } from '../bookmarks/ReadingListFeedback';
import { useBookmarkStore, useReadingList, useUserLists } from '../bookmarks/useBookmarks';
import { UserListFeedback } from '../bookmarks/UserListFeedback';

type ProfileListsProps = {
  onOpenList: (listId: string) => void;
  header: ReactNode;
  footer: ReactNode;
  contentContainerStyle: StyleProp<ViewStyle>;
};

export function ProfileLists({ onOpenList, header, footer, contentContainerStyle }: ProfileListsProps) {
  const { state, retryReadingList, retryBookmark } = useReadingList();
  const lists = useUserLists();
  const store = useBookmarkStore();
  return (
    <FlatList
      accessibilityLabel="프로필 저장 목록"
      data={lists.entries.filter((entry) => entry.listId !== DEFAULT_LIST_ID && entry.content !== null)}
      keyExtractor={(entry) => entry.listId}
      contentContainerStyle={contentContainerStyle}
      ListHeaderComponent={
        <View>
          {header}
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
        </View>
      }
      ListFooterComponent={<>{footer}</>}
      renderItem={({ item: entry }) =>
        entry.content ? (
          <LibraryListCard
            listId={entry.listId}
            name={entry.content.name}
            isPrivate={entry.content.isPrivate}
            onOpen={onOpenList}
            articles={entry.content.articleIds.flatMap(id => store.articles.find(article => article.id === id) ?? [])}
          />
        ) : null
      }
    />
  );
}
