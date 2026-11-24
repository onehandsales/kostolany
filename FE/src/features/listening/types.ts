import type { ImageSourcePropType } from 'react-native';
import { defaultListeningOptions, type ListeningOptions } from './listeningOptions';

export type ListeningStory = {
  articleId: string;
  title: string;
  authorId?: string;
  authorName: string;
  cover?: ImageSourcePropType;
};
export type ListeningRecording = { articleId: string; durationSeconds: number; mode: 'silent-mock' };
export type ListeningSource = (story: ListeningStory, signal: AbortSignal) => Promise<ListeningRecording>;
export type ListeningSnapshot = (
  | { status: 'idle'; story: null; expanded: false; positionSeconds: 0; durationSeconds: 0 }
  | {
      status: 'loading' | 'error';
      story: ListeningStory;
      expanded: boolean;
      positionSeconds: 0;
      durationSeconds: 0;
    }
  | {
      status: 'playing' | 'paused' | 'ended';
      story: ListeningStory;
      expanded: boolean;
      positionSeconds: number;
      durationSeconds: number;
    }
) & { options: ListeningOptions; optionsStatus: 'idle' | 'saving' | 'error' };

export const idleListening: ListeningSnapshot = {
  options: defaultListeningOptions,
  optionsStatus: 'idle',
  status: 'idle',
  story: null,
  expanded: false,
  positionSeconds: 0,
  durationSeconds: 0,
};
export function formatListeningTime(seconds: number): string {
  const whole = Math.max(0, Math.floor(seconds));
  return `${Math.floor(whole / 60)
    .toString()
    .padStart(2, '0')}:${(whole % 60).toString().padStart(2, '0')}`;
}

// 남은 시간은 무음 mock의 환산값이며 원본 음원의 계산식을 확정하지 않는다.
export function formatListeningRemaining(
  positionSeconds: number,
  durationSeconds: number,
  speed: number,
): string {
  return `-${formatListeningTime(Math.max(0, durationSeconds - Math.floor(positionSeconds)) / speed)}`;
}
