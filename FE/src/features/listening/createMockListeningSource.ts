import type { ListeningSource } from './types';

// 280초는 보관 화면 비교용 길이이며 글자 수나 읽기 시간으로 실제 음원을 계산하지 않는다.
export function createMockListeningSource({
  delayMs = 500,
  failures = 0,
  durationSeconds = 280,
} = {}): ListeningSource {
  let remainingFailures = failures;
  return (story, signal) =>
    new Promise((resolve, reject) => {
      if (signal.aborted) {
        reject(new Error('Listening cancelled'));
        return;
      }
      const cancel = () => {
        clearTimeout(timer);
        reject(new Error('Listening cancelled'));
      };
      const timer = setTimeout(() => {
        signal.removeEventListener('abort', cancel);
        if (signal.aborted) {
          reject(new Error('Listening cancelled'));
          return;
        }
        if (remainingFailures > 0) {
          remainingFailures--;
          reject(new Error('Listening unavailable'));
          return;
        }
        resolve({ articleId: story.articleId, durationSeconds, mode: 'silent-mock' });
      }, delayMs);
      signal.addEventListener('abort', cancel, { once: true });
    });
}
