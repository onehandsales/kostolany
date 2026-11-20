import type { PublicList } from '../types';

// 원본에서 확인된 앞 세 편과 끝 두 편만 연결하고 미수록 세 편의 순서는 만들지 않는다.
export const publicListFixtures: readonly PublicList[] = [
  {
    id: 'public-morning-routine', owner: { kind: 'writer', id: 'medium-staff' },
    title: 'The power of a morning routine',
    description: 'Advice, tips, and tools for starting your day right.',
    publishedLabel: 'Jul 7, 2023', capturedStoryCount: 8,
    articleIds: ['medium-working-morning', 'medium-daily-notes', 'medium-productivity-obsession',
      'medium-morning-routine', 'medium-oprah-morning'],
    baselineSaves: 108, baselineClaps: 98,
  },
  {
    id: 'public-aaa-ai', owner: { kind: 'writer', id: 'jordan' }, title: 'AAA AI',
    description: '', publishedLabel: '', capturedStoryCount: 2, articleIds: [],
    baselineSaves: 0, baselineClaps: 0,
  },
];
