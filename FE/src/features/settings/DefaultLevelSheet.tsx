import { AccessibleModal as Modal } from '../../shared/ui/AccessibleModal';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { explanationLevelLabels, explanationLevels, type ExplanationLevel } from '../article/explanationTypes';
import { useThemeStyles } from '../../shared/theme/ThemeProvider';

import type { ReadingSettingsStore } from './createReadingSettingsStore';
import { settingsStyles as createStyles } from './settingsStyles';

type DefaultLevelSheetProps = { initialLevel: ExplanationLevel; store: ReadingSettingsStore; onClose: () => void };

export function DefaultLevelSheet({ initialLevel, store, onClose }: DefaultLevelSheetProps) {
  const styles = useThemeStyles(createStyles);
  const [level, setLevel] = useState(initialLevel);
  const [pendingLevel, setPendingLevel] = useState<ExplanationLevel | null>(null);
  const [hasError, setHasError] = useState(false);
  const [notice, setNotice] = useState('');
  const pending = useRef<ExplanationLevel | null>(null);
  const draftVersion = useRef(0);
  const submission = useRef(0);
  const isMounted = useRef(true);
  useEffect(() => { isMounted.current = true; return () => { isMounted.current = false; }; }, []);
  const isDuplicate = pendingLevel === level;
  const save = async () => {
    if (pending.current === level) return;
    const id = ++submission.current;
    const version = draftVersion.current;
    pending.current = level;
    setPendingLevel(level);
    setHasError(false);
    setNotice('');
    const result = await store.save(level);
    if (!isMounted.current || id !== submission.current) return;
    pending.current = null;
    setPendingLevel(null);
    if (result.status === 'failed') setHasError(true);
    else if (result.status === 'saved' && version === draftVersion.current) onClose();
    else setNotice('제출한 선택은 처리됐어요. 추가로 바꾼 수준은 저장을 눌러 주세요.');
  };
  return <Modal transparent animationType="fade" accessibilityLabel="기본 설명 수준 편집" onRequestClose={onClose}>
    <SafeAreaView style={styles.backdrop}>
      <View accessibilityViewIsModal style={styles.sheet}>
        <View style={styles.header}>
          <Pressable role="button" accessibilityLabel="기본 설명 수준 닫기" onPress={onClose} style={styles.action}>
            <Text style={styles.text}>닫기</Text>
          </Pressable>
          <Text role="heading" style={styles.title}>기본 설명 수준</Text>
          <Pressable role="button" accessibilityLabel={hasError ? '기본 수준 저장 다시 시도' : '기본 수준 저장'}
            disabled={isDuplicate} accessibilityState={{ disabled: isDuplicate, busy: pendingLevel !== null }}
            onPress={() => { void save(); }} style={[styles.action, isDuplicate && styles.disabled]}>
            <Text style={styles.text}>{hasError ? '다시 시도' : isDuplicate ? '저장 중' : pendingLevel ? '추가 저장' : '저장'}</Text>
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={styles.group}>
          <Text style={styles.secondary}>다음에 여는 기사의 설명 수준이에요. 기사 안에서 바꾼 수준은 이 설정에 저장되지 않아요.</Text>
          <View role="radiogroup" accessibilityLabel="기본 설명 수준 선택" style={styles.choices}>
            {explanationLevels.map((option) => <Pressable key={option} role="radio"
              accessibilityLabel={`${explanationLevelLabels[option]} 기본 수준`} aria-checked={option === level}
              onPress={() => { draftVersion.current += 1; setLevel(option); setNotice(''); }}
              style={[styles.choice, option === level && styles.selected]}>
              <Text aria-hidden style={styles.text}>{option === level ? '●' : '○'}</Text>
              <Text style={styles.text}>{explanationLevelLabels[option]}</Text>
            </Pressable>)}
          </View>
          {hasError && <Text role="alert" style={styles.error}>저장하지 못했어요. 선택은 그대로예요. 바꾸거나 다시 시도할 수 있어요.</Text>}
          {!!notice && <Text aria-live="polite" style={styles.secondary}>{notice}</Text>}
          {pendingLevel && <Text aria-live="polite" style={styles.secondary}>저장 중에도 선택할 수 있어요. 추가 변경은 저장을 다시 눌러 주세요.</Text>}
          <Text style={styles.secondary}>닫으면 아직 제출하지 않은 선택은 사라져요. 이미 제출한 저장은 계속돼요.</Text>
          <Pressable role="button" accessibilityLabel="기본 설명 수준 취소" onPress={onClose} style={styles.button}>
            <Text style={styles.text}>취소</Text>
          </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  </Modal>;
}
