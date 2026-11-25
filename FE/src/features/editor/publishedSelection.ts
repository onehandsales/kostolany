import { createSelectionDocument } from '../highlights/selectionDocument';
import { editorOutput, type EditorDocument } from './editorModel';
import { publishedArticleId } from './publishedArticle';
import type { PublishedStory } from './publishing';

// 화면에 표시하는 목록 번호까지 같은 원문에 포함하고 이미지와 구분선은 선택 경계로 남긴다.
export function documentReaderBlocks(document: EditorDocument) {
  const blocks = editorOutput(document).blocks;
  return blocks.map((block, index) => {
    const prefix = block.type === 'bullet' ? '• ' : block.type === 'numbered'
      ? `${index - blocks.slice(0, index).findLastIndex(item => item.type !== 'numbered')}. ` : '';
    const text = block.type === 'image' ? '\uFFFC' : block.type === 'divider' ? '· · ·'
      : prefix + block.content.map(part => part.text).join('');
    return { ...block, prefix, text, selectable: block.type !== 'image' && block.type !== 'divider' };
  });
}

export function publishedSelectionDocument(story: PublishedStory) {
  return createSelectionDocument(publishedArticleId(story.id), story.document.title, story.authorName,
    documentReaderBlocks(story.document).map(({ text, selectable }) => ({ text, selectable })));
}
