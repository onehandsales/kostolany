import { ActivityIndicator, View } from 'react-native';
import { IconButton } from '../../shared/ui/IconButton';
import { useTheme } from '../../shared/theme/ThemeProvider';
import type { ArticleDetail } from '../article/types';
import { articleWriter, publicIdentity } from '../community/data/publicDirectory';
import { useListening } from './ListeningProvider';

type ListenControlProps = { article: ArticleDetail; disabled?: boolean };
export function ListenControl({ article, disabled }: ListenControlProps) {
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
    <IconButton
      icon={current && snapshot.status === 'playing' ? 'pause' : 'play'}
      label={current && snapshot.status === 'playing' ? 'Listen 일시정지' : 'Listen'}
      disabled={disabled || !store}
      onPress={() =>
        store?.listen({
          articleId: article.id,
          title: article.title,
          cover: article.reference?.image,
          authorId: writer?.id,
          authorName: (writer ? publicIdentity(writer)?.name : undefined) ?? article.sourceName,
        })
      }
    />
  );
}
