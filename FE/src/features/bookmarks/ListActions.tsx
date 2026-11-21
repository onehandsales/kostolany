import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { ActionMenu } from '../../shared/ui/ActionMenu';
import { LibrarySheet, listFormStyles as createListFormStyles } from './LibrarySheet';
import { ListEditorSheet } from './ListEditorSheet';
import { useBookmarkStore, useUserLists } from './useBookmarks';
import { DEFAULT_LIST_ID } from './listTypes';
import { ListPrivacyDialog } from './ListPrivacyDialog';
import { ReorderListSheet } from './ReorderListSheet';
import { useCommunityNavigation } from '../community/CommunityNavigation';
import { ownedPublicListId } from '../public-lists/ownedPublicList';

type ListActionsProps = { listId: string; name: string };

export function ListActions({ listId, name }: ListActionsProps) {
  const state = useUserLists();
  const selected = state.entries.find((entry) => entry.listId === listId && entry.content);
  return selected?.content ? (
    <ListActionControls listId={listId} name={name} isPrivate={selected.content.isPrivate ?? false} />
  ) : null;
}

function ListActionControls({
  listId,
  name,
  isPrivate,
}: {
  listId: string;
  name: string;
  isPrivate: boolean;
}) {
  const styles = useThemeStyles(createStyles);
  const listFormStyles = useThemeStyles(createListFormStyles);
  const [mode, setMode] = useState<'rename' | 'delete' | 'privacy' | 'reorder' | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 2600);
    return () => clearTimeout(timer);
  }, [notice]);
  const store = useBookmarkStore().userLists;
  const navigation = useCommunityNavigation();
  const isDefault = listId === DEFAULT_LIST_ID;
  return (
    <>
      <ActionMenu
        label={`목록 관리, ${name}`}
        items={[
          ...(!isDefault ? [{ label: 'Edit list info', accessibilityLabel: '이름 수정', onPress: () => setMode('rename') },
          {
            label: isPrivate ? 'Make list public' : 'Make list private',
            onPress: () => {
              setMode('privacy');
            },
          }] : []),
          { label: 'Reorder items', onPress: () => setMode('reorder') },
          ...(!isDefault ? [
          { label: 'View list', onPress: () => {
            navigation.openPublicList(ownedPublicListId(store.userId, listId), store.userId);
          } },
          {
            label: 'Delete list',
            accessibilityLabel: '목록 삭제',
            destructive: true,
            onPress: () => setMode('delete'),
          }] : []),
        ]}
      />
      {mode === 'rename' && (
        <ListEditorSheet listId={listId} initialName={name} onClose={() => setMode(null)} />
      )}
      {mode === 'privacy' && <ListPrivacyDialog listId={listId} isPrivate={!isPrivate}
        onSaved={savedPrivate => setNotice(`${name} is now ${savedPrivate ? 'private' : 'public'}`)}
        onClose={() => setMode(null)} />}
      {notice && <View pointerEvents="none" style={styles.notice}>
        <Text aria-live="polite" style={styles.noticeText}>{notice}</Text>
      </View>}
      {mode === 'reorder' && <ReorderListSheet listId={listId} onClose={() => setMode(null)} />}
      {mode === 'delete' && (
        <LibrarySheet
          title="Delete list"
          titleLabel="목록 삭제"
          variant="confirmation"
          closeText="×"
          onClose={() => setMode(null)}
          contentStyle={styles.content}
        >
          <Text style={styles.description}>
            Deleting this list will remove it from Your library. If others have saved this list, it will also
            be deleted and removed from their library. Deleting this list will not delete any stories in it.
          </Text>
          <Pressable
            role="button"
            accessibilityLabel="목록 삭제 확인"
            onPress={() => {
              store.deleteList(listId);
              setMode(null);
            }}
            style={styles.deleteTarget}
          >
            <View style={styles.danger}>
              <Text style={listFormStyles.primaryText}>Delete</Text>
            </View>
          </Pressable>
        </LibrarySheet>
      )}
    </>
  );
}
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  notice: { position: 'absolute', top: 56, right: 8, maxWidth: 300, padding: 20,
    borderRadius: 4, backgroundColor: '#242424', zIndex: 10 },
  noticeText: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: '#ffffff' },
  content: { gap: 24, paddingTop: 0, paddingBottom: 16 },
  description: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 18, color: colors.text, textAlign: 'center' },
  local: { fontFamily: fonts.sans, fontSize: 12, lineHeight: 18, color: colors.secondaryText, textAlign: 'center' },
  deleteTarget: { minHeight: 48, justifyContent: 'center', marginHorizontal: 8 },
  danger: { minHeight: 42, padding: 9, backgroundColor: '#ce4747', borderRadius: 24, justifyContent: 'center' },
});
