import { render as renderNative } from '@testing-library/react-native';
import type { ReactElement, ReactNode } from 'react';

import { BookmarkProvider } from '../src/features/bookmarks/BookmarkProvider';
import { bookmarkArticles } from '../src/features/bookmarks/data/bookmarkFixtures';
import type { BookmarkSource } from '../src/features/bookmarks/types';
import { article } from '../src/features/feed/tests/helpers';
import { LikeProvider } from '../src/features/likes/LikeProvider';
import type { LikeSource } from '../src/features/likes/types';
import { AuthProvider } from '../src/features/auth/AuthProvider';
import { ClapProvider } from '../src/features/reactions/ClapProvider';
import type { ClapSource } from '../src/features/reactions/types';

// 기존 화면 검증의 임의 기사 ID에도 반응 조회가 별도 오류를 만들지 않도록 공급부를 주입한다.
const source: LikeSource = {
  fetchArticleLike: async (identity) => ({ ...identity, isLiked: false, count: 0 }),
  setArticleLiked: async (input) => ({ ...input, isLiked: input.liked, count: Number(input.liked) }),
};

export function LikeTestProvider({ children }: { children: ReactNode }) {
  return <AuthProvider><ClapProvider userId="example-reader" source={clapSource}>
    <LikeProvider source={source}><BookmarkProvider source={bookmarkSource} articles={testArticles}>
    {children}
  </BookmarkProvider></LikeProvider></ClapProvider></AuthProvider>;
}
const clapSource: ClapSource = {
  read: async input => ({ ...input, mine: 0, total: 0 }),
  save: async input => ({ ...input, total: input.mine }),
};

// 피드와 검색의 응답 순서 검증에 쓰는 기사도 별도 북마크 오류 없이 표현한다.
const testArticles = [...bookmarkArticles, ...['first', 'second', 'recovered', 'popular', 'obsolete',
  'latest', 'current', 'retry', 'old', 'new-A', 'old-A', 'old-B', 'rates', 'wrong', 'replacement'].map(article)];
const bookmarkSource: BookmarkSource = {
  fetchReadingList: async (userId) => ({ userId, articleIds: [] }),
  setArticleSaved: async (input) => ({ userId: input.userId, articleId: input.articleId, saved: input.saved }),
};

export function renderWithLikes(element: ReactElement) {
  return renderNative(element, { wrapper: LikeTestProvider });
}
