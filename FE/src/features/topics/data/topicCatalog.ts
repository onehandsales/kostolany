import type { TopicCatalog } from '../types';

const observedCounts: Readonly<Record<string, { followers: string; storyCount: string }>> = {
  Programming: { followers: '11.6M', storyCount: '513K' },
  'Data Science': { followers: '9.3M', storyCount: '403K' },
  Writing: { followers: '8.9M', storyCount: '1M' },
  Relationships: { followers: '7.7M', storyCount: '659K' },
};
const names = [
  'Programming',
  'Life',
  'Life Lessons',
  'Self Improvement',
  'Writing',
  'Machine Learning',
  'Relationships',
  'Productivity',
  'Health',
  'Science',
  'Business',
  'Software Development',
  'Work',
  'Technology',
  'Media',
  'Society',
  'Culture',
  'World',
  'Data Science',
  'Mindfulness',
  'Music',
  'Art',
  'ChatGPT',
  'AI',
  'Artificial Intelligence',
  'OpenAI',
];
// 토픽 이름과 고정 ID를 분리하며 미수록 집계와 기사 목록은 만들어 채우지 않는다.
export const topicCatalog: TopicCatalog = {
  topics: names.map((name) => ({
    id: name.toLowerCase().replaceAll(' ', '-'),
    name,
    related: ['Life', 'Life Lessons', 'Self Improvement'].includes(name)
      ? ['life', 'life-lessons', 'self-improvement']
      : [],
    stories: ['ChatGPT', 'AI', 'Artificial Intelligence', 'OpenAI', 'Productivity'].includes(name)
      ? ['medium-brain']
      : [],
    curations: [],
    ...observedCounts[name],
    ...(name === 'Life'
      ? {
          followers: '7.1M',
          storyCount: '1.3M',
          stories: ['medium-atlantic'],
        }
      : name === 'Self Improvement'
        ? {
            followers: '10.6M',
            storyCount: '1M',
            stories: ['medium-pope'],
            curations: ['morning-routine'],
          }
        : {}),
  })),
  curations: [
    {
      id: 'morning-routine',
      title: 'The power of a morning routine',
      curatorId: 'medium-staff',
      listId: 'public-morning-routine',
      previewStories: ['medium-morning-routine', 'medium-productivity-obsession'],
      partialImageWidths: { 'medium-productivity-obsession': 97 },
    },
  ],
};
export const topicByName = (name: string) => topicCatalog.topics.find((topic) => topic.name === name);
export const articleTopicIds = (articleId: string, catalog: TopicCatalog = topicCatalog) =>
  catalog.topics
    .filter(
      (topic) =>
        topic.stories.includes(articleId) ||
        topic.curations.some((id) =>
          catalog.curations.find((curation) => curation.id === id)?.previewStories.includes(articleId),
        ),
    )
    .map((topic) => topic.id);
