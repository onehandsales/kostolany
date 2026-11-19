import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';
import { IconButton } from '../../shared/ui/IconButton';
import { ReferenceNotice } from '../../shared/ui/ReferenceNotice';
import { ContentIllustration } from '../../shared/ui/ContentIllustration';
import type { FeedArticle } from '../feed/types';
import { useProfile } from '../profile/ProfileProvider';
import { ListActions } from './ListActions';
import { DEFAULT_LIST_ID } from './listTypes';

type LibraryListCardProps = {
  listId: string;
  name: string;
  articles: readonly FeedArticle[];
  onOpen: (listId: string) => void;
  isPrivate?: boolean;
  afterIntroduction?: boolean;
};

export function LibraryListCard({
  listId,
  name,
  articles,
  onOpen,
  isPrivate = false,
  afterIntroduction = false,
}: LibraryListCardProps) {
  const { state } = useProfile();
  const [notice, setNotice] = useState<string | null>(null);
  const thumbnails = articles.filter((article) => article.reference?.image || article.thumbnail).slice(0, 3);
  return (
    <View style={[styles.card, afterIntroduction && { marginTop: 20 }]}>
      <Pressable
        role="button"
        accessibilityLabel={`${name} 열기, 저장한 기사 ${articles.length}개`}
        onPress={() => onOpen(listId)}
        style={styles.link}
      >
        <View style={styles.owner}>
          <View style={styles.avatar} />
          <Text style={styles.ownerName}>{state.profile?.name ?? 'Reader'}</Text>
        </View>
        <Text style={styles.title}>{listId === DEFAULT_LIST_ID ? 'Reading list' : name}</Text>
      </Pressable>
      <View style={styles.actions}>
        <Text style={styles.count}>
          {articles.length
            ? `${articles.length} ${articles.length === 1 ? 'story' : 'stories'}`
            : 'No stories'}
        </Text>
        {(isPrivate || listId === DEFAULT_LIST_ID) && (
          <AppIcon name="lock" size={12} color={colors.secondaryText} />
        )}
        <View style={styles.flex} />
        <IconButton
          icon="download"
          label={`Download ${name}`}
          size={20}
          onPress={() => setNotice('Download list')}
        />
        {listId !== DEFAULT_LIST_ID ? (
          <ListActions listId={listId} name={name} />
        ) : (
          <IconButton
            icon="more"
            label="Reading list options"
            size={20}
            onPress={() => setNotice('Reading list options')}
          />
        )}
      </View>
      <View aria-hidden style={styles.thumbnails}>
        {[0, 1, 2].map((index) => {
          const article = thumbnails[index];
          return (
            <View
              key={index}
              style={[styles.thumbnail, { flex: index === 0 ? 1.14 : index === 1 ? 1 : 0.5 }]}
            >
              {article?.reference?.image ? (
                <Image
                  source={article.reference.image}
                  style={styles.image}
                  resizeMode="cover"
                  accessible={false}
                />
              ) : article?.thumbnail ? (
                <ContentIllustration variant={article.thumbnail} width="100%" height="100%" />
              ) : null}
            </View>
          );
        })}
      </View>
      <ReferenceNotice title={notice} onClose={() => setNotice(null)} />
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    marginHorizontal: 24,
    marginTop: 32,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: '#fafafa',
  },
  link: { paddingHorizontal: 24, paddingTop: 24, gap: 12 },
  owner: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  avatar: { width: 20, height: 20, borderRadius: 10, backgroundColor: colors.input },
  ownerName: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.text },
  title: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 22, fontWeight: '700', color: colors.text },
  count: { fontFamily: fonts.sans, fontSize: 12, lineHeight: 18, color: colors.secondaryText },
  actions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 12,
    minHeight: 48,
    marginVertical: 4,
  },
  flex: { flex: 1 },
  thumbnails: { flexDirection: 'row', height: 104, gap: 3 },
  thumbnail: { overflow: 'hidden', backgroundColor: colors.input },
  image: { width: '100%', height: '100%' },
});
