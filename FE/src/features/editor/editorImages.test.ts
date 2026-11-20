import { changeBody, editorOutput, editorSections, emptyEditor, insertImage, mergeEditorSection, removeImage, replaceText, selectText, sliceEditor, toggleFormat } from './editorModel';

const photo = { id: 'one', assetId: 'local-sunset', source: 'library' as const, description: '노을', credit: 'Local fixture', width: 240, height: 168 };
it('문단 사이에 이미지를 삽입하고 같은 작업을 다시 적용해도 하나만 남으며 서식과 출력 순서를 보존한다', () => {
  let value = changeBody(emptyEditor(), '첫 문단\n둘째 문단');
  value = toggleFormat(selectText(value, { start: 0, end: 4 }), { kind: 'bold' });
  value = insertImage(value, photo); value = insertImage(value, photo);
  expect(value.document.body).toBe('첫 문단\n\uFFFC\n\n둘째 문단');
  expect(value.document.images).toHaveLength(1);
  expect(editorOutput(value.document).blocks.map(block => block.type)).toEqual(['paragraph', 'image', 'paragraph', 'paragraph']);
  expect(editorOutput(value.document).blocks[0]?.content[0]?.formats).toEqual([{ kind: 'bold' }]);
  expect(editorOutput(value.document).blocks[1]?.image?.assetId).toBe('local-sunset');
});
it('이미지 앞뒤 텍스트 수정은 자산 위치와 다른 구간의 서식을 유지하며 삭제는 원본 자산을 변경하지 않는다', () => {
  let value = insertImage(changeBody(emptyEditor(), '앞'), photo);
  value = replaceText(value, value.selection, '뒤');
  let after = editorSections(value.document).at(-1)!;
  let section = sliceEditor(value, after.start, after.end);
  section = toggleFormat(selectText(section, { start: 0, end: 1 }), { kind: 'italic' });
  value = mergeEditorSection(value, after.start, after.end, section);
  value = mergeEditorSection(value, 0, 1, changeBody(sliceEditor(value, 0, 1), '길어진 앞'));
  expect(value.document.images[0]?.offset).toBe(6);
  after = editorSections(value.document).at(-1)!;
  expect(sliceEditor(value, after.start, after.end).document.marks).toEqual([{ kind: 'italic', start: 0, end: 1 }]);
  value = removeImage(value, 'one'); expect(value.document.body).toBe('길어진 앞\n뒤');
  expect(value.document.images).toEqual([]); expect(photo.assetId).toBe('local-sunset');
  expect(editorOutput(value.document).blocks[1]?.content[0]?.formats).toEqual([{ kind: 'italic' }]);
});
it('빈 문서의 이미지와 여러 이미지 삭제는 남은 이미지 및 입력 영역을 유지한다', () => {
  let value = insertImage(emptyEditor(), photo);
  value = insertImage(value, { ...photo, id: 'two' });
  value = removeImage(value, 'one');
  expect(value.document.images.map(image => image.id)).toEqual(['two']);
  expect(value.document.body[value.document.images[0]!.offset]).toBe('\uFFFC');
  value = removeImage(value, 'two'); expect(value.document.images).toEqual([]);
  expect(changeBody(value, '다시 입력').document.body).toBe('다시 입력');
});
