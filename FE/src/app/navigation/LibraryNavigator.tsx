import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LibraryScreen } from '../../features/bookmarks/LibraryScreen';
import { ReadingListScreen } from '../../features/bookmarks/ReadingListScreen';

type LibraryStackParamList = { LibraryHome: undefined; ReadingList: { listId: string } };
const Stack = createNativeStackNavigator<LibraryStackParamList>();

type LibraryNavigatorProps = {
  onOpenHighlight?: (articleId: string, highlightId: string) => void;
  onSelectArticle: (articleId: string, listId: string) => void; onBrowseArticles: () => void;
};

export function LibraryNavigator({ onSelectArticle, onBrowseArticles, onOpenHighlight }: LibraryNavigatorProps) {
  return <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LibraryHome">
      {({ navigation }) => <LibraryScreen onOpenHighlight={onOpenHighlight} onOpenList={(listId) => navigation.navigate('ReadingList', { listId })} />}
    </Stack.Screen>
    <Stack.Screen name="ReadingList" getId={({ params }) => params.listId}>
      {({ navigation, route }) => <ReadingListScreen listId={route.params.listId} onBack={() => navigation.popToTop()}
        onSelectArticle={(articleId) => onSelectArticle(articleId, route.params.listId)} onBrowseArticles={onBrowseArticles} />}
    </Stack.Screen>
  </Stack.Navigator>;
}
