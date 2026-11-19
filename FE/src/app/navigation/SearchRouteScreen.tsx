import { useIsFocused } from '@react-navigation/native';

import { SearchScreen } from '../../features/search/SearchScreen';
import type { SearchSource } from '../../features/search/types';

type SearchRouteScreenProps = {
  source?: SearchSource;
  onSelectArticle: (articleId: string) => void;
};

export function SearchRouteScreen(props: SearchRouteScreenProps) {
  const isFocused = useIsFocused();
  return <SearchScreen {...props} isFocused={isFocused} />;
}
