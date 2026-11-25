import type { ArticleDetail } from '../article/types';
import type { FeedArticle } from '../feed/types';
import { articleWriter, publicIdentity } from '../community/data/publicDirectory';
import type { ShareTarget } from './types';

export function articleShareTarget(article: ArticleDetail | FeedArticle): ShareTarget {
  const author = articleWriter(article.id);
  const published = 'publishedStory' in article ? article.publishedStory : undefined;
  return {
    kind: published ? 'written' : 'article',
    id: published?.id ?? article.id,
    title: article.title,
    subtitle: 'subtitle' in article ? article.subtitle : article.summary,
    readingMinutes: article.readingMinutes,
    authorId: published?.ownerId ?? author?.id,
    authorName: publicIdentity(author ?? { kind: 'writer', id: '' })?.name ?? article.sourceName,
    avatar: article.reference?.avatar,
    visibility: published?.unlisted ? 'unlisted' : 'public',
    memberOnly: article.reference?.memberOnly ?? false,
  };
}
