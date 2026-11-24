import { useIsFocused } from '@react-navigation/native';
import type { ComponentProps } from 'react';
import { ReadingListScreen } from '../../features/bookmarks/ReadingListScreen';

// Library와 Profile의 같은 목록에 화면 포커스를 전달해 편집 초안 수명을 맞춘다.
export function ReadingListRoute(props: ComponentProps<typeof ReadingListScreen>) {
  const active = useIsFocused();
  return <ReadingListScreen {...props} active={active} />;
}
