import type { FeedArticle } from '../types';

// F17 Stories의 두 번째 고정 카드에서 보이는 부분만 전사한다.
export const mediumAuthorStories: FeedArticle[] = [
  {
    id: 'medium-important-prompt',
    title: 'The Most Important ChatGPT Prompt',
    summary: 'I’ve read dozens of articles about “the best ChatGPT prompts,” bu...',
    sourceName: 'Jordan Gibbs',
    publishedLabel: 'Dec 19, 2023',
    readingMinutes: 0,
    thumbnail: null,
    reference: {
      image: require('../../../../assets/medium/important-prompt.png'),
      avatar: require('../../../../assets/medium/jordan.png'),
      applause: 4400,
      responses: '59',
      memberOnly: true,
    },
  },
];
