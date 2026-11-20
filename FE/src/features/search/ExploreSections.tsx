import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useThemeStyles, useTheme } from '../../shared/theme/ThemeProvider';
import { typography, fonts, type ThemeColors } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';
import { ReferenceNotice } from '../../shared/ui/ReferenceNotice';

import { useCommunityNavigation } from '../community/CommunityNavigation';
import { useModeration } from '../moderation/ModerationContext';
import { followKey } from '../community/types';
import { useRecommendedArticles } from '../recommendations/useRecommendedArticles';
import { FollowControl } from '../community/FollowControl';
import { IdentityLink } from '../community/IdentityLink';
import { suggestedTargets } from '../community/data/publicDirectory';
import { recommendedStories, staffPicks, suggestedProfiles } from '../feed/data/mediumExploreExtras';
import { ClapControl } from '../reactions/ClapControl';
import { ResponseButton } from '../responses/ResponseButton';

import { SearchByline } from './SearchCard';

type ExploreSectionsProps = { onSelect: (id: string) => void };

export function ExploreSections({ onSelect }: ExploreSectionsProps) {
  const navigation = useCommunityNavigation();
  const privacy = useModeration();
  const moderation = useRecommendedArticles();
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  const [notice, setNotice] = useState<string | null>(null);
  return (
    <>
      <View style={[styles.section, styles.staffSection]}>
        <Text role="heading" style={[styles.heading, styles.staffHeading]}>
          Staff Picks
        </Text>
        <Text style={styles.description}>Stories from across Medium, hand selected by our team</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carousel}>
          {staffPicks
            .filter((article) => !moderation.excluded(article.id))
            .map((article) => (
              <Pressable
                key={article.id}
                role="button"
                accessibilityLabel={article.title}
                onPress={() => onSelect(article.id)}
                style={styles.staff}
              >
                <Image source={article.reference?.image} style={styles.cover} accessible={false} />
                <SearchByline name={article.sourceName} avatar={article.reference?.avatar} />
                <Text style={styles.title}>{article.title}</Text>
                <Text style={styles.meta}>
                  {article.readingMinutes} min read · {article.publishedLabel}
                </Text>
              </Pressable>
            ))}
          <Pressable
            role="button"
            accessibilityLabel="Partially captured Staff Pick"
            style={styles.staff}
            onPress={() => setNotice('This Staff Pick is only partially captured')}
          >
            <Image
              source={require('../../../assets/medium/staff-fragment.png')}
              style={styles.fragment}
              accessible={false}
            />
            <Text style={styles.meta}>In Prism…</Text>
            <Text style={styles.title}>Struggling…{'\n'}the Over-…</Text>
            <Text style={styles.meta}>5 min read</Text>
          </Pressable>
        </ScrollView>
      </View>
      <View style={styles.section}>
        <Text role="heading" style={styles.heading}>
          Recommended for you
        </Text>
        {recommendedStories
          .filter((article) => !moderation.excluded(article.id))
          .map((article) => (
            <View key={article.id} style={styles.recommended}>
              <Pressable
                role="button"
                accessibilityLabel={article.title}
                onPress={() => onSelect(article.id)}
                style={{ gap: 10, minHeight: 48 }}
              >
                <SearchByline name={article.sourceName} avatar={article.reference?.avatar} />
                <Text style={styles.title}>{article.title}</Text>
              </Pressable>
              <View style={styles.metadata}>
                {article.reference?.memberOnly && <AppIcon name="star" color={colors.gold} size={16} />}
                <Text style={styles.meta}>{article.publishedLabel}</Text>
                <ClapControl target={{ kind: 'article', id: article.id }} title={article.title} />
                <ResponseButton
                  target={{ kind: 'article', id: article.id }}
                  title={article.title}
                  size={14}
                />
              </View>
            </View>
          ))}
      </View>
      <View style={styles.section}>
        <Text role="heading" style={styles.heading}>
          Who to follow
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carousel}>
          {suggestedProfiles
            .map((profile, index) => ({ profile, target: suggestedTargets[index] }))
            .filter(
              ({ target }) =>
                target &&
                !(target.kind === 'writer' && privacy.state?.value?.blocked.includes(target.id)) &&
                !privacy.state?.value?.muted.some((item) => followKey(item) === followKey(target)),
            )
            .map(({ profile, target }) => (
              <View key={profile.name} style={styles.person}>
                <Image source={profile.image} style={styles.avatar} accessible={false} />
                {target && <IdentityLink target={target} style={styles.title} />}
                <Text style={[styles.meta, styles.personMeta]}>{profile.followers}</Text>
                <Text numberOfLines={3} style={styles.bio}>
                  {profile.bio}
                </Text>
                {target && (
                  <View style={styles.personFollow}>
                    <FollowControl target={target} name={profile.name} />
                  </View>
                )}
              </View>
            ))}
        </ScrollView>
      </View>
      <Pressable
        role="button"
        accessibilityLabel="See all recommended people and publications"
        onPress={() => navigation.openDiscovery('all')}
        style={styles.seeAll}
      >
        <Text style={styles.meta}>See all</Text>
      </Pressable>
      <Pressable
        role="button"
        accessibilityLabel="View recommended publications"
        onPress={() => navigation.openDiscovery('publication')}
        style={styles.seeAll}
      >
        <Text style={styles.meta}>Recommended publications</Text>
      </Pressable>
      <ReferenceNotice title={notice} onClose={() => setNotice(null)} />
    </>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    seeAll: { minHeight: 48, justifyContent: 'center', paddingHorizontal: 24 },
    section: {
      paddingVertical: 40,
      borderTopWidth: 2,
      borderTopColor: colors.input,
    },
    staffSection: { paddingBottom: 56 },
    staffHeading: { marginBottom: 8 },
    heading: {
      ...typography.sectionTitle,
      color: colors.text,
      marginHorizontal: 24,
      marginBottom: 24,
    },
    description: {
      ...typography.caption,
      color: colors.secondaryText,
      marginHorizontal: 24,
      marginBottom: 20,
    },
    carousel: { paddingHorizontal: 24, gap: 24 },
    staff: { width: 272, gap: 10 },
    cover: { width: 272, height: 164 },
    fragment: { width: 73, height: 164 },
    title: {
      fontFamily: fonts.sans,
      fontSize: 16,
      lineHeight: 21,
      fontWeight: '700',
      color: colors.text,
    },
    meta: {
      fontFamily: fonts.sans,
      fontSize: 13,
      lineHeight: 20,
      color: colors.secondaryText,
    },
    metadata: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 8,
    },
    recommended: {
      marginHorizontal: 24,
      paddingBottom: 32,
      gap: 10,
      minHeight: 48,
    },
    person: {
      width: 235,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 4,
      padding: 24,
      paddingBottom: 16,
    },
    avatar: { width: 64, height: 64, borderRadius: 32 },
    personMeta: { marginTop: -4 },
    personFollow: { alignSelf: 'flex-start', marginTop: 8 },
    bio: {
      fontFamily: fonts.sans,
      fontSize: 13,
      lineHeight: 20,
      color: colors.secondaryText,
      minHeight: 60,
      marginTop: 8,
    },
    follow: {
      minHeight: 48,
      minWidth: 72,
      alignSelf: 'flex-start',
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.text,
      borderRadius: 24,
      justifyContent: 'center',
    },
    followLabel: { ...typography.body, color: colors.text },
  });
