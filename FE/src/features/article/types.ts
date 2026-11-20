import type { ReferenceStory } from '../feed/types';
import type { ImageSourcePropType } from 'react-native';

export type ReferenceBlock =
  | { kind: 'text'; text: string; bold?: boolean; highlight?: string }
  | { kind: 'divider' }
  | { kind: 'missing' }
  | { kind: 'image'; source: ImageSourcePropType; description: string; caption: string; aspectRatio: number };

export type ReferenceArticleContent = {
  publishedLabel: string;
  caption: string;
  blocks: readonly ReferenceBlock[];
  topics: readonly string[];
  authorFollowers: string;
  authorFollowing: string;
  authorBio: string;
};

// 읽기 화면의 로컬 데이터 계약이며 백엔드 API 계약을 확정하지 않는다.
export type ArticleDetail = {
  id: string;
  title: string;
  subtitle: string;
  sourceName: string;
  publishedLabel: string;
  readingMinutes: number;
  image: { variant: 'city' | 'coins'; description: string; caption: string } | null;
  facts: readonly string[];
  interpretation: readonly string[];
  reference?: ReferenceStory;
  referenceContent?: ReferenceArticleContent;
};

export type ArticleSource = (articleId: string) => Promise<ArticleDetail>;

export type ArticleLoadState =
  | { status: 'loading' }
  | { status: 'ready'; article: ArticleDetail }
  | { status: 'error' };
