import { useIsFocused } from '@react-navigation/native';
import type { ComponentProps } from 'react';

import { WrittenStoryScreen } from '../../features/editor/WrittenStoryScreen';
import { ArticlePresentation } from './ArticlePresentation';

// 프로필과 발행 직후 경로도 일반 기사와 같은 읽기 테마와 화면 수명을 사용한다.
export function WrittenStoryRoute(props: Omit<ComponentProps<typeof WrittenStoryScreen>, 'active'>) {
  const active = useIsFocused();
  return <ArticlePresentation><WrittenStoryScreen {...props} active={active} /></ArticlePresentation>;
}
