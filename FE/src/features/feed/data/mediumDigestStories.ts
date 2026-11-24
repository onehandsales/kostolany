import type { FeedArticle } from '../types';

// S116에서 확인한 카드와 사진 영역만 사용하며 미수록 날짜·본문은 생성하지 않는다.
export const mediumDigestStories: FeedArticle[] = [
  {
    id: 'medium-goodbye-notion',
    title: 'Goodbye Notion',
    summary: 'I used Notion for everything... until I couldn’t find anything anymore.',
    sourceName: 'xeladu',
    publishedLabel: '',
    readingMinutes: 2,
    thumbnail: null,
    reference: {
      image: require('../../../../assets/medium/goodbye-notion.png'),
      avatar: require('../../../../assets/medium/xeladu.png'),
      applause: 170, responses: '17', memberOnly: true,
    },
  },
  {
    id: 'medium-digest-alex',
    title: 'Story not included in the reference capture',
    summary: '',
    sourceName: 'Alex Mathers',
    publishedLabel: '',
    readingMinutes: 0,
    thumbnail: null,
    reference: {
      avatar: require('../../../../assets/medium/alex-mathers.png'),
      verifiedAuthor: true,
      applause: 0,
      responses: '—',
    },
  },
];
