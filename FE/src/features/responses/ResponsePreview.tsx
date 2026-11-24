import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { getResponseCount, visibleResponses } from './responseVisibility';
import { useArticleModeration } from '../moderation/articleModeration';
import { useTheme } from '../../shared/theme/ThemeProvider';
import { fonts } from '../../shared/theme/tokens';
import { useAuth } from '../auth/AuthProvider';
import { useProfile } from '../profile/ProfileProvider';
import { ResponseCard } from './ResponseCard';
import { ProfileAvatar } from '../profile/ProfileAvatar';
import { IconButton } from '../../shared/ui/IconButton';
import { ResponsesPanel } from './ResponsesPanel';
import { useResponses, useResponseScope } from './ResponseProvider';
import { responseRows } from './responseRows';
import { responseTargetKey, type ResponseTarget } from './types';

type Entry = { kind: 'all' | 'policy' } | { kind: 'reply' | 'edit' | 'delete'; id: string };
export function ResponsePreview({ target, active = true }: { target: ResponseTarget; active?: boolean }) {
  const context = useResponseScope();
  return <ScopedResponsePreview key={`${context?.scope}:${responseTargetKey(target)}`} target={target} active={active} />;
}
function ScopedResponsePreview({ target, active }: { target: ResponseTarget; active: boolean }) {
  const { state, store } = useResponses(target);
  const auth = useAuth();
  const profile = useProfile();
  const { colors } = useTheme();
  const [entry, setEntry] = useState<Entry | null>(null);
  const moderation = useArticleModeration();
  if (entry && target.kind === 'article' && (moderation.blocked(target.id) || moderation.state?.readError))
    setEntry(null);
  const responses = visibleResponses(state?.value, moderation.state?.value?.blocked);
  const roots = responseRows(responses, 'relevant', store?.userId ?? null, {})
    .filter((row) => row.kind === 'response' && row.depth === 0)
    .slice(0, 3);
  const text = {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 20,
    color: colors.text,
  };
  function requireLogin(): void {
    auth.store.openLogin({
      kind: 'response',
      targetKind: target.kind,
      targetId: target.id,
    });
  }
  return (
    <View style={{ marginTop: 48 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text role="heading" style={{ ...text, fontSize: 20, lineHeight: 26, fontWeight: '700', flexShrink: 1 }}>
        Responses (
        {state?.value
          ? getResponseCount(state.value, moderation.state?.value?.blocked)
          : '—'}
        )
      </Text>
      <IconButton icon="shield" label="본문 응답 정책" size={16} onPress={() => setEntry({ kind: 'policy' })} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginVertical: 24 }}>
      {auth.state.user && <ProfileAvatar userId={auth.state.user.id} size={32} />}
      <View style={{ flex: 1, gap: 8 }}>
      {auth.state.user && <Text style={text}>{profile.state.profile?.name ?? auth.state.user.name}</Text>}
      <Pressable
        role="button"
        accessibilityLabel="Write a response"
        style={{
          minHeight: 48,
          backgroundColor: colors.input,
          padding: 12,
        }}
        onPress={() => (store?.userId ? setEntry({ kind: 'all' }) : requireLogin())}
      >
        <Text style={text}>What are your thoughts?</Text>
      </Pressable>
      </View>
      </View>
      {state?.readError && (
        <Pressable
          role="button"
          accessibilityLabel="본문 댓글 조회 다시 시도"
          style={{ minHeight: 48 }}
          onPress={() => {
            void store?.refresh(target);
          }}
        >
          <Text role="alert" style={text}>
            댓글을 불러오지 못했어요. Retry
          </Text>
        </Pressable>
      )}
      {store &&
        roots.map(
          (row) =>
            row.kind === 'response' && (
              <ResponseCard
                key={row.id}
                response={row.response}
                target={target}
                store={store}
                childCount={row.childCount}
                repliesVisible={false}
                displayName={profile.state.profile?.name}
                onRequireLogin={requireLogin}
                onReply={() => setEntry({ kind: 'reply', id: row.id })}
                onEdit={() => setEntry({ kind: 'edit', id: row.id })}
                onDelete={() => setEntry({ kind: 'delete', id: row.id })}
                onToggleReplies={() => setEntry({ kind: 'all' })}
              />
            ),
        )}
      <Pressable
        role="button"
        accessibilityLabel="See all responses"
        style={{
          minHeight: 48,
          borderWidth: 1,
          borderColor: colors.text,
          borderRadius: 28,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 24,
        }}
        onPress={() => setEntry({ kind: 'all' })}
      >
        <Text style={text}>See all responses</Text>
      </Pressable>
      {entry && (
        <ResponsesPanel
          target={target}
          active={active}
          initialPolicy={entry.kind === 'policy'}
          onClose={() => setEntry(null)}
          initialReplyId={entry.kind === 'reply' ? entry.id : undefined}
          initialEditId={entry.kind === 'edit' ? entry.id : undefined}
          initialDeleteId={entry.kind === 'delete' ? entry.id : undefined}
        />
      )}
    </View>
  );
}
