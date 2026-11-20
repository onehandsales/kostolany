import type { ImageSourcePropType } from 'react-native';

export type ListeningStory = {
  articleId: string;
  title: string;
  authorId?: string;
  authorName: string;
  cover?: ImageSourcePropType;
};
export type ListeningRecording = { articleId: string; durationSeconds: number; mode: 'silent-mock' };
export type ListeningSource = (story: ListeningStory, signal: AbortSignal) => Promise<ListeningRecording>;
export type ListeningSnapshot =
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
    };

export const idleListening: ListeningSnapshot = {
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
