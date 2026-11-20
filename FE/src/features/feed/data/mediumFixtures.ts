import type { FeedArticle, FeedSort } from '../types';

import { mediumHistoryStories } from './mediumHistoryStories';
import { mediumTopicStories } from './mediumTopicStories';
import { mediumAuthorStories } from './mediumAuthorStories';
import { mediumLibraryArticles } from './mediumLibraryFixtures';
import { mediumRelatedStories } from './mediumRelatedStories';
import { recommendedStories, staffPicks } from './mediumExploreExtras';

// 잘린 제목과 미수록 읽기 시간·집계는 원문 전체를 추정해서 채우지 않는다.
export const mediumExploreArticles: FeedArticle[] = [
  {
    id: 'medium-apple',
    title: 'Did Apple abandon its own design heuristics & accessibility principles?',
    summary: '',
    sourceName: 'In UX Collective by Michal Langmajer',
    publishedLabel: 'Yesterday',
    readingMinutes: 0,
    thumbnail: null,
    reference: {
      avatar: require('../../../../assets/medium/ux.png'),
      applause: 0,
      responses: '—',
      memberOnly: false,
    },
  },
  {
    id: 'medium-swift',
    title: 'What’s new with SwiftUI 26',
    summary: '',
    sourceName: 'Thomas Ricouard',
    publishedLabel: 'Yesterday',
    readingMinutes: 0,
    thumbnail: null,
    reference: {
      avatar: require('../../../../assets/medium/thomas.png'),
      applause: 0,
      responses: '—',
      memberOnly: true,
    },
  },
  {
    id: 'medium-insiders',
    title: 'The Insiders',
    summary: '',
    sourceName: 'Scott Galloway',
    publishedLabel: '18 hours ago',
    readingMinutes: 0,
    thumbnail: null,
    reference: {
      avatar: require('../../../../assets/medium/scott.png'),
      verifiedAuthor: true,
      applause: 0,
      responses: '—',
      memberOnly: false,
    },
  },
  {
    id: 'medium-ai-writing',
    title: 'We Need To Stop Letting AI Tell Us What…',
    summary: '',
    sourceName: 'In Entrepreneurship Handbook by Joe Procopio',
    publishedLabel: '',
    readingMinutes: 0,
    thumbnail: null,
    reference: {
      avatar: require('../../../../assets/medium/eh.png'),
      applause: 0,
      responses: '—',
      memberOnly: false,
    },
  },
];

export const mediumFeaturedArticles: FeedArticle[] = [
  {
    id: 'medium-curious',
    title: 'I Don’t Want to Be Right. I Want to Be Curious',
    summary: 'Choosing connection over correctness.',
    sourceName: 'In Thought Thinkers by Brian Rosta',
    publishedLabel: 'Jun 6',
    readingMinutes: 0,
    thumbnail: null,
    reference: {
      image: require('../../../../assets/medium/curious.png'),
      avatar: require('../../../../assets/medium/thinkers.png'),
      applause: 311,
      responses: '5',
      memberOnly: true,
    },
  },
  {
    id: 'medium-forgiven',
    title: 'No, Trump Supporters Will Not Be Forgiven',
    summary: 'As America’s institutions disintegrate, the room for compr...',
    sourceName: 'In Thought Thinkers by Ben Ulansey',
    publishedLabel: 'Feb 21',
    readingMinutes: 0,
    thumbnail: null,
    reference: {
      image: require('../../../../assets/medium/forgiven.png'),
      avatar: require('../../../../assets/medium/thinkers.png'),
      applause: 4100,
      responses: '79',
      memberOnly: true,
    },
  },
];

// 원본 화면에서 확인한 카드만 전사하며 금융 예시의 식별자를 재사용하지 않는다.
export const mediumArticles: FeedArticle[] = [
  {
    id: 'medium-love',
    title: 'How to *really* know you’re in love',
    summary: 'Because most of “the signs” they tell you are garbage',
    sourceName: 'Kris Gage',
    publishedLabel: 'Aug 3, 2017',
    readingMinutes: 3,
    thumbnail: null,
    reference: {
      image: require('../../../../assets/medium/love.png'),
      avatar: require('../../../../assets/medium/kris.png'),
      applause: 157000,
      responses: '1.3K',
      memberOnly: true,
    },
  },
  {
    id: 'medium-evening',
    title: '10 Things To Do In The Evening Instead Of Watching Netflix',
    summary: 'Device-free habits to increase your productivity and happiness.',
    sourceName: 'In Better Advice by Aleid ter Weel',
    publishedLabel: 'Feb 15, 2022',
    readingMinutes: 0,
    thumbnail: null,
    reference: {
      image: require('../../../../assets/medium/evening.png'),
      avatar: require('../../../../assets/medium/advice.png'),
      applause: 30000,
      responses: '529',
      memberOnly: true,
    },
  },
  {
    id: 'medium-jeremiah',
    title: 'Story not included in the reference capture',
    summary: '',
    sourceName: 'Jeremiah Warren',
    publishedLabel: '',
    readingMinutes: 0,
    thumbnail: null,
    reference: {
      avatar: require('../../../../assets/medium/jeremiah.png'),
      applause: 0,
      responses: '—',
      memberOnly: false,
    },
  },
  {
    id: 'medium-brain',
    title: 'ChatGPT Is Poisoning Your Brain...',
    summary: 'Here’s How to Stop It Before It’s Too Late.',
    sourceName: 'Jordan Gibbs',
    publishedLabel: 'Apr 30',
    readingMinutes: 5,
    thumbnail: null,
    reference: {
      image: require('../../../../assets/medium/brain.png'),
      avatar: require('../../../../assets/medium/jordan.png'),
      applause: 18000,
      responses: '834',
      memberOnly: true,
    },
  },
  {
    id: 'medium-ide',
    title: 'This new IDE from Google is an absolute game changer',
    summary: 'This new IDE from Google is seriously revolutionary.',
    sourceName: 'In Coding Beauty by Tari Ibaba',
    publishedLabel: 'Mar 12',
    readingMinutes: 0,
    thumbnail: null,
    reference: {
      image: require('../../../../assets/medium/ide.png'),
      avatar: require('../../../../assets/medium/coding.png'),
      applause: 5900,
      responses: '349',
      memberOnly: true,
    },
  },
  {
    id: 'medium-trauma',
    title: 'How Mindfulness Heals Trauma:',
    summary: 'Reparenting Your Inner Child',
    sourceName: 'Mitch Y Artman',
    publishedLabel: 'Apr 21',
    readingMinutes: 0,
    thumbnail: null,
    reference: {
      image: require('../../../../assets/medium/trauma.png'),
      avatar: require('../../../../assets/medium/mitch.png'),
      applause: 1200,
      responses: '29',
      memberOnly: true,
      balancedHeadline: true,
    },
  },
  {
    id: 'medium-awareness',
    title: 'MINDFULNESS AND AWARENESS',
    summary: 'In the relentless whirl of modern life, where every moment tumble...',
    sourceName: 'Lalithaa',
    publishedLabel: 'May 1, 2024',
    readingMinutes: 0,
    thumbnail: null,
    reference: {
      image: require('../../../../assets/medium/awareness.png'),
      avatar: require('../../../../assets/medium/lalithaa.png'),
      applause: 3900,
      responses: '32',
      memberOnly: false,
      balancedHeadline: true,
    },
  },
  {
    id: 'medium-vinyl',
    title: 'Mindfulness and Playing an LP',
    summary: '4,000 words to describe the',
    sourceName: 'In The Ironkeel Collection by Shon Ellerton',
    publishedLabel: '',
    readingMinutes: 0,
    thumbnail: null,
    reference: {
      image: require('../../../../assets/medium/vinyl.png'),
      avatar: require('../../../../assets/medium/ironkeel.png'),
      applause: 0,
      responses: '—',
      memberOnly: false,
    },
  },
  ...mediumExploreArticles,
  ...mediumFeaturedArticles,
  ...staffPicks,
  ...recommendedStories,
  ...mediumLibraryArticles,
  ...mediumRelatedStories,
  ...mediumAuthorStories,
  ...mediumTopicStories,
  ...mediumHistoryStories,
];

// 키 이름은 기존 조회 계약을 유지하지만 실제 추천·팔로우 알고리즘은 없는 로컬 묶음이다.
export const mediumFeedFixtures: Record<FeedSort, FeedArticle[]> = {
  latest: mediumArticles.slice(0, 5),
  popular: [],
  recommended: mediumFeaturedArticles,
};

export function formatReactionCount(count: number): string {
  return count >= 1000 ? `${Number((count / 1000).toFixed(1))}K` : String(count);
}
