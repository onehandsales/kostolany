import { useState } from 'react';

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

export function WrittenStoryBookmark({ story }: { story: PublishedStory }) {
  return <ArticleBookmarkControl articleId={publishedArticleId(story.id)} articleTitle={story.document.title} compact />;
}

type WrittenStoryMenuProps = { story: PublishedStory; showShareButton?: boolean };
export function WrittenStoryMenu(props: WrittenStoryMenuProps) {
  const scope = useBookmarkScopeKey();
  const auth = useAuth();
  return <ScopedWrittenStoryMenu key={`${scope}:${auth.state.revision}:${props.story.id}`} {...props} />;
}

function ScopedWrittenStoryMenu({ story, showShareButton = false }: WrittenStoryMenuProps) {
  const context = useWrittenStories();
  const sharing = useShareDialog(context?.source);
  const claps = useClapStore();
  const auth = useAuth();
  const [saving, setSaving] = useState(false);
  const articleId = publishedArticleId(story.id);
  const share = () => sharing.open({ kind: 'written', id: story.id,
    title: story.document.title, subtitle: '', authorName: story.authorName, authorId: story.userId,
    visibility: story.publishing.unlisted ? 'unlisted' : 'public' });
  return <>
    {showShareButton && <IconButton icon="share" label="Share story" onPress={share} />}
    <ActionMenu label={`Story options, ${story.document.title}`} items={[
      { label: 'Share story', onPress: share },
      ...(auth.state.user ? [{ label: 'Save to list', onPress: () => setSaving(true) }] : []),
      ...(claps ? [{ label: 'Undo claps', onPress: () => claps.undo({ kind: 'article', id: articleId }) }] : []),
    ]} />
    {saving && <SaveToListSheet articleId={articleId} articleTitle={story.document.title} onClose={() => setSaving(false)} />}
    {sharing.target && <ShareSheet target={sharing.target} onClose={sharing.close} />}
  </>;
}
