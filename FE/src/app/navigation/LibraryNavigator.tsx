import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
      {({ navigation }) => <LibraryScreen digestSource={digestSource} onOpenDigestArticle={onOpenDigestArticle} onOpenHighlight={onOpenHighlight} onOpenList={(listId, reorder) => navigation.navigate('ReadingList', { listId, reorder })} />}
    </Stack.Screen>
    <Stack.Screen name="ReadingList" getId={({ params }) => params.listId}>
      {({ navigation, route }) => <ReadingListScreen initialReorder={route.params.reorder} listId={route.params.listId} onBack={() => navigation.popToTop()}
        onSelectArticle={(articleId) => onSelectArticle(articleId, route.params.listId)} onBrowseArticles={onBrowseArticles} />}
    </Stack.Screen>
  </Stack.Navigator>;
}
