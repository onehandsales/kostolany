import { changeBody, emptyEditor, type EditorDocument } from './editorModel';
import { documentReaderBlocks, publishedSelectionDocument } from './publishedSelection';
import { emptyPublishOptions, type PublishedStory } from './publishing';
import { passageAt, resolvePassage } from '../highlights/selectionDocument';

function story(document: EditorDocument): PublishedStory {
  return { id: 'story/한글', draftId: 'draft', userId: 'author', authorName: '작가', document,
    publishing: emptyPublishOptions(), publishedAt: '2026-11-25T00:00:00Z' };
}

it('발행 화면의 목록 번호와 이모지 UTF-16 범위를 일치시키고 원문 변경 시 이전 강조를 거절한다', () => {
  const document: EditorDocument = { ...changeBody(emptyEditor(), '9. 첫 항목 😀\n10. 둘째 항목\n끝').document,
    title: '제목', blocks: ['numbered', 'numbered', 'paragraph'] };
  expect(documentReaderBlocks(document).map(block => block.text)).toEqual(['1. 첫 항목 😀', '2. 둘째 항목', '끝']);
  const selected = publishedSelectionDocument(story(document));
  const emoji = selected.text.indexOf('😀');
  expect(passageAt(selected, emoji, emoji + 1)).toBeNull();
  const passage = passageAt(selected, 3, selected.blocks[1]!.end)!;
  expect(passage.text).toBe('첫 항목 😀\n\n2. 둘째 항목');
  expect(resolvePassage(selected, passage)).toBe(true);
  const updated = publishedSelectionDocument(story({ ...document, body: document.body.replace('둘째', '변경') }));
  expect(resolvePassage(updated, passage)).toBe(false);
});

it('이미지와 구분선을 넘는 인용을 거절하고 그 뒤 문단은 독립적으로 선택한다', () => {
  const document: EditorDocument = { ...changeBody(emptyEditor(), '앞\n\uFFFC\n뒤\n· · ·\n마지막').document,
    title: '이미지 글', blocks: ['paragraph', 'paragraph', 'paragraph', 'divider', 'paragraph'],
    images: [{ id: 'image', assetId: 'local-sunset', source: 'unsplash', description: '사진', credit: '', offset: 2, width: 240, height: 168 }] };
  const selected = publishedSelectionDocument(story(document));
  expect(passageAt(selected, 0, selected.text.indexOf('뒤') + 1)).toBeNull();
  expect(passageAt(selected, selected.text.indexOf('뒤'), selected.text.length)).toBeNull();
  expect(passageAt(selected, selected.text.indexOf('마지막'), selected.text.length)?.text).toBe('마지막');
});
