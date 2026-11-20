import type { FeedArticle } from '../types';

// 이력 캡처의 제목과 메타데이터만 보관하고 방문 일시와 전체 본문은 추정하지 않는다.
export const mediumHistoryStories: FeedArticle[] = [
  {
    id: 'medium-unsexy-habits',
    title: 'The 7 Unsexy Habits That Make You Instantly More Attractive',
    summary: 'Unexpected, valuable and actionable',
    sourceName: 'In Write A Catalyst by Akinyele Olaoluwa',
    publishedLabel: 'May 2',
    readingMinutes: 0,
    thumbnail: null,
    reference: {
      image: require('../../../../assets/medium/history-unsexy.png'),
      avatar: require('../../../../assets/medium/write-catalyst.png'),
      applause: 220,
      responses: '7',
      memberOnly: true,
    },
  },
  {
    id: 'medium-titans',
    title: 'A Battle Of Titans',
    summary: 'How to make science learning more effective through storytelli…',
    sourceName: 'In STEM Parenting by Fedeminozzi',
    publishedLabel: 'May 19',
    readingMinutes: 0,
    thumbnail: null,
    reference: {
      image: require('../../../../assets/medium/history-titans.png'),
      avatar: require('../../../../assets/medium/stem-parenting.png'),
      applause: 404,
      responses: '11',
      memberOnly: true,
    },
  },
  {
    id: 'medium-personality',
    title: 'How to Read Someone’s Personality in 10 Seconds (Backed by Psychology)',
    summary: 'The Subtle Signs That Reveal Who Someone Really Is.',
    sourceName: 'In ThinkDraft by Singh Bhai',
    publishedLabel: 'Jan 27',
    readingMinutes: 0,
    thumbnail: null,
    reference: {
      image: require('../../../../assets/medium/history-personality.png'),
      avatar: require('../../../../assets/medium/think-draft.png'),
      applause: 17600,
      responses: '471',
      memberOnly: true,
    },
  },
];
