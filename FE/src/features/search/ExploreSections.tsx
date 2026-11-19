import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, typography } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';
import { ReferenceNotice } from '../../shared/ui/ReferenceNotice';
import { recommendedStories, staffPicks, suggestedProfiles } from '../feed/data/mediumExploreExtras';
import { formatReactionCount } from '../feed/data/mediumFixtures';
import { SearchByline } from './SearchCard';

type ExploreSectionsProps = { onSelect: (id: string) => void };

export function ExploreSections({ onSelect }: ExploreSectionsProps) {
  const [notice, setNotice] = useState<string | null>(null);
  return (
    <>
      <View style={[styles.section, styles.staffSection]}>
        <Text role="heading" style={[styles.heading, styles.staffHeading]}>
          Staff Picks
        </Text>
        <Text style={styles.description}>Stories from across Medium, hand selected by our team</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carousel}>
          {staffPicks.map((article) => (
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
        {recommendedStories.map((article) => (
          <Pressable
            key={article.id}
            role="button"
            accessibilityLabel={article.title}
            onPress={() => onSelect(article.id)}
            style={styles.recommended}
          >
            <SearchByline name={article.sourceName} avatar={article.reference?.avatar} />
            <Text style={styles.title}>{article.title}</Text>
            <View style={styles.metadata}>
              {article.reference?.memberOnly && <AppIcon name="star" color={colors.gold} size={16} />}
              <Text style={styles.meta}>{article.publishedLabel}</Text>
              {Boolean(article.reference?.applause) && (
                <>
                  <AppIcon name="clap" size={16} color={colors.secondaryText} />
                  <Text style={styles.meta}>{formatReactionCount(article.reference?.applause ?? 0)}</Text>
                  <AppIcon name="comment" size={14} color={colors.secondaryText} />
                  <Text style={styles.meta}>{article.reference?.responses}</Text>
                </>
              )}
            </View>
          </Pressable>
        ))}
      </View>
      <View style={styles.section}>
        <Text role="heading" style={styles.heading}>
          Who to follow
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carousel}>
          {suggestedProfiles.map((profile) => (
            <View key={profile.name} style={styles.person}>
              <Image source={profile.image} style={styles.avatar} accessible={false} />
              <Text style={styles.title}>{profile.name}</Text>
              <Text style={styles.meta}>{profile.followers}</Text>
              <Text style={styles.bio}>{profile.bio}</Text>
              <Pressable
                role="button"
                accessibilityLabel={`Follow ${profile.name}`}
                onPress={() => setNotice(`Follow ${profile.name}`)}
                style={styles.follow}
              >
                <Text style={styles.followLabel}>Follow</Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>
      <ReferenceNotice title={notice} onClose={() => setNotice(null)} />
    </>
  );
}

const styles = StyleSheet.create({
  section: { paddingVertical: 40, borderTopWidth: 2, borderTopColor: colors.input },
  staffSection: { paddingBottom: 56 },
  staffHeading: { marginBottom: 8 },
  heading: { ...typography.sectionTitle, marginHorizontal: 24, marginBottom: 24 },
  description: { ...typography.caption, color: colors.secondaryText, marginHorizontal: 24, marginBottom: 20 },
  carousel: { paddingHorizontal: 24, gap: 24 },
  staff: { width: 272, gap: 10 },
  cover: { width: 272, height: 164 },
  fragment: { width: 73, height: 164 },
  title: { fontSize: 16, lineHeight: 21, fontWeight: '700', color: colors.text },
  meta: { fontSize: 13, lineHeight: 20, color: colors.secondaryText },
  metadata: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 8 },
  recommended: { marginHorizontal: 24, paddingBottom: 32, gap: 10, minHeight: 48 },
  person: { width: 235, borderWidth: 1, borderColor: colors.border, borderRadius: 4, padding: 24, gap: 12 },
  avatar: { width: 64, height: 64, borderRadius: 32 },
  bio: { ...typography.body, color: colors.secondaryText, minHeight: 90 },
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
