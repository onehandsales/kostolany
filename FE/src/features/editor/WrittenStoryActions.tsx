import { useState, type RefObject } from 'react';
import { Text, type View } from 'react-native';

import { ActionMenu } from '../../shared/ui/ActionMenu';
import { IconButton } from '../../shared/ui/IconButton';
import { ArticleBookmarkControl } from '../bookmarks/ArticleBookmarkControl';
import { SaveToListSheet } from '../bookmarks/SaveToListSheet';
import { useBookmarkScopeKey } from '../bookmarks/useBookmarks';
import { useAuth } from '../auth/AuthProvider';
import { useClapStore } from '../reactions/ClapProvider';
import { useShareDialog } from '../sharing/SharingProvider';
import { ShareSheet } from '../sharing/ShareSheet';
import { publishedArticleId } from './publishedArticle';
import type { PublishedStory } from './publishing';
import { useWrittenStories } from './WrittenStoriesProvider';
import { useHasViewed } from '../reading-history/ReadingHistoryProvider';
import { useTheme } from '../../shared/theme/ThemeProvider';
import { fonts } from '../../shared/theme/tokens';

export function WrittenStoryViewed({ story }: { story: PublishedStory }) {
  const viewed = useHasViewed(publishedArticleId(story.id));
  const { colors } = useTheme();
  return viewed ? <Text accessibilityLabel={`읽음, ${story.document.title}`} style={{ color: colors.secondaryText, fontFamily: fonts.sans, fontSize: 12, lineHeight: 18 }}>Viewed</Text> : null;
}

export function WrittenStoryBookmark({ story, active = true }: { story: PublishedStory; active?: boolean }) {
  return <ArticleBookmarkControl active={active} articleId={publishedArticleId(story.id)} articleTitle={story.document.title} compact />;
}

type WrittenStoryMenuProps = { story: PublishedStory; active?: boolean; showShareButton?: boolean; onDisplay?: () => void; buttonRef?: RefObject<View | null> };
export function WrittenStoryMenu(props: WrittenStoryMenuProps) {
  const scope = useBookmarkScopeKey();
  const auth = useAuth();
  return <ScopedWrittenStoryMenu key={`${scope}:${auth.state.revision}:${props.story.id}:${props.active ?? true}`} {...props} />;
}

function ScopedWrittenStoryMenu({ story, active = true, showShareButton = false, onDisplay, buttonRef }: WrittenStoryMenuProps) {
  const context = useWrittenStories();
  const sharing = useShareDialog(context?.source, active);
  const claps = useClapStore();
  const auth = useAuth();
  const [saving, setSaving] = useState(false);
  const articleId = publishedArticleId(story.id);
  const share = () => sharing.open({ kind: 'written', id: story.id,
    title: story.document.title, subtitle: '', authorName: story.authorName, authorId: story.userId,
    visibility: story.publishing.unlisted ? 'unlisted' : 'public' });
  return <>
    {showShareButton && <IconButton icon="share" label="Share story" onPress={share} />}
    <ActionMenu buttonRef={buttonRef} label={`Story options, ${story.document.title}`} items={[
      ...(onDisplay ? [{ label: 'Display settings…', accessibilityLabel: '발행 글 표시 설정', onPress: onDisplay }] : []),
      { label: 'Share story', onPress: share },
      ...(auth.state.user ? [{ label: 'Save to list', onPress: () => setSaving(true) }] : []),
      ...(claps ? [{ label: 'Undo claps', onPress: () => claps.undo({ kind: 'article', id: articleId }) }] : []),
    ]} />
    {saving && <SaveToListSheet articleId={articleId} articleTitle={story.document.title} onClose={() => setSaving(false)} />}
    {sharing.target && <ShareSheet target={{ ...sharing.target, title: story.document.title,
      authorName: story.authorName, visibility: story.publishing.unlisted ? 'unlisted' : 'public' }} onClose={sharing.close} />}
  </>;
}
