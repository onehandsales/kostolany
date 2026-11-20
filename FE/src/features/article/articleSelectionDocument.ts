import { createSelectionDocument } from '../highlights/selectionDocument';
import type { ArticleDetail } from './types';

export function articleSelectionDocument(article: ArticleDetail) {
  return createSelectionDocument(article.id, article.title, article.sourceName,
    article.referenceContent ? article.referenceContent.blocks.map(block => {
      if (block.kind === 'text') return { text: block.text, selectable: true };
      if (block.kind === 'missing') return { text: '[Uncaptured paragraphs omitted]', selectable: false };
      if (block.kind === 'image') return { text: block.caption, selectable: false };
      return { text: '· · ·', selectable: false };
    }) : article.reference ? [{ text: article.subtitle || article.title, selectable: true }]
      : article.facts.map(text => ({ text, selectable: true })));
}
