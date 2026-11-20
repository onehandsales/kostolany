import { Pressable, Text, View } from 'react-native';

import { useTheme } from '../../shared/theme/ThemeProvider';
import { useAuth } from '../auth/AuthProvider';
import { BookmarkIcon } from '../bookmarks/BookmarkIcon';
import { usePublicLists } from './PublicListProvider';
import type { PublicList } from './types';

type SavePublicListControlProps = { list: PublicList; compact?: boolean };
export function SavePublicListControl({ list, compact = false }: SavePublicListControlProps) {
  const auth = useAuth();
  const { state, store, scope } = usePublicLists();
  const { colors } = useTheme();
  if (auth.state.user?.id === list.owner.id) return null;
  const saved = state?.savedIds.includes(list.id) ?? false;
  const pending = state?.pendingIds.includes(list.id) ?? false;
  const failed = scope && state?.errors[list.id] === scope;
  const disabled = !state?.value || state.readError;
  return <View>
    <Pressable role="button" accessibilityLabel={`${saved ? 'Unsave' : 'Save'} list ${list.title}`}
      accessibilityState={{ selected: saved, busy: pending, disabled }} disabled={disabled}
      onPress={() => {
        if (!auth.state.user) auth.store.openLogin({ kind: 'save-list', listId: list.id });
        else if (scope) store?.setSaved(list.id, !saved, scope);
      }} style={{ minHeight: 48, minWidth: 48, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <BookmarkIcon saved={saved} plus={!saved} size={24} />
      {!compact && <Text style={{ color: colors.text }}>{saved ? 'Saved' : 'Save list'}</Text>}
    </Pressable>
    {failed && <Pressable role="button" accessibilityLabel={`Retry saving list ${list.title}`}
      onPress={() => { if (scope) store?.retry(list.id, scope); }} style={{ minHeight: 48, justifyContent: 'center' }}>
      <Text role="alert" style={{ color: colors.destructive }}>Couldn’t save. Retry</Text>
    </Pressable>}
  </View>;
}
