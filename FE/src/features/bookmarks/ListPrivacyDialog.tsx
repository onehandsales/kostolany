import { AccessibleModal as Modal } from '../../shared/ui/AccessibleModal';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { useBookmarkStore, useUserLists } from './useBookmarks';

type ListPrivacyDialogProps = { listId: string; isPrivate: boolean; onClose: () => void; onSaved: (isPrivate: boolean) => void };
export function ListPrivacyDialog({ listId, isPrivate: initialPrivate, onClose, onSaved }: ListPrivacyDialogProps) {
  const styles = useThemeStyles(createStyles);
  const store = useBookmarkStore().userLists;
  const state = useUserLists();
  const entry = state.entries.find(item => item.listId === listId);
  const [submitted, setSubmitted] = useState(false);
  const [isPrivate] = useState(initialPrivate);
  const pending = submitted && Boolean(entry?.isPending);
  useEffect(() => {
    if (!entry?.content) onClose();
    else if (submitted && !entry.isPending && !entry.failure && entry.confirmed?.isPrivate === isPrivate) {
      onSaved(isPrivate);
      onClose();
    }
  }, [entry, submitted, isPrivate, onClose, onSaved]);
  return <Modal transparent animationType="fade" onRequestClose={onClose}>
    <View style={styles.overlay}>
      <View accessibilityViewIsModal role="dialog" accessibilityLabel="목록 공개 범위 확인" style={styles.dialog}>
        <Text role="heading" style={styles.title}>{isPrivate ? 'Make list private' : 'Make list public'}</Text>
        <Text style={styles.body}>{isPrivate ? 'If others have saved this list, it will be removed from their library.'
          : 'Anyone will be able to view this list and its notes.'}</Text>
        {entry?.failure && <Text role="alert" style={styles.error}>공개 범위를 변경하지 못했어요. 다시 시도해 주세요.</Text>}
        <View style={styles.actions}>
          <Pressable role="button" onPress={onClose} style={styles.button}><Text style={styles.action}>{pending ? 'Close' : 'Cancel'}</Text></Pressable>
          <Pressable role="button" accessibilityLabel={isPrivate ? '목록 비공개 확인' : '목록 공개 확인'}
            disabled={pending} accessibilityState={{ disabled: pending, busy: pending }} style={styles.button}
            onPress={() => {
              if (!entry?.failure?.conflict && entry?.failure?.target?.isPrivate === isPrivate) store.retryList(listId);
              else if (entry?.content) store.renameList(listId, entry.content.name, { isPrivate });
              setSubmitted(true);
            }}><Text style={styles.action}>{pending ? 'Saving…' : entry?.failure ? 'Retry' : isPrivate ? 'Make private' : 'Make public'}</Text></Pressable>
        </View>
      </View>
    </View>
  </Modal>;
}
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#00000033' },
  dialog: { width: '100%', maxWidth: 300, backgroundColor: colors.surface, borderRadius: 14, overflow: 'hidden' },
  title: { fontFamily: fonts.sans, fontSize: 17, lineHeight: 23, fontWeight: '700', color: colors.text, textAlign: 'center', marginTop: 20, paddingHorizontal: 16 },
  body: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 18, color: colors.text, textAlign: 'center', padding: 16, paddingTop: 4 },
  error: { color: colors.destructive, padding: 16 },
  actions: { flexDirection: 'row', borderTopWidth: StyleSheet.hairlineWidth, borderColor: colors.border },
  button: { flex: 1, minHeight: 48, minWidth: 48, alignItems: 'center', justifyContent: 'center', padding: 8 },
  action: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 22, color: colors.green },
});
