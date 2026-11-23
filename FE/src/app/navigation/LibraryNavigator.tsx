import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useIsFocused } from '@react-navigation/native';
import type { ComponentProps } from 'react';

import { LibraryScreen } from '../../features/bookmarks/LibraryScreen';
import { ReadingListScreen } from '../../features/bookmarks/ReadingListScreen';
import type { DigestSource } from '../../features/digest/types';

type LibraryStackParamList = { LibraryHome: undefined; ReadingList: { listId: string; reorder?: boolean } };
const Stack = createNativeStackNavigator<LibraryStackParamList>();

type LibraryNavigatorProps = {
  digestSource?: DigestSource;
  onOpenDigestArticle?: (articleId: string) => void;
  onOpenHighlight?: (articleId: string, highlightId: string) => void;
  onSelectArticle: (articleId: string, listId: string) => void; onBrowseArticles: () => void;
};

export function LibraryNavigator({ onSelectArticle, onBrowseArticles, onOpenHighlight, digestSource, onOpenDigestArticle }: LibraryNavigatorProps) {
  return <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LibraryHome">
      {({ navigation }) => <LibraryRouteScreen digestSource={digestSource} onOpenDigestArticle={onOpenDigestArticle} onOpenHighlight={onOpenHighlight} onOpenList={(listId, reorder) => navigation.navigate('ReadingList', { listId, reorder })} />}
    </Stack.Screen>
    <Stack.Screen name="ReadingList" getId={({ params }) => params.listId}>
      {({ navigation, route }) => <ReadingListScreen initialReorder={route.params.reorder} listId={route.params.listId} onBack={() => navigation.popToTop()}
        onSelectArticle={(articleId) => onSelectArticle(articleId, route.params.listId)} onBrowseArticles={onBrowseArticles} />}
    </Stack.Screen>
  </Stack.Navigator>;
}

// 중첩 stack과 하단 탭의 포커스를 Digest 조회·초안 수명에 전달한다.
function LibraryRouteScreen(props: ComponentProps<typeof LibraryScreen>) {
  const active = useIsFocused();
  return <LibraryScreen {...props} active={active} />;
}
