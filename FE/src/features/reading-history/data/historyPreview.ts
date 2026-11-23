import { Platform } from 'react-native';
import type { ReadingVisit } from '../types';

// 장애 재현 뒤에는 기본 시나리오로 복원한다.
export const historyPreviewScenario: 'normal' | 'read-error' | 'write-error' | 'remove-error' | 'slow' =
  'normal';

// 비교용 방문 시각은 원본 관찰이 아니며 개발 웹의 명시적 요청에서만 초기값으로 쓴다.
export function historyComparisonSeed(search: string, enabled: boolean): Readonly<Record<string, readonly ReadingVisit[]>> {
  if (!enabled || new URLSearchParams(search).get('parityHistory') !== 'reference-v1') return {};
  return { 'example-reader': ['medium-unsexy-habits', 'medium-titans', 'medium-personality'].map((articleId, index) => ({
    articleId, visitedAt: `2025-06-13T11:0${3 - index}:00.000Z`,
  })) };
}
export const historyPreviewVisits = historyComparisonSeed(
  typeof window === 'undefined' ? '' : window.location?.search ?? '', __DEV__ && Platform.OS === 'web',
);
