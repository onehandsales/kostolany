import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LibraryScreen } from '../../features/bookmarks/LibraryScreen';
import { ReadingListScreen } from '../../features/bookmarks/ReadingListScreen';

type LibraryStackParamList = { LibraryHome: undefined; ReadingList: { listId: string } };
const Stack = createNativeStackNavigator<LibraryStackParamList>();

export function LibraryNavigator({ onSelectArticle, onBrowseArticles }: {
  onSelectArticle: (articleId: string, listId: string) => void; onBrowseArticles: () => void;
}) {
  return <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LibraryHome">
      {({ navigation }) => <LibraryScreen onOpenList={(listId) => navigation.navigate('ReadingList', { listId })} />}
    </Stack.Screen>
    <Stack.Screen name="ReadingList" getId={({ params }) => params.listId}>
      {({ navigation, route }) => <ReadingListScreen listId={route.params.listId} onBack={() => navigation.popToTop()}
        onSelectArticle={(articleId) => onSelectArticle(articleId, route.params.listId)} onBrowseArticles={onBrowseArticles} />}
    </Stack.Screen>
  </Stack.Navigator>;
}
