import { useEffect, useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type GestureResponderEvent,
} from 'react-native';

import { useModeration } from '../moderation/ModerationContext';
import { useAuth } from '../auth/AuthProvider';
import { useRelationships } from './RelationshipProvider';
import { emptyRelationship, followKey, type RelationshipTarget, type Relationship } from './types';
import { useTheme, useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { TopPopover } from '../../shared/ui/TopPopover';
import { AppIcon } from '../../shared/ui/AppIcon';

type Props = {
  target: RelationshipTarget;
  name: string;
  wide?: boolean;
  active?: boolean;
  topicStyle?: boolean;
  presentation?: 'pill' | 'menu';
  onMessage?: (message: string) => void;
};
export function FollowControl(props: Props) {
  const { scope } = useRelationships();
  const moderation = useModeration();
  const blocked = props.target.kind === 'writer' && Boolean(moderation.state?.value?.blocked.includes(props.target.id));
  return (
    <ScopedFollow
      key={`${scope}:${followKey(props.target)}:${props.active !== false}:${blocked}`}
      {...props}
      target={{ kind: props.target.kind, id: props.target.id }}
    />
  );
}
function ScopedFollow({ target, name, active = true, wide = false, topicStyle = false, presentation = 'pill', onMessage }: Props) {
  const { state, store, scope } = useRelationships();
  const moderation = useModeration();
  const blocked = target.kind === 'writer' && Boolean(moderation.state?.value?.blocked.includes(target.id));
  const auth = useAuth();
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const [menu, setMenu] = useState<{ top: number; right: number } | null>(null);
  const button = useRef<View>(null);
  const mounted = useRef(true);
  const intent = useRef(0);
  const measurement = useRef(0);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      intent.current += 1;
      measurement.current += 1;
    };
  }, []);
  const key = followKey(target);
  const relationship =
    state?.relationships.find((item) => followKey(item.target) === key) ?? emptyRelationship(target);
  const failed = state?.errors.includes(key);
  const pending = state?.pending.includes(key);
  const loading = Boolean(
    (store && state?.status === 'loading') || (moderation.store && !moderation.state?.value),
  );
  function closeMenu() {
    intent.current += 1;
    measurement.current += 1;
    setMenu(null);
  }
  function openMenu(pageY = 160) {
    const request = ++measurement.current;
    setMenu({
      top: Math.max(8, Math.min(pageY + 24, height - 180)),
      right: Math.max(8, (width - 250) / 2),
    });
    button.current?.measureInWindow((x, y, w, h) => {
      if (mounted.current && request === measurement.current)
        setMenu({
          top: Math.max(8, Math.min(y + h, height - 180)),
          right: Math.max(8, width - Math.min(width - 8, x + w / 2 + 125)),
        });
    });
  }
  async function submit(value: Relationship) {
    // 차단은 새 팔로우·수신 설정을 막지만 기존 관계의 해제까지 막지 않는다.
    if (!store || !active || (blocked && value.following)) return;
    const request = ++intent.current;
    const success = await store.set(value, scope);
    if (!mounted.current || request !== intent.current || !success) return;
    if (value.following !== relationship.following)
      onMessage?.(value.following ? `Success! You’re now following ${name}.` : `You unfollowed ${name}.`);
    if (!value.following) closeMenu();
  }
  function press(event: GestureResponderEvent) {
    if (!auth.state.user) {
      auth.store.openLogin({
        kind: 'follow',
        targetKind: target.kind,
        targetId: target.id,
      });
      return;
    }
    if (!store || loading || !active) return;
    if (state?.status === 'error') {
      void store.reload();
      return;
    }
    if (blocked) {
      if (relationship.following) void submit({ target, following: false, email: false });
      return;
    }
    if (target.kind === 'topic') {
      void submit({ target, following: !relationship.following, email: false });
      return;
    }
    if (relationship.following) openMenu(event.nativeEvent.pageY);
    else {
      openMenu(event.nativeEvent.pageY);
      void submit({ target, following: true, email: false });
    }
  }
  if (target.kind === 'writer' && target.id === auth.state.user?.id) return null;
  if (moderation.state?.readError)
    return (
      <Pressable
        role="button"
        accessibilityLabel="Retry privacy preferences"
        style={styles.retry}
        onPress={() => {
          void moderation.store?.reload();
        }}
      >
        <Text role="alert" style={styles.error}>
          Couldn’t load preferences. Retry
        </Text>
      </Pressable>
    );
  if (blocked && !relationship.following) return <Text style={styles.message}>Blocked author</Text>;
  return (
    <View style={(wide || presentation === 'menu') && styles.wide}>
      <Pressable
        ref={button}
        role="button"
        aria-pressed={relationship.following}
        accessibilityLabel={`${blocked ? 'Unfollow' : relationship.following ? 'Following' : 'Follow'} ${name}`}
        accessibilityState={{
          busy: pending || loading,
          disabled: loading || !active,
          selected: relationship.following,
        }}
        disabled={loading || !active}
        onPress={press}
        style={styles.target}
      >
        <View
          style={[
            styles.pill,
            topicStyle && styles.topicPill,
            topicStyle && !relationship.following && styles.filled,
            wide && styles.widePill,
            relationship.following && styles.followed,
            wide && !relationship.following && styles.filled,
            presentation === 'menu' && styles.menuAppearance,
          ]}
        >
          <Text style={[styles.label, (wide || topicStyle) && !relationship.following && styles.inverse,
            presentation === 'menu' && styles.menuLabel]}>
            {loading ? 'Loading…' : blocked ? 'Unfollow' : relationship.following ? 'Following' : 'Follow'}{presentation === 'menu' ? ' author' : ''}
          </Text>
          {relationship.following && !blocked && target.kind !== 'topic' && presentation !== 'menu' && (
            <View style={[styles.chevron, wide && styles.wideChevron]}>
              <AppIcon name="chevron" size={12} />
            </View>
          )}
        </View>
      </Pressable>
      {(failed || state?.readError) && (
        <Pressable
          role="button"
          accessibilityLabel={`Retry following ${name}`}
          style={styles.retry}
          onPress={() => {
            if (failed) void store?.retry(key, scope);
            else void store?.reload();
          }}
        >
          <Text role="alert" style={styles.error}>
            Couldn’t save or load this preference. Retry
          </Text>
        </Pressable>
      )}
      {menu && active && !blocked && (
        <TopPopover
          title={`Following ${name} options`}
          onClose={closeMenu}
          width={250}
          top={menu.top}
          right={menu.right}
          showPointer={false}
        >
          {target.kind === 'writer' && (
            <>
              <EmailOption
                enabled
                checked={relationship.following && relationship.email}
                onPress={() => {
                  void submit({ target, following: true, email: true });
                }}
              />
              <EmailOption
                enabled={false}
                checked={relationship.following && !relationship.email}
                onPress={() => {
                  void submit({ target, following: true, email: false });
                }}
              />
            </>
          )}
          <Pressable
            role="button"
            accessibilityLabel={`Unfollow ${name}`}
            onPress={() => {
              void submit({ target, following: false, email: false });
            }}
            style={styles.row}
          >
            <View style={styles.check} />
            <Text style={[styles.menuLabel, { color: colors.destructive }]}>Unfollow</Text>
            <AppIcon name="bell" size={20} color={colors.destructive} />
          </Pressable>
          {pending && (
            <Text aria-live="polite" style={styles.message}>
              Saving…
            </Text>
          )}
          {failed && (
            <Pressable
              role="button"
              accessibilityLabel={`Retry email or follow ${name}`}
              style={styles.retry}
              onPress={() => {
                void store?.retry(key, scope);
              }}
            >
              <Text role="alert" style={styles.error}>
                Couldn’t save. Retry
              </Text>
            </Pressable>
          )}
        </TopPopover>
      )}
    </View>
  );
}
function EmailOption({
  enabled,
  checked,
  onPress,
}: {
  enabled: boolean;
  checked: boolean;
  onPress: () => void;
}) {
  const styles = useThemeStyles(createStyles);
  return (
    <Pressable
      role="radio"
      aria-checked={checked}
      accessibilityState={{ checked }}
      accessibilityLabel={`Email notifications ${enabled ? 'on' : 'off'}`}
      style={styles.row}
      onPress={onPress}
    >
      <View style={styles.check}>{checked && <AppIcon name="check" size={16} />}</View>
      <Text style={styles.menuLabel}>Email notifications {enabled ? 'on' : 'off'}</Text>
      <AppIcon name="bell" size={20} />
    </Pressable>
  );
}
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    wide: { width: '100%' },
    menuAppearance: { borderWidth: 0, paddingHorizontal: 0, justifyContent: 'flex-start' },
    target: { minWidth: 72, minHeight: 48, justifyContent: 'center' },
    pill: {
      minHeight: 32,
      paddingHorizontal: 16,
      paddingVertical: 6,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.text,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 12,
    },
    topicPill: { minHeight: 38 },
    widePill: { width: '100%', minHeight: 38 },
    followed: { borderColor: colors.border },
    filled: { backgroundColor: colors.text },
    label: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      color: colors.text,
    },
    inverse: { color: colors.onInverse },
    chevron: { transform: [{ rotate: '90deg' }] },
    wideChevron: { position: 'absolute', right: 14 },
    row: {
      minHeight: 48,
      paddingHorizontal: 12,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    check: { width: 14 },
    menuLabel: {
      fontFamily: fonts.sans,
      fontSize: 16,
      lineHeight: 22,
      color: colors.text,
      flex: 1,
    },
    message: {
      fontFamily: fonts.sans,
      fontSize: 13,
      lineHeight: 18,
      color: colors.secondaryText,
      padding: 12,
    },
    retry: { minHeight: 48, justifyContent: 'center', padding: 8 },
    error: {
      fontFamily: fonts.sans,
      fontSize: 13,
      lineHeight: 18,
      color: colors.destructive,
    },
  });
