import type { FeedArticle } from '../types';

// F16/07의 관련 기사 카드만 전사하며 미수록 본문과 날짜는 추정하지 않는다.
export const mediumRelatedStories: FeedArticle[] = [
  {
    id: 'medium-prompt-bible', title: 'Behold...The Prompt Bible is Here',
    summary: 'The Most Useful Tips from Google’s Epic 70-Page AI Prompt Engineering Guide',
    sourceName: 'Jordan Gibbs', publishedLabel: 'May 24', readingMinutes: 0, thumbnail: null,
    reference: { image: require('../../../../assets/medium/prompt-bible.png'),
      avatar: require('../../../../assets/medium/jordan.png'), applause: 670, responses: '18', memberOnly: true },
  },
  {
    id: 'medium-gemini', title: 'ChatGPT Users...Should You Make the Switch to Gemini?',
    summary: '', sourceName: 'Jordan Gibbs', publishedLabel: '', readingMinutes: 0, thumbnail: null,
    reference: { image: require('../../../../assets/medium/gemini.png'),
      avatar: require('../../../../assets/medium/jordan.png'), applause: 0, responses: '—', memberOnly: false },
  },
];
