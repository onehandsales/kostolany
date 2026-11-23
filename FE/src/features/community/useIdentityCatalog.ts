import { useMemo } from 'react';
import { mockUsers } from '../auth/data/mockUsers';
import { useKnownProfiles } from '../profile/ProfileProvider';
import { useDirectory } from './DirectoryProvider';
import type { PublicIdentity } from './types';

// 확정된 공개 프로필만 정적 디렉터리에 합쳐 검색과 관계 관리가 같은 ID를 해석한다.
export function useIdentityCatalog() {
  const directory = useDirectory();
  const profiles = useKnownProfiles();
  const data = useMemo(() => {
    if (!directory.state.data) return null;
    const identities: PublicIdentity[] = [...directory.state.data.identities];
    for (const user of mockUsers) {
      if (!identities.some((identity) => identity.kind === 'writer' && identity.id === user.id))
        identities.push({ kind: 'writer', id: user.id, name: user.name, stories: [], pinned: [], lists: [] });
    }
    return {
      ...directory.state.data,
      identities: identities.map((identity) => {
        const profile = identity.kind === 'writer'
          ? profiles.find((item) => item.userId === identity.id)
          : undefined;
        return profile ? { ...identity, name: profile.name, bio: profile.bio } : identity;
      }),
    };
  }, [directory.state.data, profiles]);
  return { state: { ...directory.state, data }, retry: directory.retry };
}
