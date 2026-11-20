import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useModeration } from '../moderation/ModerationContext';
import { publicListPreviews } from './data/publicDirectory';
import { IdentityLink } from './IdentityLink';
import { IconButton } from '../../shared/ui/IconButton';
import { useTheme } from '../../shared/theme/ThemeProvider';

// 공개 목록의 식별·소유자·진입 계약을 먼저 연결하고 저장·응답은 Goal32에서 확장한다.
export function PublicListPreviewScreen({ listId, onBack }: { listId: string; onBack: () => void }) {
  const { colors } = useTheme();
  const moderation = useModeration();
  const list = publicListPreviews.find((item) => item.id === listId);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <IconButton icon="back" label="Back from public list" onPress={onBack} />
      <ScrollView contentContainerStyle={{ padding: 24, gap: 24 }}>
        {list && !moderation.state?.value?.blocked.includes(list.author.id) ? (
          <>
            <IdentityLink target={list.author} avatar />
            <Text role="heading" style={{ fontSize: 28, color: colors.text }}>
              {list.title}
            </Text>
            <Text style={{ color: colors.secondaryText }}>{list.count} stories</Text>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              {list.covers.map((source, index) => (
                <Image key={index} source={source} style={{ width: '46%', height: 120 }} accessible={false} />
              ))}
            </View>
            <Text style={{ color: colors.secondaryText }}>
              The captured preview is available. List contents and saving are being connected in Goal32.
            </Text>
          </>
        ) : (
          <Text style={{ color: colors.text }}>List unavailable</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
