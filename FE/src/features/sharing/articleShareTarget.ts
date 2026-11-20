import type { ArticleDetail } from '../article/types';
import type { FeedArticle } from '../feed/types';
import { articleWriter, publicIdentity } from '../community/data/publicDirectory';
import type { ShareTarget } from './types';

export function articleShareTarget(article: ArticleDetail | FeedArticle): ShareTarget {
  const author = articleWriter(article.id);
  return {
    kind: 'article',
    id: article.id,
    title: article.title,
    subtitle: 'subtitle' in article ? article.subtitle : article.summary,
    readingMinutes: article.readingMinutes,
    authorId: author?.id,
    authorName: publicIdentity(author ?? { kind: 'writer', id: '' })?.name ?? article.sourceName,
    avatar: article.reference?.avatar,
    visibility: 'public',
  };
}
