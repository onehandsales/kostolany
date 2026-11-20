import { useEffect, useRef, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ResponseManagement } from './ResponseManagement';
import { useModeration } from '../moderation/ModerationContext';
import { useTheme, useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';
import { IconButton } from '../../shared/ui/IconButton';
import { TopPopover } from '../../shared/ui/TopPopover';
import { formatReactionCount } from '../feed/data/mediumFixtures';
import { ResponseQuoteBlock } from './ResponseQuoteBlock';
import { responseAvatar } from './data/responseFixtures';
import { newResponseOperation, type ReaderResponse, type ResponseResult, type ResponseTarget } from './types';
import type { ResponseStore } from './createResponseStore';

export function ResponseCard({
  response,
  target,
  depth = 0,
  childCount,
  repliesVisible,
  selected,
  store,
  onReply,
  onEdit,
  onDelete,
  onToggleReplies,
  onRequireLogin,
  displayName,
}: {
  response: ReaderResponse;
  target: ResponseTarget;
  depth?: number;
  childCount: number;
  repliesVisible: boolean;
  selected?: boolean;
  store: ResponseStore;
  displayName?: string;
  onReply: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleReplies: () => void;
  onRequireLogin: () => void;
}) {
  const moderation = useModeration();
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [menu, setMenu] = useState(false);
  const [menuTop, setMenuTop] = useState(160);
  const menuAnchor = useRef<View>(null);
  const insets = useSafeAreaInsets();
  const [reactionError, setReactionError] = useState<ResponseResult | null>(null);
  const [pending, setPending] = useState(false);
  const request = useRef(0);
  const mounted = useRef(true);
  const attempt = useRef<{ id: string; active: boolean } | null>(null);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const own = response.authorId === store.userId;
  const avatar = responseAvatar(response.authorId);
  const name = own ? (displayName ?? response.authorName) : response.authorName;
  const excerptOnly = response.body.endsWith('…');
  async function react(retry = false): Promise<void> {
    if (!store.userId) {
      onRequireLogin();
      return;
    }
    if (pending) return;
    const current =
      retry && attempt.current
        ? attempt.current
        : { id: newResponseOperation(), active: !response.applauded };
    attempt.current = current;
    const version = ++request.current;
    setPending(true);
    setReactionError(null);
    const result = await store.execute(target, current.id, {
      kind: 'react',
      id: response.id,
      active: current.active,
    });
    if (!mounted.current || version !== request.current) return;
    setPending(false);
    setReactionError(result.ok ? null : result);
  }
  return (
    <View
      style={[
        styles.card,
        {
          marginLeft: Math.max(0, Math.min(depth, 3) - 1) * 20,
          borderBottomWidth: depth === 0 && childCount === 0 ? StyleSheet.hairlineWidth : 0,
        },
        depth > 0 && styles.child,
        selected && styles.selected,
      ]}
    >
      <View style={styles.byline}>
        {avatar ? (
          <Image source={avatar} style={styles.avatar} accessible={false} />
        ) : (
          <View style={styles.avatar} />
        )}
        <View style={styles.flex}>
          <Text style={styles.name}>
            {name}
            {own ? '  YOU' : ''}
          </Text>
          <Text style={styles.date}>
            {response.updatedAt
              ? `${response.dateLabel ?? 'Just now'} (edited)`
              : (response.dateLabel ?? 'Just now')}
          </Text>
        </View>
        {!response.deleted && (
          <View ref={menuAnchor} collapsable={false}>
            <IconButton
              icon="more"
              label={`${name} response options`}
              onPress={() => {
                setMenu(true);
                menuAnchor.current?.measureInWindow((_x, y, _width, height) => setMenuTop(y + height));
              }}
            />
          </View>
        )}
      </View>
      {menu && (
        <TopPopover
          title="응답 메뉴"
          onClose={() => setMenu(false)}
          top={Math.max(0, menuTop - insets.top)}
          right={8}
          width={250}
          showPointer={false}
        >
          <View style={styles.menu}>
            {own ? (
              <>
                <Pressable
                  role="button"
                  accessibilityLabel={`Edit response, ${response.id}`}
                  style={styles.menuAction}
                  onPress={() => {
                    setMenu(false);
                    onEdit();
                  }}
                >
                  <Text style={styles.menuText}>Edit response</Text>
                </Pressable>
                <Pressable
                  role="button"
                  accessibilityLabel={`Delete response, ${response.id}`}
                  style={styles.menuAction}
                  onPress={() => {
                    setMenu(false);
                    onDelete();
                  }}
                >
                  <Text style={[styles.menuText, { color: colors.destructive }]}>Delete response</Text>
                </Pressable>
              </>
            ) : (
              <Pressable
                role="button"
                style={styles.menuAction}
                onPress={() => {
                  setMenu(false);
                  onReply();
                }}
              >
                <Text style={styles.menuText}>Reply</Text>
              </Pressable>
            )}
            <ResponseManagement target={target} responseId={response.id} />
            {!own && (
              <Pressable
                role="button"
                accessibilityLabel={`Report response, ${response.id}`}
                style={styles.menuAction}
                onPress={() => {
                  setMenu(false);
                  moderation.open({
                    kind: 'report',
                    target: {
                      kind: 'response',
                      id: response.id,
                      writerId: response.authorId,
                      parent: target,
                    },
                    title: `${name} response`,
                  });
                }}
              >
                <Text style={styles.menuText}>Report response</Text>
              </Pressable>
            )}
          </View>
        </TopPopover>
      )}
      {response.quote && <ResponseQuoteBlock text={response.quote.text} />}
      <Text
        selectable
        style={styles.text}
        numberOfLines={expanded || !(response.body.length > 300 || excerptOnly) ? undefined : 3}
      >
        {response.deleted ? 'This response was deleted.' : response.body}
      </Text>
      {!response.deleted && (response.body.length > 300 || excerptOnly) && (
        <Pressable
          role="button"
          accessibilityLabel={`${expanded ? 'Collapse' : 'Read more'}, ${response.id}`}
          style={styles.target}
          onPress={() => setExpanded((value) => !value)}
        >
          <Text style={styles.green}>{expanded ? 'Read less' : 'Read more...'}</Text>
        </Pressable>
      )}
      {expanded && excerptOnly && <Text style={styles.date}>The rest of this response is unavailable.</Text>}
      <View style={styles.actions}>
        {!response.deleted && (
          <Pressable
            role="button"
            accessibilityLabel={`Clap response, ${response.id}`}
            accessibilityState={{
              disabled: own || pending,
              selected: response.applauded,
              busy: pending,
            }}
            disabled={own || pending}
            style={[styles.target, own && { opacity: 0.3 }]}
            onPress={() => {
              void react();
            }}
          >
            <AppIcon name="clap" size={20} filled={response.applauded} color={colors.secondaryText} />
            <Text style={styles.date}>
              {response.baselineClaps + Number(response.applauded) > 0
                ? formatReactionCount(response.baselineClaps + Number(response.applauded))
                : ''}
            </Text>
          </Pressable>
        )}
        {childCount > 0 && (
          <Pressable
            role="button"
            accessibilityLabel={`${repliesVisible ? 'Hide' : 'Show'} replies, ${response.id}`}
            style={styles.target}
            onPress={onToggleReplies}
          >
            <AppIcon name="comment" size={16} color={colors.secondaryText} />
            <Text style={styles.date}>{repliesVisible ? 'Hide replies' : `${childCount} replies`}</Text>
          </Pressable>
        )}
        {!response.deleted && (
          <Pressable
            role="button"
            accessibilityLabel={`Reply to ${name}`}
            style={styles.target}
            onPress={onReply}
          >
            <Text style={styles.reply}>Reply</Text>
          </Pressable>
        )}
      </View>
      {reactionError && !reactionError.ok && (
        <View>
          <Text role="alert" style={styles.error}>
            댓글 박수를 저장하지 못했어요.
          </Text>
          <Pressable
            role="button"
            accessibilityLabel={`댓글 박수 다시 시도, ${response.id}`}
            style={styles.target}
            onPress={() => {
              void react(true);
            }}
          >
            <Text style={styles.green}>Retry</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      paddingVertical: 20,
      gap: 12,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    child: {
      borderLeftWidth: 1,
      borderLeftColor: colors.border,
      paddingLeft: 20,
    },
    selected: { backgroundColor: colors.input },
    byline: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    flex: { flex: 1 },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.avatar,
    },
    name: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 18,
      color: colors.text,
    },
    date: {
      fontFamily: fonts.sans,
      fontSize: 12,
      lineHeight: 18,
      color: colors.secondaryText,
    },
    text: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 18,
      color: colors.text,
    },
    menuText: {
      fontFamily: fonts.sans,
      fontSize: 17,
      lineHeight: 22,
      color: colors.text,
    },
    green: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 18,
      color: colors.green,
    },
    error: { fontSize: 14, color: colors.destructive },
    actions: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
      alignItems: 'center',
    },
    target: {
      minHeight: 48,
      minWidth: 48,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    reply: {
      fontFamily: fonts.sans,
      fontSize: 12,
      color: colors.text,
      textDecorationLine: 'underline',
    },
    menu: {
      alignSelf: 'flex-end',
      width: 250,
      maxWidth: '100%',
      backgroundColor: colors.popup,
      borderRadius: 12,
      paddingHorizontal: 16,
    },
    menuAction: { minHeight: 48, justifyContent: 'center' },
    quote: {
      borderLeftWidth: 3,
      borderLeftColor: colors.border,
      paddingLeft: 12,
      paddingVertical: 8,
    },
  });
