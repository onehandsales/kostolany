import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { colors } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';
import { IconButton } from '../../shared/ui/IconButton';
import { useProfile } from '../profile/ProfileProvider';
import { BookmarkIcon } from '../bookmarks/BookmarkIcon';

// 캡처에 보이는 응답만 재현하며 댓글 작성·전송과 후속 기사 원문은 연결하지 않는다.
const responses = [
  {
    name: 'Bérnie',
    date: 'Apr 29, 2025',
    avatar: require('../../../assets/medium/bernie.png'),
    text: "Yes, Claude is like this too. Open AI already said today (on X) that they've tweaked the AI a little and it should be improving this week. The AI should be more like a professor/counsellor/business partner working with you not as a friend who will agree with everything you do.",
    claps: '1K',
    replies: '13',
  },
  {
    name: 'Sunil Bajpai',
    date: 'Apr 30, 2025',
    avatar: null,
    text: 'Spot on! Consultants do the same because they need to get hired by you :-)',
    claps: '844',
    replies: '3',
  },
  {
    name: 'Alfred Akech',
    date: 'May 2, 2025',
    avatar: require('../../../assets/medium/alfred.png'),
    text: 'Great read! I could not agree more. I just wrote about this, but you beat me to it 👏.\nThe way AI functions today must change. Who knows...',
    claps: '733',
    replies: '5',
  },
] as const;

type ReferenceArticleFooterProps = { onNotice: (title: string) => void };

export function ReferenceArticleFooter({ onNotice }: ReferenceArticleFooterProps) {
  const { width } = useWindowDimensions();
  const profile = useProfile();
  return (
    <>
      <View style={styles.responses}>
        <Text role="heading" style={styles.heading}>
          Responses (834)
        </Text>
        <View style={styles.composer}>
          <Text style={styles.text}>{profile.state.profile?.name ?? 'Guest reader'}</Text>
          <Pressable
            role="button"
            accessibilityLabel="Write a response"
            onPress={() => onNotice('Responses')}
            style={styles.inputTarget}
          >
            <View style={styles.input}>
              <Text style={styles.muted}>What are your thoughts?</Text>
            </View>
          </Pressable>
        </View>
        {responses.map((response) => (
          <View key={response.name} style={styles.response}>
            <View style={styles.byline}>
              {response.avatar ? (
                <Image source={response.avatar} style={styles.avatar} accessible={false} />
              ) : (
                <View style={styles.avatar} />
              )}
              <View style={styles.flex}>
                <Text style={styles.text}>{response.name}</Text>
                <Text style={styles.muted}>{response.date}</Text>
              </View>
              <IconButton
                icon="more"
                label={`${response.name} response options`}
                onPress={() => onNotice('Response options')}
              />
            </View>
            <Text style={styles.responseText}>{response.text}</Text>
            {response.name === 'Alfred Akech' && (
              <Pressable role="button" onPress={() => onNotice('Response excerpt')} style={styles.target}>
                <Text style={styles.green}>Read more...</Text>
              </Pressable>
            )}
            <View style={styles.actions}>
              <Pressable
                role="button"
                accessibilityLabel={`Clap for ${response.name}`}
                onPress={() => onNotice('Response claps')}
                style={styles.target}
              >
                <AppIcon name="clap" size={24} />
                <Text style={styles.muted}>{response.claps}</Text>
              </Pressable>
              <Pressable
                role="button"
                accessibilityLabel={`${response.replies} replies to ${response.name}`}
                onPress={() => onNotice('Replies')}
                style={styles.target}
              >
                <AppIcon name="comment" size={24} />
                <Text style={styles.muted}>{response.replies} replies</Text>
              </Pressable>
              <Pressable
                role="button"
                accessibilityLabel={`Reply to ${response.name}`}
                onPress={() => onNotice('Reply')}
                style={styles.target}
              >
                <Text style={styles.reply}>Reply</Text>
              </Pressable>
            </View>
          </View>
        ))}
        <Pressable role="button" onPress={() => onNotice('Responses')} style={styles.all}>
          <Text style={styles.text}>See all responses</Text>
        </Pressable>
      </View>
      <View style={styles.more}>
        <Text role="heading" style={styles.heading}>
          More from Jordan Gibbs
        </Text>
        {[
          {
            title: 'Behold...The Prompt Bible is Here',
            image: require('../../../assets/medium/prompt-bible.png'),
            subtitle: 'The Most Useful Tips from Google’s Epic 70-Page AI Prompt Engineering Guide',
          },
          {
            title: 'ChatGPT Users...Should You Make the Switch to Gemini?',
            image: require('../../../assets/medium/gemini.png'),
            subtitle: '',
          },
        ].map((story, index) => (
          <View key={story.title} style={styles.story}>
            <Pressable
              role="button"
              accessibilityLabel={story.title}
              onPress={() => onNotice('Story excerpt')}
            >
              <Image
                source={story.image}
                style={[styles.cover, { height: Math.min(width - 48, 680) / 2 }]}
                accessible={false}
              />
              <View style={styles.storyByline}>
                <Image
                  source={require('../../../assets/medium/jordan.png')}
                  style={styles.smallAvatar}
                  accessible={false}
                />
                <Text style={styles.text}>Jordan Gibbs</Text>
              </View>
              <Text style={styles.heading}>{story.title}</Text>
              {Boolean(story.subtitle) && <Text style={styles.subtitle}>{story.subtitle}</Text>}
            </Pressable>
            {index === 0 && (
              <View style={styles.actions}>
                <AppIcon name="star" color={colors.gold} size={20} />
                <Text style={styles.muted}>May 24</Text>
                <AppIcon name="clap" size={16} />
                <Text style={styles.muted}>670</Text>
                <AppIcon name="comment" size={16} />
                <Text style={styles.muted}>18</Text>
                <Pressable
                  role="button"
                  accessibilityLabel="Save recommended story"
                  onPress={() => onNotice('Story excerpt')}
                  style={styles.target}
                >
                  <BookmarkIcon saved={false} plus size={20} />
                </Pressable>
                <IconButton
                  icon="more"
                  label="Recommended story options"
                  onPress={() => onNotice('Story excerpt')}
                />
              </View>
            )}
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  responses: { marginTop: 48 },
  heading: { fontSize: 20, lineHeight: 26, fontWeight: '700', color: colors.text },
  text: { fontSize: 14, lineHeight: 20, color: colors.text },
  responseText: { fontSize: 14, lineHeight: 18, color: colors.text },
  muted: { fontSize: 12, lineHeight: 18, color: colors.secondaryText },
  composer: { marginLeft: 44, marginTop: 32, marginBottom: 32, gap: 0 },
  inputTarget: { minHeight: 48, justifyContent: 'center' },
  input: {
    minHeight: 36,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.input,
    borderRadius: 4,
  },
  response: {
    paddingVertical: 18,
    gap: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  byline: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.avatar },
  flex: { flex: 1 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 8 },
  target: { flexDirection: 'row', gap: 8, alignItems: 'center', minHeight: 48, minWidth: 48 },
  reply: { fontSize: 14, color: colors.text, textDecorationLine: 'underline' },
  green: { fontSize: 16, color: colors.green },
  all: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.text,
    marginTop: 24,
  },
  more: {
    marginHorizontal: -24,
    padding: 24,
    paddingTop: 32,
    backgroundColor: colors.surface,
    marginTop: 48,
  },
  story: { marginTop: 40 },
  cover: { width: '100%', aspectRatio: 2, borderRadius: 2 },
  storyByline: { flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 24 },
  smallAvatar: { width: 20, height: 20, borderRadius: 10 },
  subtitle: { fontSize: 16, lineHeight: 21, color: colors.secondaryText, marginTop: 12, marginBottom: 16 },
});
