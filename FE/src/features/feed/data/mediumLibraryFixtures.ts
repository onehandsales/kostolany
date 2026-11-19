import type { FeedArticle } from '../types';

// 목록 상세에 보이는 제목·작성자·사진만 보존하며 미수록 본문과 반응 집계는 추정하지 않는다.
export const mediumLibraryArticles: FeedArticle[] = [
  {
    id: 'medium-chimichurri',
    title: 'The Chimichurri Made Me Do It',
    summary: '',
    sourceName: 'In the Challenged by Paul Gardner',
    publishedLabel: 'Apr 17, 2025',
    readingMinutes: 2,
    thumbnail: null,
    reference: {
      image: require('../../../../assets/medium/chimichurri.png'),
      avatar: require('../../../../assets/medium/challenged.png'),
      applause: 0,
      responses: '—',
      memberOnly: false,
    },
  },
  {
    id: 'medium-mind-fullness',
    title: 'Mind-Fullness',
    summary: '',
    sourceName: 'Mind-Fullness',
    publishedLabel: 'Mar 3, 2018',
    readingMinutes: 2,
    thumbnail: null,
    reference: {
      image: require('../../../../assets/medium/mind-flower.png'),
      avatar: require('../../../../assets/medium/mind-logo.png'),
      applause: 0,
      responses: '—',
      memberOnly: false,
    },
  },
  {
    id: 'medium-horse',
    title: 'How Useful is Mind Fullness on an Empty Stomach?',
    summary: '',
    sourceName: 'Caroline de Braganza',
    publishedLabel: 'Nov 21, 2019',
    readingMinutes: 3,
    thumbnail: null,
    reference: {
      image: require('../../../../assets/medium/horse.png'),
      avatar: require('../../../../assets/medium/caroline.png'),
      applause: 0,
      responses: '—',
      memberOnly: true,
    },
  },
  {
    id: 'medium-emptiness',
    title: 'Mind Fullness or Emptiness?',
    summary: '',
    sourceName: 'In Know Thyself, Heal Thyself by Tomas Byrne',
    publishedLabel: 'Oct 23, 2021',
    readingMinutes: 8,
    thumbnail: null,
    reference: {
      image: require('../../../../assets/medium/sunset.png'),
      avatar: require('../../../../assets/medium/know-thyself.png'),
      applause: 0,
      responses: '—',
      memberOnly: false,
    },
  },
];
