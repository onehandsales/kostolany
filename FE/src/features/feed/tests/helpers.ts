import type { FeedArticle } from '../types';

export function article(id: string): FeedArticle {
  return {
    id, title: `예시 기사 ${id}`, summary: '긴 한국어 설명을 가진 테스트용 콘텐츠입니다.',
    sourceName: '예시 출처', publishedLabel: '2026.11.17', readingMinutes: 3, thumbnail: null,
  };
}

export function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}
