import { AccessibleModal as Modal } from '../../shared/ui/AccessibleModal';
import { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { IconButton } from '../../shared/ui/IconButton';
import { useResponses } from './ResponseProvider';
import { newResponseOperation, type ResponseAction, type ResponseTarget } from './types';

export function ResponseManagement({ target, responseId }: { target: ResponseTarget; responseId?: string }) {
  const { state, store, scope } = useResponses(target);
  return (
    <ScopedManagement
      key={`${scope}:${responseId ?? 'all'}`}
      target={target}
      responseId={responseId}
      allowed={Boolean(store?.userId && state?.value?.ownerId === store.userId)}
    />
  );
}
function ScopedManagement({
  target,
  responseId,
  allowed,
}: {
  target: ResponseTarget;
  responseId?: string;
  allowed: boolean;
}) {
  const { state, store } = useResponses(target);
  const styles = useThemeStyles(createStyles);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<ResponseAction | null>(null);
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [showHidden, setShowHidden] = useState(false);
  const controller = useRef<AbortController | null>(null);
  const busy = useRef(false);
  const attempt = useRef<{ fingerprint: string; id: string } | null>(null);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      controller.current?.abort();
    };
  }, []);
  if (!allowed) return null;
  const discussion = state?.value?.discussion ?? 'open';
  const label =
    action?.kind === 'hide'
      ? action.hidden
        ? 'Hide response'
        : 'Show response'
      : action?.kind === 'discussion'
        ? action.value === 'open'
          ? 'Open discussion'
          : action.value === 'hidden'
            ? 'Hide all responses'
            : 'Close discussion'
        : '';
  function close() {
    controller.current?.abort();
    setOpen(false);
    setAction(null);
    setFailed(false);
  }
  async function confirm() {
    if (!action || !store || busy.current) return;
    const fingerprint = JSON.stringify(action);
    const operation =
      attempt.current?.fingerprint === fingerprint ? attempt.current.id : newResponseOperation();
    attempt.current = { fingerprint, id: operation };
    controller.current = new AbortController();
    busy.current = true;
    setPending(true);
    setFailed(false);
    const result = await store.execute(target, operation, action, controller.current.signal);
    busy.current = false;
    if (!mounted.current || controller.current.signal.aborted) return;
    setPending(false);
    if (result.ok) {
      setAction(null);
      if (responseId) setOpen(false);
    } else setFailed(true);
  }
  return (
    <>
      <Pressable
        role="button"
        accessibilityLabel={responseId ? `Hide response, ${responseId}` : 'Manage responses'}
        style={styles.row}
        onPress={() => {
          setOpen(true);
          setPending(false);
          setFailed(false);
          setAction(responseId ? { kind: 'hide', id: responseId, hidden: true } : null);
        }}
      >
        <Text style={styles.text}>{responseId ? 'Hide response' : 'Manage responses'}</Text>
      </Pressable>
      {open && (
        <Modal
          transparent
          animationType="slide"
          accessibilityLabel="Response management"
          onRequestClose={close}
        >
          <SafeAreaView
            edges={['top', 'bottom', 'left', 'right']}
            style={styles.backdrop}
            accessibilityViewIsModal
          >
            <View style={styles.sheet}>
              <View style={styles.header}>
                <IconButton icon="close" label="Close response management" onPress={close} />
                <Text role="heading" style={styles.title}>
                  Manage responses
                </Text>
              </View>
              {action ? (
                <View style={styles.content}>
                  <Text role="heading" style={styles.title}>
                    {label}?
                  </Text>
                  <Text style={styles.text}>
                    {action.kind === 'hide'
                      ? 'The response is kept and can be shown again. Its replies follow its visibility.'
                      : action.kind === 'discussion' && action.value === 'hidden'
                        ? 'Existing responses will be hidden and new responses cannot be added or edited.'
                        : 'Existing responses stay saved. Closing prevents new responses and edits.'}
                  </Text>
                  {failed && (
                    <Text role="alert" style={styles.error}>
                      Couldn’t save. Try again.
                    </Text>
                  )}
                  <Pressable
                    role="button"
                    accessibilityLabel={`Confirm ${label}`}
                    disabled={pending}
                    accessibilityState={{ disabled: pending, busy: pending }}
                    style={styles.row}
                    onPress={() => {
                      void confirm();
                    }}
                  >
                    <Text style={styles.error}>{pending ? 'Saving…' : label}</Text>
                  </Pressable>
                  <Pressable
                    role="button"
                    accessibilityLabel="Cancel response management change"
                    style={styles.row}
                    onPress={() => {
                      controller.current?.abort();
                      setAction(null);
                      setPending(false);
                      setFailed(false);
                    }}
                  >
                    <Text style={styles.text}>Cancel</Text>
                  </Pressable>
                </View>
              ) : (
                <>
                  <View style={styles.content}>
                    <Text style={styles.secondary}>Discussion: {discussion}</Text>
                    <Pressable
                      role="button"
                      accessibilityLabel={discussion === 'open' ? 'Close discussion' : 'Open discussion'}
                      style={styles.row}
                      onPress={() =>
                        setAction({
                          kind: 'discussion',
                          id: 'discussion',
                          value: discussion === 'open' ? 'closed' : 'open',
                        })
                      }
                    >
                      <Text style={styles.text}>
                        {discussion === 'open' ? 'Close discussion' : 'Open discussion'}
                      </Text>
                    </Pressable>
                    <Pressable
                      role="button"
                      accessibilityLabel="Hide all responses"
                      style={styles.row}
                      onPress={() =>
                        setAction({
                          kind: 'discussion',
                          id: 'discussion',
                          value: 'hidden',
                        })
                      }
                    >
                      <Text style={styles.error}>Hide all responses</Text>
                    </Pressable>
                    <Pressable
                      role="button"
                      accessibilityLabel="Hidden responses"
                      accessibilityState={{ expanded: showHidden }}
                      style={styles.row}
                      onPress={() => setShowHidden((value) => !value)}
                    >
                      <Text style={styles.text}>Hidden responses</Text>
                    </Pressable>
                  </View>
                  {showHidden && (
                    <FlatList
                      data={state?.value?.responses.filter((item) => item.hidden && !item.deleted) ?? []}
                      keyExtractor={(item) => item.id}
                      style={styles.list}
                      ListEmptyComponent={<Text style={styles.content}>No hidden responses</Text>}
                      renderItem={({ item }) => (
                        <View style={styles.content}>
                          <Text style={styles.text}>{item.authorName}</Text>
                          <Text style={styles.secondary}>{item.body}</Text>
                          <Pressable
                            role="button"
                            accessibilityLabel={`Show response, ${item.id}`}
                            style={styles.row}
                            onPress={() =>
                              setAction({
                                kind: 'hide',
                                id: item.id,
                                hidden: false,
                              })
                            }
                          >
                            <Text style={styles.text}>Show response</Text>
                          </Pressable>
                        </View>
                      )}
                    />
                  )}
                </>
              )}
            </View>
          </SafeAreaView>
        </Modal>
      )}
    </>
  );
}
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    sheet: {
      maxHeight: '90%',
      minHeight: 300,
      backgroundColor: colors.background,
      borderTopLeftRadius: 14,
      borderTopRightRadius: 14,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },
    title: {
      fontFamily: fonts.sans,
      fontSize: 20,
      lineHeight: 26,
      fontWeight: '600',
      color: colors.text,
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
      lineHeight: 20,
      color: colors.secondaryText,
    },
    row: {
      minHeight: 48,
      minWidth: 48,
      paddingVertical: 10,
      justifyContent: 'center',
    },
    content: { padding: 24, gap: 12 },
    list: { flexGrow: 0, flexShrink: 1 },
    error: {
      fontFamily: fonts.sans,
      fontSize: 16,
      lineHeight: 24,
      color: colors.destructive,
    },
  });
