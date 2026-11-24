import { Platform } from 'react-native';
import type { ResponseTarget } from '../types';
import type { ResponseScenario } from './createMockResponseSource';
import { responseFixtures } from './responseFixtures';

export const responsePreviewScenario: ResponseScenario = 'normal';

// 원본의 정확한 정수 집계만 개발 웹의 명시적 비교 요청에 공급하며 반올림 수치는 역산하지 않는다.
export function createResponseComparisonCounts(search: string, enabled: boolean): (target: ResponseTarget) => number {
  const mode = enabled ? new URLSearchParams(search).get('parityResponses') : null;
  const counts = new Map<string, number>(mode === 'reference-v1'
    ? [['medium-brain', 834], ['medium-rules', 272], ['medium-goodbye-notion', 17],
      ['medium-unsexy-habits', 7], ['medium-titans', 11], ['medium-personality', 471]]
    : mode === 'story-832' ? [['medium-brain', 832]] : []);
  // 이미 수록된 루트 응답은 제외하고 서로 다른 촬영 시점의 총수를 별도 비교 조건으로 둔다.
  return target => {
    const total = target.kind === 'article' ? counts.get(target.id)
      : mode === 'reference-v1' && target.id === 'public-morning-routine' ? 1 : undefined;
    if (total === undefined) return 0;
    const captured = responseFixtures(target).filter(response => response.parentId === null && !response.deleted).length;
    return Math.max(0, total - captured);
  };
}

export const responsePreviewUncapturedCount = createResponseComparisonCounts(
  typeof window === 'undefined' ? '' : window.location?.search ?? '', __DEV__ && Platform.OS === 'web',
);
