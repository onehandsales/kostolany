import { Platform } from 'react-native';
import type { ResponseTarget } from '../types';
import type { ResponseScenario } from './createMockResponseSource';

export const responsePreviewScenario: ResponseScenario = 'normal';

// 원본의 정확한 정수 집계만 개발 웹의 명시적 비교 요청에 공급하며 반올림 수치는 역산하지 않는다.
export function createResponseComparisonCounts(search: string, enabled: boolean): (target: ResponseTarget) => number {
  const counts = new Map<string, number>(enabled &&
    new URLSearchParams(search).get('parityResponses') === 'reference-v1'
    ? [['medium-rules', 272], ['medium-goodbye-notion', 17],
      ['medium-unsexy-habits', 7], ['medium-titans', 11], ['medium-personality', 471]]
    : []);
  return target => target.kind === 'article' ? counts.get(target.id) ?? 0 : 0;
}

export const responsePreviewUncapturedCount = createResponseComparisonCounts(
  typeof window === 'undefined' ? '' : window.location?.search ?? '', __DEV__ && Platform.OS === 'web',
);
