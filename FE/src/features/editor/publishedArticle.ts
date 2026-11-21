import type { ArticleCatalog } from '../feed/ArticleCatalog';
import type { FeedArticle } from '../feed/types';
import type { DraftSource } from './draftSource';
import type { EditorImageSource } from './imageSource';
import { validPublishedStory, type PublishedStory } from './publishing';

const PREFIX = 'written:';
export const publishedArticleId = (storyId: string): string => `${PREFIX}${encodeURIComponent(storyId)}`;

export function writtenStoryId(articleId: string): string | null {
  if (!articleId.startsWith(PREFIX)) return null;
  try {
    const id = decodeURIComponent(articleId.slice(PREFIX.length));
    return id.trim() && publishedArticleId(id) === articleId ? id : null;
  } catch {
    return null;
  }
}

export function toPublishedArticle(story: PublishedStory, images: EditorImageSource): FeedArticle {
  const body = story.document.body.replaceAll('\uFFFC', '').trim();
  const image = story.document.images[0];
  return {
    id: publishedArticleId(story.id),
    title: story.document.title,
    summary: body,
    sourceName: story.authorName,
    publishedLabel: new Date(story.publishedAt).toLocaleDateString(),
    readingMinutes: Math.max(1, Math.ceil(body.split(/\s+/u).length / 200)),
    thumbnail: null,
    publishedStory: { id: story.id, ownerId: story.userId, unlisted: story.publishing.unlisted },
    reference: {
      ...(image ? { image: images.resolve(image.assetId) } : {}),
      applause: 0, responses: '0', memberOnly: false,
    },
  };
}

// 발행 저장소의 읽기 전용 투영만 합치며 초안과 공개 검색의 노출 정책은 바꾸지 않는다.
export function createPublishedArticleCatalog(
  source: DraftSource, images: EditorImageSource, fixtures: readonly FeedArticle[],
): ArticleCatalog {
  if (fixtures.some(article => article.id.startsWith(PREFIX))) throw new Error('reserved-article-id');
  let previous: readonly PublishedStory[] | null = null;
  let snapshot: readonly FeedArticle[] = fixtures;
  function getSnapshot(): readonly FeedArticle[] {
    const current = source.getPublishedSnapshot();
    if (previous !== current) {
      previous = current;
      snapshot = [...fixtures, ...current.filter(validPublishedStory).map(story => toPublishedArticle(story, images))];
    }
    return snapshot;
  }
  return {
    getSnapshot,
    subscribe(listener) {
      let observed = getSnapshot();
      return source.subscribe(() => {
        const next = getSnapshot();
        if (observed !== next) { observed = next; listener(); }
      });
    },
  };
}
