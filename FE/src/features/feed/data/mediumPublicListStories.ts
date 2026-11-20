import type { FeedArticle } from '../types';

// 공개 목록 원본에서 읽을 수 있는 제목과 메타데이터만 전사하며 본문은 만들지 않는다.
export const mediumPublicListStories: FeedArticle[] = [
  {
    id: 'medium-working-morning', title: 'Nobody Wants a 20-Step 5 AM Morning Routine. They Want One That Works.',
    summary: '', sourceName: 'In Curious by Eve Arnold', publishedLabel: 'Jan 1, 2023',
    readingMinutes: 4, thumbnail: null,
    reference: { image: require('../../../../assets/medium/working-morning.png'),
      avatar: require('../../../../assets/medium/public-list-curious.png'), applause: 0, responses: '—', memberOnly: true },
  },
  {
    id: 'medium-daily-notes', title: 'From Chaos to Clarity: How Daily Notes Help You Stay Focused',
    summary: '', sourceName: 'Denis Volkov', publishedLabel: 'Mar 4, 2023', readingMinutes: 6, thumbnail: null,
    reference: { image: require('../../../../assets/medium/daily-notes.png'),
      avatar: require('../../../../assets/medium/denis-volkov.png'), applause: 0, responses: '—', memberOnly: false },
  },
  {
    id: 'medium-oprah-morning', title: 'I followed Oprah’s morning routine for a week, and it was zen but difficult',
    summary: '', sourceName: 'In Insider by Insider', publishedLabel: 'Mar 10, 2021', readingMinutes: 8, thumbnail: null,
    reference: { image: require('../../../../assets/medium/oprah-morning.png'),
      avatar: require('../../../../assets/medium/insider.png'), applause: 0, responses: '—', memberOnly: false },
  },
];
