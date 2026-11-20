import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';
import { findPronouns, PROFILE_PRONOUN_LIMIT } from './pronouns';

type PronounsEditorProps = { initial: readonly string[]; onDone: (values: readonly string[]) => void; onCancel: () => void };

export function PronounsEditor({ initial, onDone, onCancel }: PronounsEditorProps) {
  const styles = useThemeStyles(createStyles);
  const [selected, setSelected] = useState(initial);
  const [query, setQuery] = useState('');
  const input = useRef<TextInput>(null);
  const candidates = findPronouns(query);
  return <>
    <View style={styles.header}>
      <Pressable role="button" accessibilityLabel="대명사 선택 취소" onPress={onCancel} style={styles.action}><AppIcon name="back" size={20} /></Pressable>
      <Text role="heading" style={styles.title}>Pronouns</Text>
      <Pressable role="button" accessibilityLabel="대명사 선택 완료" onPress={() => onDone(selected)} style={styles.action}><Text style={styles.done}>Done</Text></Pressable>
    </View>
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
      <View style={[styles.inputRow, !!query.trim() && styles.searchRow]}>
        <View pointerEvents="none" style={styles.inputSurface} />
        {selected.map(value => <Pressable key={value} role="button" accessibilityLabel={`${value} 대명사 삭제`}
          style={styles.chipTarget} onPress={() => { setSelected(values => values.filter(item => item !== value)); input.current?.focus(); }}>
          <View style={styles.chip}><Text style={styles.text}>{value}</Text><AppIcon name="close" size={12} /></View>
        </Pressable>)}
        <TextInput ref={input} autoFocus accessibilityLabel="대명사 검색" value={query} onChangeText={setQuery}
          placeholder="Add..." autoCapitalize="none" autoCorrect={false} style={styles.input} returnKeyType="done" submitBehavior="blurAndSubmit" />
      </View>
      {(selected.length > 0 || !query.trim()) && <Text style={styles.counter}>{selected.length} / {PROFILE_PRONOUN_LIMIT}</Text>}
      {candidates.map((value, index) => {
        const chosen = selected.includes(value);
        const disabled = !chosen && selected.length >= PROFILE_PRONOUN_LIMIT;
        return <Pressable key={value} role="checkbox" accessibilityLabel={`${value} 대명사 선택`}
          accessibilityState={{ checked: chosen, disabled }} aria-checked={chosen} disabled={disabled}
          style={[styles.candidate, index === candidates.length - 1 && styles.lastCandidate, disabled && styles.disabled]} onPress={() => {
            if (chosen) return;
            setSelected(values => values.length < PROFILE_PRONOUN_LIMIT && !values.includes(value) ? [...values, value] : values);
            setQuery('');
            input.current?.focus();
          }}><Text style={styles.text}>{value}</Text>{chosen && <AppIcon name="check" size={16} />}</Pressable>;
      })}
      {!!query.trim() && candidates.length === 0 && <Text style={styles.message}>일치하는 대명사가 없어요.</Text>}
      {selected.length === PROFILE_PRONOUN_LIMIT && <Text aria-live="polite" style={styles.message}>4개까지 선택할 수 있어요. 변경하려면 선택한 대명사를 먼저 삭제해 주세요.</Text>}
    </ScrollView>
  </>;
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  header: { minHeight: 54, flexDirection: 'row', alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.border },
  action: { minWidth: 72, minHeight: 48, alignItems: 'center', justifyContent: 'center' },
  title: { flex: 1, textAlign: 'center', fontFamily: fonts.sans, fontSize: 16, lineHeight: 22, fontWeight: '600', color: colors.text },
  done: { fontFamily: fonts.sans, fontSize: 14, color: colors.text, textDecorationLine: 'underline' },
  content: { padding: 24, paddingTop: 19, paddingBottom: 48 },
  inputRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', minHeight: 48, paddingHorizontal: 8 },
  searchRow: { marginBottom: 5 },
  inputSurface: { position: 'absolute', top: 5, bottom: 5, left: 0, right: 0, borderWidth: 1, borderColor: colors.secondaryText, borderRadius: 4, backgroundColor: colors.input },
  input: { position: 'relative', zIndex: 1, flexGrow: 1, minWidth: 80, minHeight: 48, paddingHorizontal: 4, fontFamily: fonts.sans, fontSize: 14, color: colors.text },
  chipTarget: { position: 'relative', zIndex: 1, minHeight: 48, minWidth: 48, justifyContent: 'center', paddingRight: 6 },
  chip: { padding: 4, gap: 6, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background, borderRadius: 3 },
  text: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.text },
  counter: { textAlign: 'right', fontSize: 13, lineHeight: 20, color: colors.secondaryText, marginTop: 4 },
  candidate: { minHeight: 48, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.border },
  lastCandidate: { borderBottomWidth: 0 },
  disabled: { opacity: 0.4 },
  message: { marginTop: 16, fontSize: 14, lineHeight: 22, color: colors.secondaryText },
});
