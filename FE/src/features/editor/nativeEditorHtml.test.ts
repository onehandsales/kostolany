import { changeBody, emptyEditor, selectText, setBlock, toggleFormat } from './editorModel';
import { editorHtml, modelEditorSelection, nativeEditorSelection, nativeEditorText, parseEditorHtml, valueFromNativeHtml } from './nativeEditorHtml';

it('서로 다른 문단 서식과 링크·멘션·이모지를 native HTML 경계에서 왕복해도 저장 문서가 보존된다', () => {
  const value = changeBody(emptyEditor(), '제목\n인용 😀\n• 목록\n1. 번호\n· · ·\n가운데\n코드\n독자 & 링크');
  value.document.blocks = ['heading', 'quote', 'bullet', 'numbered', 'divider', 'pullquote', 'code', 'paragraph'];
  const start = value.document.body.indexOf('독자');
  value.document.mentions = [{ start, end: start + 2, target: { id: 'reader-a', name: '독자', handle: 'reader' } }];
  const link = value.document.body.indexOf('링크');
  value.document.marks = [{ start: link, end: link + 2, kind: 'link', url: 'https://example.com/?a=1&b=2' }];
  const result = parseEditorHtml(editorHtml(value.document), value);
  expect(result.document.body).toBe(value.document.body);
  expect(result.document.blocks).toEqual(value.document.blocks);
  expect(result.document.mentions).toEqual(value.document.mentions);
  expect(result.document.marks).toEqual(value.document.marks);
  expect(result.text).toBe('제목\n인용 😀\n목록\n번호\n· · ·\n가운데\n코드\n독자 & 링크');
});

it('native 목록의 기호 없는 UTF-16 좌표를 여러 문단에 걸친 저장 좌표로 변환한다', () => {
  const value = changeBody(emptyEditor(), '앞\n• 한글 😀\n1. 마지막');
  value.document.blocks = ['paragraph', 'bullet', 'numbered'];
  expect(nativeEditorText(value.document)).toBe('앞\n한글 😀\n마지막');
  expect(modelEditorSelection(value.document, { start: 5, end: 11 })).toEqual({ start: 7, end: 16 });
  expect(nativeEditorSelection(value.document, { start: 7, end: 16 })).toEqual({ start: 5, end: 11 });
  expect(modelEditorSelection(value.document, { start: 0, end: 8 })).toEqual({ start: 0, end: 10 });
  expect(modelEditorSelection(value.document, { start: 8, end: 8 })).toEqual({ start: 13, end: 13 });
  expect(modelEditorSelection(value.document, { start: 0, end: 99 })).toBeNull();
});

it('실제 native 출력 형태의 빈 문단·목록·인용·혼합 mark를 저장 모델로 읽는다', () => {
  const html = '<html><p>일반</p><br><blockquote><p><i>인용</i></p></blockquote><ul><li>한글 <b>😀</b></li><li></li></ul><p style="text-align: center">· · ·</p><br></html>';
  const result = valueFromNativeHtml(html, emptyEditor(), { start: 10, end: 12 });
  expect(result.document.body).toBe('일반\n\n인용\n• 한글 😀\n• \n· · ·\n');
  expect(result.document.blocks).toEqual(['paragraph', 'paragraph', 'quote', 'bullet', 'bullet', 'divider', 'paragraph']);
  expect(result.document.marks).toEqual([{ start: 12, end: 14, kind: 'bold' }]);
  expect(result.document.body.slice(result.selection.start, result.selection.end)).toBe('😀');
});

it('인용의 표시용 기울임을 저장 mark로 추가하지 않고 원래 기울임은 해제 후에도 남긴다', () => {
  let value = changeBody(emptyEditor(), '원래 기울임');
  value = toggleFormat(selectText(value, { start: 0, end: 2 }), { kind: 'italic' });
  value = setBlock(value, 'quote');
  value = selectText(value, { start: 6, end: 6 });
  const result = valueFromNativeHtml('<blockquote><p><i>원래 기울임 추가</i></p></blockquote>', value);
  expect(result.document.marks).toEqual([{ start: 0, end: 2, kind: 'italic' }]);
  expect(setBlock(result, 'paragraph').document.marks).toEqual([{ start: 0, end: 2, kind: 'italic' }]);
});

it('HTML 특수 문자를 원문으로 보존하며 위험한 링크와 외부 이미지 태그는 저장하지 않는다', () => {
  const result = valueFromNativeHtml('<p>&lt;한글&gt; &amp; <a href="javascript:alert(1)">링크</a><script>bad()</script><img src="https://example.com/image"></p>', emptyEditor());
  expect(result.document.body).toBe('<한글> & 링크');
  expect(result.document.marks).toEqual([]);
  expect(result.document.images).toEqual([]);
  expect(editorHtml(result.document)).toBe('<p>&lt;한글&gt; &amp; 링크</p>');
});

it('굵게·기울임·링크 중첩 순서가 바뀐 native 출력도 같은 정규 HTML로 수렴한다', () => {
  const first = valueFromNativeHtml('<p><b><i><a href="https://example.com">겹침</a></i></b></p>', emptyEditor());
  const html = editorHtml(first.document);
  const second = valueFromNativeHtml(html, first);
  expect(editorHtml(second.document)).toBe(html);
  expect(editorHtml(valueFromNativeHtml(editorHtml(second.document), second).document)).toBe(html);
});

it('이름 중간의 mark가 멘션 ID·표시 이름을 쪼개지 않는다', () => {
  const value = changeBody(emptyEditor(), 'Sam Lee');
  value.document.mentions = [{ start: 0, end: 7, target: { id: 'sam', name: 'Sam Lee', handle: 'samlee' } }];
  value.document.marks = [{ start: 0, end: 3, kind: 'bold' }];
  const html = editorHtml(value.document);
  expect(html.match(/<mention /gu)).toHaveLength(1);
  const result = valueFromNativeHtml(html, value);
  expect(result.document.mentions).toEqual(value.document.mentions);
  expect(result.document.marks).toEqual(value.document.marks);
});

it('여러 문단에 적용한 굵게는 native HTML이 문단마다 mark를 나눠도 연속 선택의 활성 서식을 유지한다', () => {
  const value = valueFromNativeHtml('<p><b>첫 문단</b></p><ul><li><b>목록</b></li></ul><p><b>마지막</b></p>', emptyEditor(), { start: 0, end: 11 });
  expect(value.document.body).toBe('첫 문단\n• 목록\n마지막');
  expect(value.document.marks).toEqual([{ start: 0, end: 13, kind: 'bold' }]);
  expect(value.typing).toEqual([{ kind: 'bold' }]);
});
