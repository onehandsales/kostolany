import { useEffect, useRef, useState } from 'react';
import { Image, Keyboard, Pressable, StyleSheet, Text, View, type TextInput } from 'react-native';

import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { FormTextInput } from '../../shared/ui/FormTextInput';
import type { FeedArticle } from '../feed/types';
import { SearchByline } from '../search/SearchCard';
import { LibrarySheet } from './LibrarySheet';
import { useBookmarkStore, useUserLists } from './useBookmarks';

type ListNoteSheetProps = { listId: string; article: FeedArticle; onClose: () => void };

export function ListNoteSheet({ listId, article, onClose }: ListNoteSheetProps) {
  const styles = useThemeStyles(createStyles);
  const store = useBookmarkStore().userLists;
  const state = useUserLists();
  const entry = state.entries.find(item => item.listId === listId);
  const [note, setNote] = useState(entry?.confirmed?.notes?.[article.id] ?? '');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const input = useRef<TextInput>(null);
  const pending = submitted && Boolean(entry?.isPending);
  useEffect(() => {
    if (state.status === 'ready' && !entry?.content?.articleIds.includes(article.id)) onClose();
    else if (submitted && entry?.confirmed && !entry.isPending && !entry.failure) onClose();
  }, [state.status, entry, article.id, submitted, onClose]);
  const save = () => {
    if (pending) return;
    const normalized = note.trim() ? note.normalize('NFC') : '';
    if (entry?.failure && !entry.failure.conflict && (entry.failure.target?.notes?.[article.id] ?? '') === normalized) {
      store.retryList(listId);
    } else {
      const result = store.setNote(listId, article.id, note);
      if (!result.ok) { setError(result.message); return; }
    }
    setError(null);
    setSubmitted(true);
    Keyboard.dismiss();
  };
  return <LibrarySheet title={entry?.confirmed?.notes?.[article.id] ? 'Edit note' : 'Add note'}
    titleLabel="목록 메모" expanded onClose={onClose} onShow={() => input.current?.focus()}
    closeLabel={pending ? '닫기' : '취소'} closeText={pending ? 'Close' : 'Cancel'} contentStyle={styles.content}>
    <FormTextInput ref={input} accessibilityLabel="목록 기사 메모" value={note} multiline
      editable={!pending} placeholder="Add a brief description" onChangeText={setNote} />
    <View style={styles.preview}>
      <SearchByline name={article.sourceName} avatar={article.reference?.avatar} />
      <View style={styles.row}>
        <Text style={styles.title}>{article.title}</Text>
        {article.reference?.image && <Image source={article.reference.image} style={styles.image} accessible={false} />}
      </View>
      <Text style={styles.byline}>{[
        article.readingMinutes > 0 ? `${article.readingMinutes} min read` : null,
        article.publishedLabel,
      ].filter(Boolean).join(' · ')}</Text>
    </View>
    {(error || entry?.failure) && <Text role="alert" style={styles.error}>
      {error ?? '메모를 저장하지 못했어요. 입력을 확인하고 다시 시도해 주세요.'}</Text>}
    <Pressable role="button" accessibilityLabel={entry?.failure ? '메모 저장 다시 시도' : '메모 저장'}
      disabled={pending} accessibilityState={{ disabled: pending, busy: pending }} onPress={save} style={styles.done}>
      <Text style={styles.doneText}>{pending ? 'Saving…' : entry?.failure ? 'Retry' : 'Done'}</Text>
    </Pressable>
  </LibrarySheet>;
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 35 },
  preview: { padding: 24, gap: 12, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border,
    backgroundColor: colors.surface, borderRadius: 3, marginTop: 3, marginBottom: 9 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  title: { flex: 1, minWidth: 140, fontFamily: fonts.sans, fontWeight: '700', fontSize: 16, lineHeight: 21, color: colors.text },
  byline: { fontFamily: fonts.sans, fontSize: 12, lineHeight: 18, color: colors.secondaryText },
  image: { width: 80, height: 56 },
  error: { color: colors.destructive, fontFamily: fonts.sans, fontSize: 14, lineHeight: 22 },
  done: { minHeight: 48, minWidth: 48, borderRadius: 26, justifyContent: 'center', backgroundColor: colors.green, marginHorizontal: 8 },
  doneText: { color: colors.onAccent, textAlign: 'center', fontFamily: fonts.sans, fontSize: 14, lineHeight: 20 },
});
