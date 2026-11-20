import type { ReaderResponse, ResponseTarget } from '../types';

type FixtureResponse = Pick<
  ReaderResponse,
  'id' | 'authorId' | 'authorName' | 'body' | 'createdAt' | 'relevance' | 'baselineClaps'
> &
  Partial<Pick<ReaderResponse, 'parentId' | 'dateLabel' | 'updatedAt'>>;
const brainResponses: readonly FixtureResponse[] = [
  {
    id: 'brain-bernie',
    authorId: 'author-bernie',
    authorName: 'Bérnie',
    createdAt: '2025-04-29T12:00:00Z',
    dateLabel: 'Apr 29, 2025',
    relevance: 100,
    baselineClaps: 1000,
    body: "Yes, Claude is like this too. Open AI already said today (on X) that they've tweaked the AI a little and it should be improving this week. The AI should be more like a professor/counsellor/business partner working with you not as a friend who will agree with everything you do.",
  },
  {
    id: 'brain-radu',
    parentId: 'brain-bernie',
    authorId: 'author-radu',
    authorName: 'Radu Davidescu',
    createdAt: '2025-05-25T12:00:00Z',
    dateLabel: '2 weeks ago',
    relevance: 80,
    baselineClaps: 157,
    body: "friends should not agree with everything you do. these are not friends. friends should accept you for what you are and support you, but that doesn't m…",
  },
  {
    id: 'brain-frbarrosl',
    parentId: 'brain-radu',
    authorId: 'author-frbarrosl',
    authorName: 'Frbarrosl',
    createdAt: '2025-05-25T13:00:00Z',
    dateLabel: '2 weeks ago',
    relevance: 40,
    baselineClaps: 4,
    body: "There's a book on this called \"The mom's test\". It describe how to ask for honest feedback in a way that even your Mom won't mock a nice-kind answer to you. Mostly focused on customers feedback.",
  },
  {
    id: 'brain-sunil',
    authorId: 'author-sunil',
    authorName: 'Sunil Bajpai',
    createdAt: '2025-04-30T12:00:00Z',
    dateLabel: 'Apr 30, 2025',
    relevance: 90,
    baselineClaps: 844,
    body: 'Spot on! Consultants do the same because they need to get hired by you :-)',
  },
  {
    id: 'brain-alfred',
    authorId: 'author-alfred',
    authorName: 'Alfred Akech',
    createdAt: '2025-05-02T12:00:00Z',
    updatedAt: '2025-05-02T13:00:00Z',
    dateLabel: 'May 2, 2025',
    relevance: 85,
    baselineClaps: 733,
    body: 'Great read! I could not agree more. I just wrote about this, but you beat me to it 👏.\nThe way AI functions today must change. Who knows…',
  },
  {
    id: 'brain-elena',
    parentId: 'brain-alfred',
    authorId: 'author-elena',
    authorName: 'Elena Byron she/her',
    createdAt: '2025-05-25T12:00:00Z',
    dateLabel: '2 weeks ago',
    relevance: 50,
    baselineClaps: 22,
    body: 'Thank you, Alfred. I agree, the echo chamber effect is incredibly potent, especially when AI interactions start to mirror our inner distortions instead of chall…',
  },
  {
    id: 'brain-gabriela',
    authorId: 'author-gabriela',
    authorName: 'Gabriela Bartek',
    createdAt: '2025-05-18T12:00:00Z',
    dateLabel: '3 weeks ago',
    relevance: 70,
    baselineClaps: 0,
    body: 'AI didn’t wash my brain. It helped me start using it.\n\nI’m not a tech expert…',
  },
  {
    id: 'brain-navj',
    authorId: 'author-navj',
    authorName: 'Navj',
    createdAt: '2025-06-08T11:00:00Z',
    dateLabel: '1 hour ago',
    relevance: 10,
    baselineClaps: 0,
    body: 'If you’re conversing with an LLM “ai”, you really should see a doctor and or psychiatrist.\n99% of people don’t really have this issue or worry.',
  },
  {
    id: 'brain-gwyneth',
    authorId: 'author-gwyneth',
    authorName: 'Gwyneth Llewelyn',
    createdAt: '2025-06-08T08:00:00Z',
    dateLabel: '4 hours ago',
    relevance: 9,
    baselineClaps: 0,
    body: "That's the reason so many highly talented, highly educated, highly trained individuals, who know perfectly well how AIs work, nevertheless are prone to…",
  },
  {
    id: 'brain-melanie',
    authorId: 'author-melanie',
    authorName: 'Melaniegiel',
    createdAt: '2025-06-08T05:00:00Z',
    dateLabel: '7 hours ago',
    relevance: 8,
    baselineClaps: 0,
    body: 'I wouldn’t consider this a "poisoning" but rather motivation, even if it’s not very realistic in most cases. Thinking the outcome and confidence many ppl develop in such a "bubble" I find it very legit and…',
  },
];
export function responseFixtures(target: ResponseTarget): readonly ReaderResponse[] {
  if (target.kind === 'article' && target.id === 'example-latest-rates')
    return [
      {
        id: 'mock-owner-response',
        authorId: 'example-reader-b',
        authorName: '예시 독자 B',
        parentId: null,
        body: '금리가 생활에 미치는 영향을 설명해 주셔서 감사합니다. 이 댓글은 응답 관리 검증용 예시예요.',
        createdAt: '2026-11-19T00:00:00Z',
        updatedAt: null,
        relevance: 0,
        baselineClaps: 0,
        applauded: false,
        deleted: false,
      },
    ];
  if (target.kind !== 'article' || target.id !== 'medium-brain') return [];
  return brainResponses.map((response) => ({
    parentId: null,
    updatedAt: null,
    applauded: false,
    deleted: false,
    ...response,
  }));
}
export const responseAvatar = (authorId: string) => {
  if (authorId === 'author-bernie') return require('../../../../assets/medium/bernie-response.png');
  if (authorId === 'author-alfred') return require('../../../../assets/medium/alfred-response.png');
  if (authorId === 'author-radu') return require('../../../../assets/medium/radu-response.png');
  if (authorId === 'author-frbarrosl') return require('../../../../assets/medium/frbarrosl-response.png');
  if (authorId === 'author-elena') return require('../../../../assets/medium/elena-response.png');
  if (authorId === 'author-gabriela') return require('../../../../assets/medium/gabriela-response.png');
  if (authorId === 'author-gwyneth') return require('../../../../assets/medium/gwyneth-response.png');
  if (authorId === 'author-melanie') return require('../../../../assets/medium/melanie-response.png');
  return null;
};
