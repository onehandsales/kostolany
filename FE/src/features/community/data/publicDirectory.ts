import { mediumArticles } from '../../feed/data/mediumFixtures';
import { suggestedProfiles } from '../../feed/data/mediumExploreExtras';
import { followKey, type FollowTarget, type PublicDirectory, type PublicIdentity } from '../types';

// 공개 fixture의 고정 ID를 사용하며 편집 가능한 내 프로필 이름과 식별자를 섞지 않는다.
const writerAssignments: Readonly<Record<string, string>> = {
  'medium-unsexy-habits': 'akinyele',
  'medium-titans': 'fedeminozzi',
  'medium-personality': 'singh-bhai',
  'medium-atlantic': 'ricky',
  'medium-pope': 'daniel',
  'medium-morning-routine': 'darius',
  'medium-productivity-obsession': 'ryan',
  'medium-love': 'kris',
  'medium-evening': 'aleid',
  'medium-jeremiah': 'jeremiah',
  'medium-brain': 'jordan',
  'medium-ide': 'tari',
  'medium-trauma': 'mitch',
  'medium-awareness': 'lalithaa',
  'medium-vinyl': 'shon',
  'medium-apple': 'michal',
  'medium-swift': 'thomas',
  'medium-insiders': 'scott',
  'medium-ai-writing': 'joe',
  'medium-curious': 'brian',
  'medium-forgiven': 'ben',
  'medium-podcasters': 'colin',
  'medium-balance': 'wilson',
  'medium-flood': 'ronan',
  'medium-mcp': 'mehul',
  'medium-obsidian': 'theo',
  'medium-chimichurri': 'paul',
  'medium-mind-fullness': 'mind-fullness',
  'medium-horse': 'caroline',
  'medium-emptiness': 'tomas',
  'medium-prompt-bible': 'jordan',
  'medium-gemini': 'jordan',
  'medium-important-prompt': 'jordan',
};
const publicationAssignments: Readonly<Record<string, string>> = {
  'medium-unsexy-habits': 'write-catalyst',
  'medium-titans': 'stem-parenting',
  'medium-personality': 'think-draft',
  'medium-atlantic': 'southern-winds',
  'medium-productivity-obsession': 'knowable',
  'medium-evening': 'better-advice',
  'medium-ide': 'coding-beauty',
  'medium-vinyl': 'ironkeel',
  'medium-apple': 'ux-collective',
  'medium-ai-writing': 'entrepreneurship-handbook',
  'medium-curious': 'thought-thinkers',
  'medium-forgiven': 'thought-thinkers',
  'medium-mcp': 'data-science-pocket',
  'medium-obsidian': 'obsidian-observer',
  'medium-chimichurri': 'challenged',
  'medium-emptiness': 'know-thyself',
};
export function articleWriter(articleId: string): FollowTarget | null {
  const id = writerAssignments[articleId];
  return id ? { kind: 'writer', id } : null;
}
export function articlePublication(articleId: string): FollowTarget | null {
  const id = publicationAssignments[articleId];
  return id ? { kind: 'publication', id } : null;
}
const identities = new Map<string, PublicIdentity>();
mediumArticles.forEach((article) => {
  const target = articleWriter(article.id);
  if (!target) return;
  const byline = /^In (.+) by (.+)$/.exec(article.sourceName);
  const key = followKey(target);
  const previous = identities.get(key);
  identities.set(key, {
    ...target,
    name: byline?.[2] ?? article.sourceName,
    avatar: byline ? undefined : article.reference?.avatar,
    verified: article.reference?.verifiedAuthor,
    stories: [...(previous?.stories ?? []), article.id],
    pinned: [],
    lists: [],
  });
  const publication = articlePublication(article.id);
  if (publication) {
    const previousPublication = identities.get(followKey(publication));
    identities.set(followKey(publication), {
      ...publication,
      name: byline?.[1] ?? article.sourceName,
      avatar: article.reference?.avatar,
      stories: [...(previousPublication?.stories ?? []), article.id],
      pinned: [],
      lists: [],
    });
  }
});
const jordan = identities.get('writer:jordan');
if (jordan)
  identities.set('writer:jordan', {
    ...jordan,
    avatar: require('../../../../assets/medium/jordan-profile.png'),
    friend: true,
    followers: '10.2K',
    followingCount: 25,
    bio: "Need an AI prototype ASAP? Let's chat.",
    website: 'https://jordangibbs.xyz',
    about: [
      "Hi I'm Jordan. I'm an AI tinkerer and developer. I'm enamored by advances in artificial intelligence, and I'm always staying on the bleeding edge.",
      "Here, I'll post articles that detail my AI endeavors, and I hope to spread the lessons and knowledge I learn from doing so.",
    ],
    memberSince: 'October 2023',
    friendSince: 'December 2023',
    pinned: ['medium-prompt-bible', 'medium-important-prompt'],
    lists: ['public-aaa-ai'],
  });
export const suggestedTargets: FollowTarget[] = [
  { kind: 'writer', id: 'iris' },
  { kind: 'publication', id: 'coinmonks' },
  { kind: 'publication', id: 'daily-dollar' },
  { kind: 'writer', id: 'alex-mathers' },
];
suggestedProfiles.forEach((profile, index) => {
  const target = suggestedTargets[index];
  if (!target) return;
  identities.set(followKey(target), {
    ...target,
    name: profile.name,
    avatar: profile.image,
    bio: profile.bio,
    followers: profile.followers,
    stories: [],
    pinned: [],
    lists: [],
  });
});
const following: PublicIdentity[] = [
  { kind: 'writer', id: 'jo', name: 'Jo Sevier', stories: [], pinned: [], lists: [] },
  {
    kind: 'publication',
    id: 'medium-blog',
    name: 'The Medium Blog',
    avatar: require('../../../../assets/medium/medium-blog.png'),
    bio: 'The official source of news and updates about Medium',
    stories: [],
    pinned: [],
    lists: [],
  },
  {
    kind: 'writer',
    id: 'keith',
    name: 'Keith Lauver',
    avatar: require('../../../../assets/medium/keith.png'),
    bio: 'Devoted to becoming a fully present, attachment-free, passionate co-creator, generousl...',
    stories: [],
    pinned: [],
    lists: [],
  },
  {
    kind: 'writer',
    id: 'roy',
    name: 'Roy Bahat',
    avatar: require('../../../../assets/medium/roy.png'),
    bio: 'Head of Bloomberg Beta, investing in the best startups creating the future of work. Alignment: Neutra...',
    stories: [],
    pinned: [],
    lists: [],
  },
  {
    kind: 'writer',
    id: 'douglas',
    name: 'Douglas Giles, PhD',
    avatar: require('../../../../assets/medium/douglas.png'),
    verified: true,
    bio: 'Philosopher by trade & temperament, professor for 21 years, bringing philosophy out of...',
    stories: [],
    pinned: [],
    lists: [],
  },
  {
    kind: 'writer',
    id: 'aaron',
    name: 'Aaron Dinin, PhD',
    avatar: require('../../../../assets/medium/aaron.png'),
    verified: true,
    bio: 'I teach entrepreneurship at Duke. Software Engineer. PhD in English. I write about the mistakes entrepr...',
    stories: [],
    pinned: [],
    lists: [],
  },
  {
    kind: 'writer',
    id: 'sheila',
    name: 'Sheila Teo',
    avatar: require('../../../../assets/medium/sheila.png'),
    stories: [],
    pinned: [],
    lists: [],
  },
];
following.forEach((identity) => identities.set(followKey(identity), identity));
identities.set('writer:medium-staff', {
  kind: 'writer',
  id: 'medium-staff',
  name: 'Medium Staff',
  avatar: require('../../../../assets/medium/medium-staff.png'),
  bio: 'Official account for news and updates from Medium.',
  stories: [],
  pinned: [],
  lists: ['public-morning-routine'],
});
// 추천 화면에서 관찰한 소개만 추가하고 미수록 프로필 본문은 채우지 않는다.
for (const identity of [
  {
    id: 'kim-witten',
    name: 'Kim Witten, PhD',
    bio: 'Helping overwhelmed creatives make sense of messy situations, signals, and data. Get unstuck ev…',
    avatar: require('../../../../assets/medium/kim-witten.png'),
  },
  {
    id: 'zulie-medium',
    name: 'Zulie @ Medium',
    bio: 'Product storyteller at Medium. Official staff account.',
    avatar: require('../../../../assets/medium/zulie-medium.png'),
  },
  {
    id: 'wilson',
    name: 'F. Perry Wilson, MD',
    bio: 'Medicine, science, statistics. Associate Professor of Medicine and Public Health at Yale. Host of…',
    avatar: require('../../../../assets/medium/perry-wilson.png'),
    verified: true,
  },
]) {
  const previous = identities.get(`writer:${identity.id}`);
  identities.set(`writer:${identity.id}`, {
    kind: 'writer',
    stories: [],
    pinned: [],
    lists: [],
    ...previous,
    ...identity,
  });
}
export const publicDirectory: PublicDirectory = {
  identities: [...identities.values()],
  // 원본에 소유자가 표시되지 않아 Jordan과의 연결은 mock 탐색용 보완이다.
  following: { 'writer:jordan': following.map(({ kind, id }) => ({ kind, id })) },
};
export const publicIdentity = (target: FollowTarget) => identities.get(followKey(target));
export const publicListPreviews = [
  {
    id: 'public-morning-routine',
    author: { kind: 'writer' as const, id: 'medium-staff' },
    title: 'The power of a morning routine',
    count: 8,
    covers: [
      require('../../../../assets/medium/morning-routine.png'),
      require('../../../../assets/medium/morning-productivity.png'),
    ],
  },
  {
    id: 'public-aaa-ai',
    author: { kind: 'writer' as const, id: 'jordan' },
    title: 'AAA AI',
    count: 2,
    covers: [
      require('../../../../assets/medium/aaa-ai-first.png'),
      require('../../../../assets/medium/aaa-ai-second.png'),
    ],
  },
];
