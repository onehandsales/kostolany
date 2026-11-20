import { useArticleModeration } from '../moderation/articleModeration';

import { useRecommendations } from './RecommendationProvider';

// 추천 입력은 검색·저장·원문 접근과 분리하고 선택한 기사만 추천 결과에서 제외한다.
export function useRecommendedArticles() {
  const moderation = useArticleModeration();
  const preferences = useRecommendations();
  return { ...moderation, excluded: (id: string) => moderation.excluded(id) || preferences.hidden(id) };
}
