import type { ArticleDetail } from '../../article/types';
import type { FeedArticle } from '../types';

// 보관된 S008의 표시값과 발췌만 제공하며 현재 정책이나 실제 서비스 집계를 뜻하지 않는다.
export const mediumPolicyArticle: FeedArticle = {
  id: 'medium-rules', title: 'Medium Rules', summary: '', sourceName: 'Medium',
  publishedLabel: 'May 26, 2021', readingMinutes: 11, thumbnail: null,
  reference: { applause: 54000, responses: '272', memberOnly: false },
};

export const policyParagraphs = [
  'Medium is an open platform that exists to share ideas and perspectives from the world’s most insightful writers, thinkers, and storytellers.',
  'We welcome thoughtful and civil discussion from a broad spectrum of viewpoints. To maintain a safe, respectful, and welcoming environment for a wide range of people to engage in meaningful conversations, we prohibit certain conduct.',
  'In deciding whether there has been a violation of the rules, we will take into consideration things like newsworthiness,',
] as const;

export const policyArticleDetail: ArticleDetail = {
  ...mediumPolicyArticle, subtitle: '', image: null, facts: policyParagraphs, interpretation: [],
};
