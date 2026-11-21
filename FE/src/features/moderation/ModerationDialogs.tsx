import { AccessibleModal as Modal } from '../../shared/ui/AccessibleModal';
import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme, useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { IconButton } from '../../shared/ui/IconButton';
import { AppIcon } from '../../shared/ui/AppIcon';
import { restoreModalFocus } from '../../shared/ui/restoreModalFocus';
import { publicIdentity } from '../community/data/publicDirectory';
import { mockUsers } from '../auth/data/mockUsers';
import { responseFixtures } from '../responses/data/responseFixtures';
import { SafeWebsiteLink } from '../community/SafeWebsiteLink';
import { SharePanel } from '../sharing/ShareSheet';
import { useModeration, type ModerationEntry } from './ModerationContext';
import {
  moderationKey,
  moderationOperation,
  reportReasons,
  type ModerationAction,
  type ReportReason,
} from './types';

function blockedName(writerId: string): string {
  return (
    publicIdentity({ kind: 'writer', id: writerId })?.name ??
    mockUsers.find((user) => user.id === writerId)?.name ??
    responseFixtures({ kind: 'article', id: 'medium-brain' }).find(
      (response) => response.authorId === writerId,
    )?.authorName ??
    'Blocked author'
  );
}

export function ModerationDialogs({
  entry,
  onClose,
  onSuccess,
}: {
  entry: ModerationEntry;
  onClose: () => void;
  onSuccess: (message: string) => void;
}) {
  const { state, store, open } = useModeration();
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  const [reason, setReason] = useState<ReportReason | null>(null);
  const [details, setDetails] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [alsoBlock, setAlsoBlock] = useState(false);
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const controller = useRef<AbortController | null>(null);
  const mounted = useRef(true);
  const attempt = useRef<{ fingerprint: string; id: string } | null>(null);
  const busy = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      controller.current?.abort();
      requestAnimationFrame(restoreModalFocus);
    };
  }, []);
  function close() {
    controller.current?.abort();
    if (entry.kind === 'confirm' && entry.returnTo === 'blocked') open({ kind: 'blocked' });
    else onClose();
  }
  async function submit(action: ModerationAction, message: string) {
    if (!store || busy.current || !state?.value) return;
    const fingerprint = JSON.stringify(action);
    const operationId =
      attempt.current?.fingerprint === fingerprint ? attempt.current.id : moderationOperation();
    attempt.current = { fingerprint, id: operationId };
    controller.current = new AbortController();
    busy.current = true;
    setPending(true);
    setFailed(false);
    const result = await store.execute({ operationId, action }, controller.current.signal);
    busy.current = false;
    if (!mounted.current || controller.current.signal.aborted) return;
    setPending(false);
    if (result.ok) onSuccess(message);
    else if (result.error !== 'cancelled') setFailed(true);
  }
  function authorAction(kind: 'mute' | 'block') {
    if (entry.kind !== 'author') return;
    const active =
      kind === 'mute'
        ? !(state?.value?.muted.some((item) => moderationKey(item) === moderationKey(entry.target)) ?? false)
        : !(state?.value?.blocked.includes(entry.target.id) ?? false);
    const noun = entry.target.kind === 'writer' ? 'author' : 'publication';
    const label = `${active ? (kind === 'mute' ? 'Mute' : 'Block') : kind === 'mute' ? 'Unmute' : 'Unblock'} ${noun}`;
    open({
      kind: 'confirm',
      title: label,
      description:
        kind === 'mute'
          ? `${entry.name}${active ? ' will be removed from your recommendations. Following and saved stories stay unchanged.' : ' can appear in your recommendations again.'}`
          : `${entry.name}${active ? '’s stories and follow actions will be unavailable to you. Your saved data stays intact.' : '’s stories will be available again.'}`,
      action:
        kind === 'mute'
          ? { kind, target: entry.target, active }
          : { kind, writerId: entry.target.id, active },
      success: `${noun === 'author' ? 'Author' : 'Publication'} ${active ? (kind === 'mute' ? 'muted' : 'blocked') : kind === 'mute' ? 'unmuted' : 'unblocked'}`,
    });
  }
  const author = entry.kind === 'author' ? entry : null;
  const noun = author?.target.kind === 'publication' ? 'publication' : 'author';
  const muted =
    author && state?.value?.muted.some((item) => moderationKey(item) === moderationKey(author.target));
  const blocked = author && state?.value?.blocked.includes(author.target.id);
  const title =
    entry.kind === 'report'
      ? `Report ${entry.target.kind === 'writer' ? 'user' : entry.target.kind === 'article' ? 'story' : entry.target.kind}`
      : entry.kind === 'confirm'
        ? entry.title
        : entry.kind === 'share'
          ? 'Share author'
          : entry.kind === 'blocked'
            ? 'Blocked users'
            : `${author?.name} options`;
  const errorContent = (
    <>
      {state?.status === 'loading' && (
        <Text role="status" style={styles.secondary}>
          Loading preferences…
        </Text>
      )}
      {state?.readError && (
        <Pressable
          role="button"
          accessibilityLabel="Retry moderation preferences"
          style={styles.row}
          onPress={() => {
            void store?.reload();
          }}
        >
          <Text role="alert" style={styles.error}>
            Couldn’t load preferences. Retry
          </Text>
        </Pressable>
      )}
      {failed && (
        <Text role="alert" style={styles.error}>
          Couldn’t save. Your selection is kept. Try again.
        </Text>
      )}
    </>
  );
  return (
    <Modal transparent animationType="fade" accessibilityLabel={title} onRequestClose={close}>
      <SafeAreaView
        edges={['top', 'bottom', 'left', 'right']}
        style={styles.backdrop}
        accessibilityViewIsModal
      >
        {entry.kind === 'blocked' ? (
          <View style={[styles.confirm, { height: '70%' }]}>
            <View style={styles.header}>
              <Text role="heading" style={styles.heading}>
                Blocked users
              </Text>
              <IconButton icon="close" label="Close blocked users" onPress={close} />
            </View>
            {errorContent}
            <FlatList
              data={state?.value?.blocked ?? []}
              keyExtractor={(id) => id}
              ListEmptyComponent={
                state?.value ? <Text style={styles.secondary}>No blocked users</Text> : null
              }
              renderItem={({ item }) => (
                <View style={styles.blockedRow}>
                  <Text style={[styles.text, { flex: 1 }]}>{blockedName(item)}</Text>
                  <Pressable
                    role="button"
                    accessibilityLabel={`Unblock ${blockedName(item)}`}
                    style={styles.row}
                    onPress={() =>
                      open({
                        kind: 'confirm',
                        title: 'Unblock author',
                        description: 'Allow this author’s stories and follow actions again?',
                        action: { kind: 'block', writerId: item, active: false },
                        success: 'Author unblocked',
                        returnTo: 'blocked',
                      })
                    }
                  >
                    <Text style={styles.blue}>Unblock</Text>
                  </Pressable>
                </View>
              )}
            />
          </View>
        ) : author ? (
          <View style={styles.bottom}>
            <View style={styles.menu}>
              <Pressable
                role="button"
                style={styles.authorRow}
                onPress={() => { if (entry.kind === 'author') open({ kind: 'share', name: author.name, target: entry.target }); }}
              >
                <Text style={styles.blue}>Share {noun}</Text>
              </Pressable>
              <Pressable role="button" style={styles.authorRow} onPress={() => authorAction('mute')}>
                <Text style={styles.blue}>
                  {muted ? 'Unmute' : 'Mute'} {noun}
                </Text>
              </Pressable>
              {author.target.kind === 'writer' && (
                <Pressable role="button" style={styles.authorRow} onPress={() => authorAction('block')}>
                  <Text style={styles.red}>{blocked ? 'Unblock' : 'Block'} author</Text>
                </Pressable>
              )}
              {author.target.kind === 'writer' && (
                <Pressable
                  role="button"
                  style={styles.authorRow}
                  onPress={() =>
                    open({
                      kind: 'report',
                      target: {
                        kind: 'writer',
                        id: author.target.id,
                        writerId: author.target.id,
                      },
                      title: author.name,
                    })
                  }
                >
                  <Text style={styles.red}>Report author</Text>
                </Pressable>
              )}
            </View>
            <Pressable
              role="button"
              accessibilityLabel="Cancel author options"
              style={[styles.authorRow, styles.menu]}
              onPress={close}
            >
              <Text style={styles.blue}>Cancel</Text>
            </Pressable>
          </View>
        ) : entry.kind === 'report' ? (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.reportFrame}
          >
            <View style={styles.report}>
              <View style={styles.header}>
                <IconButton icon="close" label="Cancel report" onPress={close} />
                <Text role="heading" style={styles.heading}>
                  {title}
                </Text>
                <View style={styles.headerSpacer} />
              </View>
              <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.form}>
                {reportReasons.map((item) => (
                  <Pressable
                    key={item}
                    role="radio"
                    accessibilityLabel={item}
                    aria-checked={reason === item}
                    accessibilityState={{
                      checked: reason === item,
                      disabled: pending,
                    }}
                    disabled={pending}
                    style={styles.option}
                    onPress={() => {
                      setReason(item);
                      setFailed(false);
                    }}
                  >
                    <View style={styles.radio}>{reason === item && <View style={styles.dot} />}</View>
                    <Text style={styles.text}>{item}</Text>
                  </Pressable>
                ))}
                {entry.target.writerId && (
                  <Pressable
                    role="checkbox"
                    accessibilityLabel="Also block this user"
                    aria-checked={alsoBlock}
                    accessibilityState={{
                      checked: alsoBlock,
                      disabled: pending,
                    }}
                    disabled={pending}
                    style={[styles.option, styles.block]}
                    onPress={() => setAlsoBlock((value) => !value)}
                  >
                    <View style={styles.checkbox}>{alsoBlock && <AppIcon name="check" size={16} />}</View>
                    <Text style={styles.text}>Also block this user</Text>
                  </Pressable>
                )}
                <View style={styles.links}>
                  <SafeWebsiteLink
                    url="https://help.medium.com/hc/en-us/articles/21310355607831-Reporting-Other-Issues"
                    label="Report copyright, trademark, or other violations"
                    text="Report copyright, trademark, or other violations"
                    textStyle={styles.text}
                    style={{ minHeight: 72 }}
                    chevron
                  />
                  <SafeWebsiteLink
                    url="https://policy.medium.com/medium-rules-30e5502c4eb4"
                    label="Read our rules"
                    text="Read our rules"
                    textStyle={styles.text}
                    chevron
                  />
                  <Text style={styles.secondary}>
                    To maintain a safe, respectful, and welcoming environment for a wide range of people to
                    engage in meaningful conversations, we prohibit certain conduct.
                  </Text>
                </View>
                <Pressable
                  role="button"
                  accessibilityLabel="Additional report details"
                  style={styles.detailButton}
                  onPress={() => setDetailsOpen((value) => !value)}
                >
                  <Text style={styles.secondary}>
                    {detailsOpen ? 'Hide details' : 'Add details (optional)'}
                  </Text>
                </Pressable>
                {detailsOpen && (
                  <TextInput
                    accessibilityLabel="Report details"
                    value={details}
                    onChangeText={setDetails}
                    editable={!pending}
                    multiline
                    maxLength={2000}
                    placeholder="Additional details"
                    placeholderTextColor={colors.secondaryText}
                    style={styles.input}
                  />
                )}
                <Text style={styles.secondary}>Demo only. No report is sent to Medium.</Text>
                {errorContent}
              </ScrollView>
              <View style={styles.submitFrame}>
                <Pressable
                  role="button"
                  accessibilityLabel="Submit report"
                  disabled={!reason || pending || !state?.value}
                  accessibilityState={{
                    disabled: !reason || pending || !state?.value,
                    busy: pending,
                  }}
                  style={[styles.submit, (!reason || pending || !state?.value) && styles.disabled]}
                  onPress={() => {
                    if (reason)
                      void submit(
                        {
                          kind: 'report',
                          target: entry.target,
                          reason,
                          details,
                          alsoBlock,
                        },
                        `Successfully reported ${entry.target.kind === 'writer' ? 'user' : entry.target.kind === 'article' ? 'story' : entry.target.kind}.`,
                      );
                  }}
                >
                  <View style={styles.submitSurface}>
                    <Text style={styles.submitText}>{pending ? 'Reporting…' : 'Report'}</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        ) : entry.kind === 'confirm' ? (
          <View style={styles.confirm}>
            <Text role="heading" style={styles.confirmTitle}>
              {entry.title}?
            </Text>
            <Text style={styles.text}>{entry.description}</Text>
            {errorContent}
            <Pressable
              role="button"
              accessibilityLabel={`Confirm ${entry.title}`}
              disabled={pending || !state?.value}
              accessibilityState={{
                disabled: pending || !state?.value,
                busy: pending,
              }}
              style={styles.row}
              onPress={() => {
                void submit(entry.action, entry.success);
              }}
            >
              <Text style={styles.red}>{pending ? 'Saving…' : entry.title}</Text>
            </Pressable>
            <Pressable
              role="button"
              accessibilityLabel="Cancel moderation change"
              style={styles.row}
              onPress={close}
            >
              <Text style={styles.blue}>Cancel</Text>
            </Pressable>
          </View>
        ) : (
          <SharePanel target={{ kind: entry.target.kind, id: entry.target.id, title: entry.name,
            subtitle: publicIdentity(entry.target)?.bio ?? '', authorName: entry.name,
            authorId: entry.target.kind === 'writer' ? entry.target.id : undefined,
            avatar: publicIdentity(entry.target)?.avatar, visibility: 'public' }} onClose={close} />
        )}
      </SafeAreaView>
    </Modal>
  );
}
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.2)',
      justifyContent: 'center',
    },
    text: {
      fontFamily: fonts.sans,
      fontSize: 16,
      lineHeight: 24,
      color: colors.text,
    },
    secondary: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 18,
      color: colors.secondaryText,
    },
    blue: {
      fontFamily: fonts.sans,
      fontSize: 20,
      lineHeight: 26,
      color: '#007aff',
    },
    red: {
      fontFamily: fonts.sans,
      fontSize: 20,
      lineHeight: 26,
      color: colors.destructive,
    },
    blockedRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },
    bottom: { marginTop: 'auto', margin: 8, marginBottom: 0, gap: 8 },
    menu: {
      borderRadius: 14,
      backgroundColor: colors.surface,
      overflow: 'hidden',
    },
    authorRow: {
      minHeight: 57,
      padding: 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },
    confirm: {
      margin: 24,
      padding: 24,
      borderRadius: 14,
      backgroundColor: colors.popup,
      gap: 16,
      maxHeight: '90%',
    },
    confirmTitle: {
      fontFamily: fonts.sans,
      fontSize: 22,
      lineHeight: 28,
      fontWeight: '600',
      color: colors.text,
    },
    row: {
      minHeight: 48,
      minWidth: 48,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    reportFrame: { flex: 1, marginTop: 10 },
    report: {
      flex: 1,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      backgroundColor: colors.background,
      overflow: 'hidden',
    },
    header: { flexDirection: 'row', alignItems: 'center', minHeight: 56 },
    headerSpacer: { width: 48 },
    heading: {
      fontFamily: fonts.sans,
      fontSize: 16,
      lineHeight: 22,
      color: colors.text,
      fontWeight: '600',
      textAlign: 'center',
      flex: 1,
    },
    form: { paddingHorizontal: 24, paddingTop: 10, paddingBottom: 16 },
    option: {
      minHeight: 50,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 19,
      paddingLeft: 3,
    },
    radio: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.text,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: colors.text,
    },
    checkbox: {
      width: 19,
      height: 19,
      borderRadius: 2,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.text,
      alignItems: 'center',
      justifyContent: 'center',
    },
    block: { marginTop: 14 },
    detailButton: { minHeight: 48, justifyContent: 'center' },
    input: {
      minHeight: 90,
      maxHeight: 180,
      padding: 12,
      color: colors.text,
      backgroundColor: colors.input,
      fontSize: 16,
      textAlignVertical: 'top',
    },
    links: {
      gap: 8,
      paddingTop: 16,
      marginTop: 24,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },
    submitFrame: {
      paddingHorizontal: 24,
      paddingBottom: 21,
      paddingTop: 21,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },
    submit: { minHeight: 48, justifyContent: 'center', alignItems: 'center' },
    submitSurface: {
      minHeight: 42,
      borderRadius: 24,
      width: '100%',
      backgroundColor: colors.destructive,
      justifyContent: 'center',
      alignItems: 'center',
    },
    submitText: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      color: colors.onAccent,
    },
    disabled: { opacity: 0.4 },
    error: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      color: colors.destructive,
    },
    success: {
      margin: 24,
      padding: 24,
      borderRadius: 10,
      backgroundColor: colors.popup,
      gap: 16,
    },
  });
