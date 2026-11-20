import { createContext, useContext } from 'react';

import type { FollowTarget } from './types';

export type CommunityNavigation = {
  openRecommendations: (
    section?: 'Following' | 'Reading history' | 'Muted' | 'Suggestions',
    interests?: boolean,
  ) => void;
  openExplore: () => void;
  openHistoryArticle: (id: string) => void;
  openTopic: (topicId: string) => void;
  openDiscovery: (filter: 'all' | 'publication') => void;
  openIdentity: (target: FollowTarget) => void;
  openConnections: (owner: FollowTarget | null, section: 'followers' | 'following') => void;
  openPublicList: (listId: string) => void;
};
const Context = createContext<CommunityNavigation>({
  openRecommendations: () => {},
  openExplore: () => {},
  openHistoryArticle: () => {},
  openTopic: () => {},
  openDiscovery: () => {},
  openIdentity: () => {},
  openConnections: () => {},
  openPublicList: () => {},
});
export const CommunityNavigationProvider = Context.Provider;
export const useCommunityNavigation = () => useContext(Context);
