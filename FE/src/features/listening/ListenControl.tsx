import { useState } from 'react';
import { MembershipSheet } from '../membership/MembershipSheet';
import { useMembership } from '../membership/MembershipProvider';
import { ActivityIndicator, View } from 'react-native';
import { IconButton } from '../../shared/ui/IconButton';
import { useTheme } from '../../shared/theme/ThemeProvider';
import type { ArticleDetail } from '../article/types';
import { articleWriter, publicIdentity } from '../community/data/publicDirectory';
import { useListening } from './ListeningProvider';

type ListenControlProps = { article: Pick<ArticleDetail, 'id' | 'title' | 'sourceName' | 'reference'>; disabled?: boolean; authorId?: string };
export function ListenControl({ article, disabled, authorId }: ListenControlProps) {
  const membership = useMembership();
  const [showMembership, setShowMembership] = useState(false);
  const { store, snapshot } = useListening();
  const { colors } = useTheme();
  const current = snapshot.story?.articleId === article.id;
  const writer = articleWriter(article.id);
  if (current && snapshot.status === 'loading')
    return (
      <View
        style={{ width: 48, height: 48, justifyContent: 'center' }}
        accessibilityLabel="듣기 준비 중"
        accessibilityState={{ busy: true }}
      >
        <ActivityIndicator color={colors.secondaryText} />
      </View>
    );
  return (
    <>
    {showMembership && <MembershipSheet onClose={() => setShowMembership(false)} />}
    <IconButton
      icon={current && snapshot.status === 'playing' ? 'pause' : 'play'}
      label={current && snapshot.status === 'playing' ? 'Listen 일시정지' : 'Listen'}
      disabled={disabled || !store}
      onPress={() => {
        if (membership && !membership.allows('audio')) { setShowMembership(true); return; }
        store?.listen({
          articleId: article.id,
          title: article.title,
          cover: article.reference?.image,
          authorId: authorId ?? writer?.id,
          authorName: (writer ? publicIdentity(writer)?.name : undefined) ?? article.sourceName,
        });
      }}
    />
    </>
  );
}
