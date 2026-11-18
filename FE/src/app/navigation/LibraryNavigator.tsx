import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LibraryScreen } from '../../features/bookmarks/LibraryScreen';
import { ReadingListScreen } from '../../features/bookmarks/ReadingListScreen';

type LibraryStackParamList = { LibraryHome: undefined; ReadingList: undefined };
const Stack = createNativeStackNavigator<LibraryStackParamList>();

export function LibraryNavigator({ onSelectArticle, onBrowseArticles }: {
  onSelectArticle: (articleId: string) => void; onBrowseArticles: () => void;
}) {
  return <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LibraryHome">
      {({ navigation }) => <LibraryScreen onOpenReadingList={() => navigation.navigate('ReadingList')} />}
    </Stack.Screen>
    <Stack.Screen name="ReadingList">
      {({ navigation }) => <ReadingListScreen onBack={() => navigation.goBack()}
        onSelectArticle={onSelectArticle} onBrowseArticles={onBrowseArticles} />}
    </Stack.Screen>
  </Stack.Navigator>;
}
