import { render as renderNative } from '@testing-library/react-native';
import type { ReactElement, ReactNode } from 'react';

import { LikeProvider } from '../src/features/likes/LikeProvider';
import type { LikeSource } from '../src/features/likes/types';

// 기존 화면 검증의 임의 기사 ID에도 반응 조회가 별도 오류를 만들지 않도록 공급부를 주입한다.
const source: LikeSource = {
  fetchArticleLike: async (identity) => ({ ...identity, isLiked: false, count: 0 }),
  setArticleLiked: async (input) => ({ ...input, isLiked: input.liked, count: Number(input.liked) }),
};

export function LikeTestProvider({ children }: { children: ReactNode }) {
  return <LikeProvider source={source}>{children}</LikeProvider>;
}

export function renderWithLikes(element: ReactElement) {
  return renderNative(element, { wrapper: LikeTestProvider });
}
