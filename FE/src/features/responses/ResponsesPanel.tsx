import { AccessibleModal as Modal } from '../../shared/ui/AccessibleModal';
import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ResponseManagement } from './ResponseManagement';
import { visibleResponses } from './responseVisibility';
import { useModeration } from '../moderation/ModerationContext';
import { useTheme, useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { IconButton } from '../../shared/ui/IconButton';
import { AppIcon } from '../../shared/ui/AppIcon';
import { TopPopover } from '../../shared/ui/TopPopover';
import { restoreModalFocus } from '../../shared/ui/restoreModalFocus';
import { useAuth } from '../auth/AuthProvider';
import { useProfile } from '../profile/ProfileProvider';
import { ProfileAvatar } from '../profile/ProfileAvatar';
import { ResponseQuoteBlock } from './ResponseQuoteBlock';
import { ResponseCard } from './ResponseCard';
import { useResponses } from './ResponseProvider';
import { responseRows, type ResponseSort } from './responseRows';
import {
  RESPONSE_MAX_LENGTH,
  newResponseOperation,
  type ReaderResponse,
  type ResponseAction,
  type ResponseQuote,
  type ResponseResult,
  type ResponseTarget,
} from './types';

type Composer = { mode: 'create'; parentId: string | null } | { mode: 'edit'; id: string };
export function ResponsesPanel({
  target,
  initialReplyId,
  initialEditId,
  initialDeleteId,
  initialQuote,
  initialFocusId,
  initialPolicy = false,
  onClose,
}: {
  target: ResponseTarget;
  initialReplyId?: string;
  initialEditId?: string;
  initialDeleteId?: string;
  initialQuote?: ResponseQuote;
  initialFocusId?: string;
  initialPolicy?: boolean;
  onClose: () => void;
}) {
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  const { store, state } = useResponses(target);
  const auth = useAuth();
  const profile = useProfile();
  const [sort, setSort] = useState<ResponseSort>('relevant');
  const [sortOpen, setSortOpen] = useState(false);
  const [sortTop, setSortTop] = useState(126);
  const sortAnchor = useRef<View>(null);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [visibleReplies, setVisibleReplies] = useState<Record<string, number>>({});
  const [composer, setComposer] = useState<Composer>(
    initialEditId
      ? { mode: 'edit', id: initialEditId }
      : { mode: 'create', parentId: initialReplyId ?? null },
  );
  const [draft, setDraft] = useState(
    () => state?.value?.responses.find((response) => response.id === initialEditId)?.body ?? '',
  );
  const [quote, setQuote] = useState(initialQuote);
  const [error, setError] = useState<ResponseResult | null>(null);
  const [pending, setPending] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ReaderResponse | null>(
    () => state?.value?.responses.find((response) => response.id === initialDeleteId) ?? null,
  );
  const [policy, setPolicy] = useState(initialPolicy);
  const [policyError, setPolicyError] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const input = useRef<TextInput>(null);
  const mounted = useRef(true);
  const generation = useRef(0);
  const repliesIntent = useRef(0);
  const submitting = useRef(false);
  const attempt = useRef<{ fingerprint: string; operationId: string } | null>(null);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      generation.current += 1;
      if (Platform.OS === 'web') requestAnimationFrame(restoreModalFocus);
    };
  }, []);
  useEffect(() => {
    if (!announcement) return;
    const timer = setTimeout(() => setAnnouncement(''), 2000);
    return () => clearTimeout(timer);
  }, [announcement]);
  const moderation = useModeration();
  const responses = visibleResponses(state?.value, moderation.state?.value?.blocked);
  const closed = Boolean(state?.value?.discussion && state.value.discussion !== 'open');
  const count = responses.filter((response) => !response.deleted && response.parentId === null).length;
  const selectedId = composer.mode === 'edit' ? composer.id : composer.parentId;
  const selected = selectedId ? responses.find((response) => response.id === selectedId) : null;
  const invalidTarget = Boolean(selectedId && (!selected || selected.deleted));
  // 알림 대상의 조상 답글만 처음 펼치며 사용자의 후속 펼침 선택을 우선한다.
  const notificationReplies: Record<string, number> = {};
  let notificationParent = responses.find(item => item.id === initialFocusId)?.parentId;
  while (notificationParent && !notificationReplies[notificationParent]) {
    notificationReplies[notificationParent] = Number.MAX_SAFE_INTEGER;
    notificationParent = responses.find(item => item.id === notificationParent)?.parentId;
  }
  const rows = responseRows(responses, sort, store?.userId ?? null, { ...notificationReplies, ...visibleReplies });
  const responseList = useRef<FlatList<ReturnType<typeof responseRows>[number]>>(null);
  const focusIndex = rows.findIndex(row => row.id === initialFocusId);
  const scrolledToFocus = useRef(false);
  function requireLogin(): void {
    auth.store.openLogin({
      kind: 'response',
      targetKind: target.kind,
      targetId: target.id,
    });
  }
  function resetComposer(): void {
    generation.current += 1;
    setComposer({ mode: 'create', parentId: null });
    setDraft('');
    setQuote(undefined);
    setError(null);
    attempt.current = null;
    Keyboard.dismiss();
  }
  function edit(response: ReaderResponse): void {
    generation.current += 1;
    setComposer({ mode: 'edit', id: response.id });
    setDraft(response.body);
    setQuote(response.quote);
    setError(null);
    attempt.current = null;
    input.current?.focus();
  }
  function reply(response: ReaderResponse): void {
    if (!store?.userId) {
      requireLogin();
      return;
    }
    generation.current += 1;
    setComposer({ mode: 'create', parentId: response.id });
    setDraft('');
    setQuote(undefined);
    setError(null);
    attempt.current = null;
    input.current?.focus();
  }
  async function submit(): Promise<void> {
    if (!store?.userId) {
      requireLogin();
      return;
    }
    if (submitting.current || !draft.trim() || invalidTarget || closed) return;
    const generationAtStart = generation.current;
    const repliesAtStart = repliesIntent.current;
    const fingerprint = JSON.stringify([composer, draft, quote]);
    const operationId =
      attempt.current?.fingerprint === fingerprint ? attempt.current.operationId : newResponseOperation();
    attempt.current = { fingerprint, operationId };
    const action: ResponseAction =
      composer.mode === 'edit'
        ? { kind: 'edit', id: composer.id, body: draft }
        : {
            kind: 'create',
            id: `response-${operationId}`,
            parentId: composer.parentId,
            body: draft,
            authorName: profile.state.profile?.name ?? auth.state.user?.name ?? 'Reader',
            ...(quote ? { quote } : {}),
          };
    submitting.current = true;
    setPending(true);
    setError(null);
    const result = await store.execute(target, operationId, action);
    submitting.current = false;
    if (!mounted.current) return;
    setPending(false);
    if (generationAtStart !== generation.current) return;
    if (!result.ok) {
      setError(result);
      return;
    }
    if (composer.mode === 'create' && composer.parentId && repliesAtStart === repliesIntent.current)
      setVisibleReplies((current) => ({
        ...current,
        [composer.parentId ?? '']: Number.MAX_SAFE_INTEGER,
      }));
    setAnnouncement(composer.mode === 'edit' ? 'Response updated' : 'Response published');
    resetComposer();
  }
  async function remove(): Promise<void> {
    if (!store || !deleteTarget || submitting.current) return;
    const generationAtStart = generation.current;
    const fingerprint = `delete:${deleteTarget.id}`;
    const operationId =
      attempt.current?.fingerprint === fingerprint ? attempt.current.operationId : newResponseOperation();
    attempt.current = { fingerprint, operationId };
    submitting.current = true;
    setPending(true);
    setError(null);
    const result = await store.execute(target, operationId, {
      kind: 'delete',
      id: deleteTarget.id,
    });
    submitting.current = false;
    if (!mounted.current) return;
    setPending(false);
    if (generationAtStart !== generation.current) return;
    if (!result.ok) {
      setError(result);
      return;
    }
    setDeleteTarget(null);
    setAnnouncement('Successfully deleted response');
    if (selectedId === deleteTarget.id) resetComposer();
  }
  return (
    <Modal
      transparent
      animationType="slide"
      accessibilityLabel="Responses 패널"
      onRequestClose={policy ? () => setPolicy(false) : onClose}
    >
      <SafeAreaView
        style={styles.backdrop}
        edges={['top', 'bottom', 'left', 'right']}
        accessibilityViewIsModal
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
          <View style={styles.sheet}>
            <View style={styles.header}>
              <IconButton
                icon={policy ? 'back' : 'close'}
                size={18}
                label={policy ? 'Responses로 돌아가기' : 'Responses 닫기'}
                onPress={policy ? () => setPolicy(false) : onClose}
              />
              <Text role="heading" style={styles.heading}>
                {policy ? 'Medium Policy' : `Responses (${state?.value ? count : '—'})`}
              </Text>
              <IconButton icon="shield" size={16} label="Medium policy" onPress={() => setPolicy(true)} />
            </View>
            {policy && (
              <ScrollView contentContainerStyle={styles.policy}>
                <Text role="heading" style={styles.policyTitle}>
                  Medium Rules
                </Text>
                <Text style={styles.secondary}>11 min read · May 26, 2021</Text>
                <Text style={styles.policyBody}>
                  Medium is an open platform that exists to share ideas and perspectives from the world’s most
                  insightful writers, thinkers, and storytellers.
                </Text>
                <Text style={styles.policyBody}>
                  We welcome thoughtful and civil discussion from a broad spectrum of viewpoints. To maintain
                  a safe, respectful, and welcoming environment for a wide range of people to engage in
                  meaningful conversations, we prohibit certain conduct.
                </Text>
                <Text style={styles.secondary}>This is an excerpt. The current rules may have changed.</Text>
                <Pressable
                  role="link"
                  accessibilityLabel="현재 Medium Rules 열기"
                  style={styles.action}
                  onPress={() => {
                    void Linking.openURL('https://policy.medium.com/medium-rules-30e5502c4eb4').catch(() =>
                      setPolicyError(true),
                    );
                  }}
                >
                  <Text style={styles.green}>Read the current Medium Rules</Text>
                </Pressable>
                {policyError && (
                  <Text role="alert" style={styles.error}>
                    링크를 열지 못했어요. 다시 눌러 주세요.
                  </Text>
                )}
              </ScrollView>
            )}
            <View
              style={[styles.flex, policy && styles.hidden]}
              accessibilityElementsHidden={policy}
              importantForAccessibility={policy ? 'no-hide-descendants' : 'auto'}
            >
              {announcement ? (
                <Text pointerEvents="none" aria-live="polite" style={styles.announcement}>
                  {announcement}
                </Text>
              ) : null}
              {state?.status === 'loading' && (
                <Text role="status" style={styles.status}>
                  Loading responses…
                </Text>
              )}
              {(!store || state?.readError) && (
                <View style={styles.status}>
                  <Text role="alert" style={styles.error}>
                    댓글을 불러오지 못했어요.
                  </Text>
                  <Pressable
                    role="button"
                    accessibilityLabel="댓글 조회 다시 시도"
                    style={styles.action}
                    onPress={() => {
                      void store?.refresh(target);
                    }}
                  >
                    <Text style={styles.green}>Retry</Text>
                  </Pressable>
                </View>
              )}
              {store && state?.value && (
                <FlatList
                  ref={responseList}
                  data={rows}
                  onContentSizeChange={() => {
                    if (focusIndex >= 0 && !scrolledToFocus.current) {
                      scrolledToFocus.current = true;
                      responseList.current?.scrollToIndex({ index: focusIndex, animated: false });
                    }
                  }}
                  onScrollToIndexFailed={({ averageItemLength, index }) => {
                    responseList.current?.scrollToOffset({ offset: averageItemLength * index, animated: false });
                  }}
                  keyExtractor={(row) => row.id}
                  style={styles.flex}
                  contentContainerStyle={styles.list}
                  keyboardShouldPersistTaps="handled"
                  initialNumToRender={8}
                  windowSize={7}
                  ListHeaderComponent={
                    <View>
                      {initialFocusId && <Text accessibilityLiveRegion="polite" style={styles.status}>
                        {responses.some(item => item.id === initialFocusId && !item.deleted) ? '알림의 응답을 표시하고 있어요.' : '알림의 응답이 삭제되었거나 더 이상 표시되지 않아요.'}
                      </Text>}
                      <ResponseManagement target={target} />
                      <View ref={sortAnchor} collapsable={false}>
                        <Pressable
                          role="button"
                          accessibilityLabel="응답 정렬 선택"
                          accessibilityState={{ expanded: sortOpen }}
                          style={styles.sortTarget}
                          onPress={() => {
                            setSortOpen(true);
                            sortAnchor.current?.measureInWindow((_x, y, _width, height) =>
                              setSortTop(y + height),
                            );
                          }}
                        >
                          <View style={styles.sort}>
                            <Text style={styles.text}>
                              {sort === 'relevant' ? 'Most Relevant' : 'Most Recent'}
                            </Text>
                            <View style={{ transform: [{ rotate: '90deg' }] }}>
                              <AppIcon name="chevron" size={16} />
                            </View>
                          </View>
                        </Pressable>
                      </View>
                      {sortOpen && (
                        <TopPopover
                          title="응답 정렬"
                          onClose={() => setSortOpen(false)}
                          width={250}
                          right={Math.max(24, (width - 250) / 2)}
                          top={Math.max(0, sortTop - insets.top)}
                          showPointer={false}
                        >
                          <View style={styles.sortOptions}>
                            {(['relevant', 'recent'] as const).map((value) => (
                              <Pressable
                                key={value}
                                role="radio"
                                accessibilityLabel={value === 'relevant' ? 'Most Relevant' : 'Most Recent'}
                                accessibilityState={{ checked: sort === value }}
                                aria-checked={sort === value}
                                style={styles.action}
                                onPress={() => {
                                  setSort(value);
                                  setSortOpen(false);
                                }}
                              >
                                <Text style={styles.menuText}>
                                  {sort === value ? '✓ ' : ''}
                                  {value === 'relevant' ? 'Most Relevant' : 'Most Recent'}
                                </Text>
                              </Pressable>
                            ))}
                          </View>
                        </TopPopover>
                      )}
                    </View>
                  }
                  ListEmptyComponent={<Text style={styles.status}>Be the first to respond.</Text>}
                  renderItem={({ item }) =>
                    item.kind === 'more' ? (
                      <Pressable
                        role="button"
                        accessibilityLabel={`See more replies, ${item.parentId}`}
                        style={[styles.action, { marginLeft: Math.min(item.depth, 3) * 20 }]}
                        onPress={() => {
                          repliesIntent.current += 1;
                          setVisibleReplies((current) => ({
                            ...current,
                            [item.parentId]: (current[item.parentId] ?? 1) + 5,
                          }));
                        }}
                      >
                        <Text style={styles.green}>See more replies ({item.remaining})</Text>
                      </Pressable>
                    ) : (
                      <ResponseCard
                        response={item.response}
                        target={target}
                        depth={item.depth}
                        childCount={item.childCount}
                        repliesVisible={(visibleReplies[item.id] ?? 1) > 0}
                        selected={selectedId === item.id || initialFocusId === item.id}
                        store={store}
                        displayName={profile.state.profile?.name}
                        onRequireLogin={requireLogin}
                        onReply={() => reply(item.response)}
                        onEdit={() => edit(item.response)}
                        onDelete={() => {
                          setDeleteTarget(item.response);
                          setError(null);
                          attempt.current = null;
                        }}
                        onToggleReplies={() => {
                          repliesIntent.current += 1;
                          setVisibleReplies((current) => ({
                            ...current,
                            [item.id]: (current[item.id] ?? 1) > 0 ? 0 : 1,
                          }));
                        }}
                      />
                    )
                  }
                />
              )}
              {!deleteTarget && (
                <View style={styles.composer}>
                  {selectedId && (
                    <View style={styles.composerHeader}>
                      <Text style={styles.secondary}>
                        {composer.mode === 'edit' ? 'Editing' : 'Replying to'}{' '}
                        {selected?.authorName ?? 'response'}
                      </Text>
                      <Pressable
                        role="button"
                        accessibilityLabel="응답 작성 취소"
                        style={styles.action}
                        onPress={resetComposer}
                      >
                        <Text style={styles.text}>Cancel</Text>
                      </Pressable>
                    </View>
                  )}
                  {quote && (
                    <View style={styles.composerHeader}>
                      <ResponseQuoteBlock text={quote.text} compact />
                      <IconButton
                        icon="close"
                        label="인용 제거"
                        onPress={() => {
                          generation.current += 1;
                          setQuote(undefined);
                        }}
                      />
                    </View>
                  )}
                  {invalidTarget && (
                    <Text role="alert" style={styles.error}>
                      대상 댓글이 삭제되었어요. 취소 후 새 응답을 작성해 주세요.
                    </Text>
                  )}
                  {error && !error.ok && (
                    <Text role="alert" style={styles.error}>
                      {error.error === 'removed'
                        ? '대상 댓글이 삭제되었어요.'
                        : '저장하지 못했어요. 입력을 유지했으니 다시 제출해 주세요.'}
                    </Text>
                  )}
                  {closed && (
                    <Text role="status" style={styles.secondary}>
                      This discussion is closed. Existing responses are kept.
                    </Text>
                  )}
                  {store?.userId ? (
                    <View style={styles.inputRow}>
                      {!draft && !quote && !selectedId && <ProfileAvatar userId={store.userId} size={32} />}
                      <TextInput
                        ref={input}
                        accessibilityLabel="응답 내용"
                        placeholder="What are your thoughts?"
                        placeholderTextColor={colors.secondaryText}
                        multiline
                        maxLength={RESPONSE_MAX_LENGTH}
                        editable={!closed}
                        value={draft}
                        onChangeText={(text) => {
                          generation.current += 1;
                          setDraft(text);
                          setError(null);
                        }}
                        style={styles.input}
                      />
                      <Pressable
                        role="button"
                        accessibilityLabel={composer.mode === 'edit' ? '응답 수정 저장' : '응답 게시'}
                        disabled={pending || closed || !draft.trim() || invalidTarget || !state?.value}
                        accessibilityState={{
                          disabled: pending || closed || !draft.trim() || invalidTarget || !state?.value,
                          busy: pending,
                        }}
                        style={styles.send}
                        onPress={() => {
                          void submit();
                        }}
                      >
                        <Text
                          style={[
                            styles.sendText,
                            (pending || closed || !draft.trim() || invalidTarget) && { opacity: 0.3 },
                          ]}
                        >
                          {pending ? '…' : '↑'}
                        </Text>
                      </Pressable>
                    </View>
                  ) : (
                    <Pressable
                      role="button"
                      accessibilityLabel="댓글 작성 로그인"
                      style={styles.action}
                      onPress={requireLogin}
                    >
                      <Text style={styles.secondary}>Sign in to respond</Text>
                    </Pressable>
                  )}
                </View>
              )}
              {deleteTarget && (
                <View accessibilityViewIsModal style={styles.confirmation}>
                  <Text role="heading" style={styles.heading}>
                    Delete response?
                  </Text>
                  <Text style={styles.text}>
                    Your reply will be removed. Other readers’ replies will remain.
                  </Text>
                  {error && !error.ok && (
                    <Text role="alert" style={styles.error}>
                      삭제하지 못했어요. 다시 시도해 주세요.
                    </Text>
                  )}
                  <Pressable
                    role="button"
                    accessibilityLabel="응답 삭제 확인"
                    disabled={pending}
                    accessibilityState={{ disabled: pending, busy: pending }}
                    style={styles.action}
                    onPress={() => {
                      void remove();
                    }}
                  >
                    <Text style={styles.error}>{pending ? 'Deleting…' : 'Delete response'}</Text>
                  </Pressable>
                  <Pressable
                    role="button"
                    accessibilityLabel="응답 삭제 취소"
                    disabled={pending}
                    accessibilityState={{ disabled: pending }}
                    style={styles.action}
                    onPress={() => {
                      setDeleteTarget(null);
                      setError(null);
                      attempt.current = null;
                    }}
                  >
                    <Text style={styles.text}>Cancel</Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    flex: { flex: 1 },
    hidden: { display: 'none' },
    backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', paddingTop: 10 },
    sheet: {
      flex: 1,
      width: '100%',
      maxWidth: 680,
      alignSelf: 'center',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      overflow: 'hidden',
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: 56,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
      paddingHorizontal: 4,
    },
    heading: {
      flex: 1,
      fontFamily: fonts.sans,
      fontSize: 16,
      lineHeight: 22,
      fontWeight: '600',
      textAlign: 'center',
      color: colors.text,
    },
    list: { paddingHorizontal: 24, paddingBottom: 16 },
    text: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      color: colors.text,
    },
    menuText: {
      fontFamily: fonts.sans,
      fontSize: 17,
      lineHeight: 22,
      color: colors.text,
    },
    secondary: {
      fontFamily: fonts.sans,
      fontSize: 13,
      lineHeight: 20,
      color: colors.secondaryText,
    },
    green: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      color: colors.green,
    },
    error: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      color: colors.destructive,
    },
    action: { minWidth: 48, minHeight: 48, justifyContent: 'center' },
    sortTarget: {
      minHeight: 48,
      justifyContent: 'center',
      marginTop: 12,
      marginBottom: 4,
    },
    sort: {
      minHeight: 40,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 24,
      paddingHorizontal: 18,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sortOptions: {
      alignSelf: 'flex-end',
      width: 250,
      maxWidth: '100%',
      backgroundColor: colors.popup,
      borderRadius: 14,
      paddingHorizontal: 16,
    },
    composer: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
      padding: 8,
    },
    composerHeader: {
      minHeight: 48,
      flexDirection: 'row',
      gap: 12,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 8,
    },
    inputRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-end' },
    input: {
      flex: 1,
      minHeight: 48,
      maxHeight: 150,
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      padding: 12,
      color: colors.text,
      backgroundColor: colors.input,
      borderRadius: 4,
      textAlignVertical: 'top',
    },
    send: {
      minWidth: 48,
      minHeight: 48,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendText: {
      color: colors.onAccent,
      backgroundColor: colors.text,
      borderRadius: 24,
      width: 38,
      height: 38,
      textAlign: 'center',
      fontSize: 28,
    },
    status: { padding: 24, color: colors.secondaryText },
    announcement: {
      position: 'absolute',
      top: 16,
      right: 16,
      left: 64,
      zIndex: 20,
      padding: 16,
      backgroundColor: colors.text,
      color: colors.background,
    },
    confirmation: {
      padding: 24,
      gap: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    policy: { padding: 24, gap: 24 },
    policyTitle: {
      fontFamily: fonts.sans,
      fontSize: 32,
      lineHeight: 38,
      fontWeight: '700',
      color: colors.text,
    },
    policyBody: {
      fontFamily: fonts.serif,
      fontSize: 20,
      lineHeight: 30,
      color: colors.text,
    },
  });
