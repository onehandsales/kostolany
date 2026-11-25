import { changeBody, editorOutput, editorSections, emptyEditor, insertImage, mergeEditorSection, removeImage, replaceText, selectText, setBlock, sliceEditor, toggleFormat, validEditorDocument } from './editorModel';

const photo = { id: 'one', assetId: 'local-sunset', source: 'library' as const, description: '노을', credit: 'Local fixture', width: 240, height: 168 };
it('사진을 먼저 삽입한 뒤 앞쪽에 입력한 한글과 이모지 문단을 서식과 커서까지 보존한다', () => {
  let value = insertImage(emptyEditor(), photo);
  const text = '첫 문단 🙂\n둘째 문단\n';
  let section = changeBody(sliceEditor(value, 0, 0), text);
  section = setBlock(selectText(section, { start: 0, end: 0 }), 'quote');
  section = toggleFormat(selectText(section, { start: 0, end: 4 }), { kind: 'bold' });
  section = selectText(section, { start: text.length, end: text.length });
  value = mergeEditorSection(value, 0, 0, section);
  expect(validEditorDocument(value.document)).toBe(true);
  expect(value.document.body).toBe(`${text}\n\uFFFC\n`);
  expect(value.document.images[0]?.offset).toBe(text.length + 1);
  expect(value.selection).toEqual({ start: text.length, end: text.length });
  const before = editorSections(value.document)[0]!;
  expect(sliceEditor(value, before.start, before.end).document.body).toBe(text);
  expect(value.document.blocks).toEqual(['quote', 'paragraph', 'paragraph', 'paragraph', 'paragraph']);
  expect(value.document.marks).toContainEqual({ kind: 'bold', start: 0, end: 4 });
});
it('사진 앞 빈 구간의 반복 입력과 지우기는 경계를 중복 추가하지 않고 다른 이미지와 뒷문단을 보존한다', () => {
  let value = insertImage(emptyEditor(), photo);
  value = insertImage(value, { ...photo, id: 'two' });
  value = replaceText(value, value.selection, '뒷문단');
  const initial = value.document.body;
  value = mergeEditorSection(value, 0, 0, sliceEditor(value, 0, 0));
  expect(value.document.body).toBe(initial);
  for (const text of ['앞', '앞 문단', '', '다시 입력']) {
    const before = editorSections(value.document)[0]!;
    value = mergeEditorSection(value, before.start, before.end, changeBody(sliceEditor(value, before.start, before.end), text));
    expect(validEditorDocument(value.document)).toBe(true);
    expect(value.document.body).toBe(`${text}\n${initial}`);
    expect(value.document.images.map(image => image.id)).toEqual(['one', 'two']);
  }
  value = removeImage(value, 'one');
  expect(validEditorDocument(value.document)).toBe(true);
  expect(value.document.body).toBe('다시 입력\n\n\uFFFC\n뒷문단');
  expect(value.document.images.map(image => image.id)).toEqual(['two']);
});
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
