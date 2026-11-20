import { changeBody, editorOutput, emptyEditor, insertImage, insertMention, mentionQuery, mergeEditorSection, replaceText, selectText, sliceEditor } from './editorModel';
const sam = { id: 'sam-1', name: 'Sam Lee', handle: 'samlee' };
it('동명이인은 대상 ID와 핸들로 구분하고 붙여넣은 검색어·커서 이동·일반 이메일을 구분한다', () => {
  const value = changeBody(emptyEditor(), '안녕 @sam'); const range = mentionQuery(value)!;
  expect(range.query).toBe('sam'); expect(mentionQuery(selectText(value, { start: 0, end: 0 }))).toBeNull();
  expect(insertMention(selectText(value, { start: 0, end: 0 }), range, sam).document.mentions).toEqual([]);
  expect(mentionQuery(changeBody(emptyEditor(), 'hello@example.com'))).toBeNull();
  const first = insertMention(value, range, sam); const second = insertMention(value, range, { ...sam, id: 'sam-2', handle: 'sam.lee' });
  expect(first.document.body).toBe(second.document.body); expect(first.document.mentions[0]?.target.id).not.toBe(second.document.mentions[0]?.target.id);
  expect(editorOutput(first.document).blocks[0]?.content).toContainEqual({ text: 'Sam Lee', formats: [], mention: sam });
});
it('멘션 앞뒤 편집은 대상을 이동·보존하고 내부 수정과 전체 삭제는 일반 텍스트로 전환한다', () => {
  const typed = changeBody(emptyEditor(), '@sam'); const value = insertMention(typed, mentionQuery(typed)!, sam);
  const before = replaceText(value, { start: 0, end: 0 }, '앞 '); expect(before.document.mentions[0]?.start).toBe(2);
  const after = replaceText(before, { start: 9, end: 9 }, ' 뒤'); expect(after.document.mentions[0]?.target).toEqual(sam);
  expect(replaceText(after, { start: 3, end: 3 }, '수정').document.mentions).toEqual([]);
  expect(replaceText(value, { start: 0, end: 7 }, '').document.mentions).toEqual([]);
});
it('이미지 뒤 멘션은 부분 편집과 병합 뒤에도 원래 사용자와 전역 위치를 유지한다', () => {
  let value = insertImage(emptyEditor(), { id: 'photo', assetId: 'local-sunset', source: 'library', description: '', credit: '', width: 1, height: 1 });
  value = replaceText(value, value.selection, '@sam'); value = insertMention(value, mentionQuery(value)!, sam);
  const section = sliceEditor(value, 2, value.document.body.length); const edited = replaceText(section, section.selection, '본문');
  const merged = mergeEditorSection(value, 2, value.document.body.length, edited);
  expect(merged.document.mentions).toEqual(value.document.mentions); expect(merged.document.images).toEqual(value.document.images);
});
