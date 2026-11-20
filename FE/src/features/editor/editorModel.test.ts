import { changeBody, editorOutput, emptyEditor, insertDivider, insertParagraph, replaceText, safeLink, selectText, setBlock, toggleFormat } from './editorModel';

it('선택한 한국어와 이모지에 굵기·기울임을 적용하고 일부 해제해도 나머지 구간을 보존한다', () => {
  let value = changeBody(emptyEditor(), '한글😀 문장');
  value = selectText(value, { start: 0, end: 4 });
  value = toggleFormat(toggleFormat(value, { kind: 'bold' }), { kind: 'italic' });
  value = selectText(value, { start: 0, end: 2 }); value = toggleFormat(value, { kind: 'bold' });
  expect(editorOutput(value.document).blocks[0]?.content).toEqual([
    { text: '한글', formats: [{ kind: 'italic' }] },
    { text: '😀', formats: [{ kind: 'italic' }, { kind: 'bold' }] },
    { text: ' 문장', formats: [] },
  ]);
});
it('커서의 서식 토글은 기존 텍스트를 바꾸지 않고 새 입력과 삭제 범위를 정확히 반영한다', () => {
  let value = changeBody(emptyEditor(), '앞 뒤'); value = selectText(value, { start: 2, end: 2 });
  value = toggleFormat(value, { kind: 'bold' }); expect(value.document.marks).toEqual([]);
  value = replaceText(value, value.selection, '굵게');
  expect(value.document.body).toBe('앞 굵게뒤'); expect(value.document.marks).toEqual([{ kind: 'bold', start: 2, end: 4 }]);
  value = toggleFormat(value, { kind: 'bold' }); value = replaceText(value, value.selection, '일반');
  expect(value.document.marks).toEqual([{ kind: 'bold', start: 2, end: 4 }]);
  value = changeBody(value, '앞 뒤'); expect(value.document.marks).toEqual([]);
});
it('여러 문단 선택은 경계 다음 문단을 건드리지 않고 헤더·인용·코드 출력 계약을 유지한다', () => {
  let value = changeBody(emptyEditor(), '첫 문단\n둘째\n셋째');
  value = setBlock(selectText(value, { start: 0, end: 8 }), 'quote');
  expect(value.document.blocks).toEqual(['quote', 'quote', 'paragraph']);
  value = setBlock(selectText(value, { start: 5, end: 7 }), 'heading');
  value = setBlock(selectText(value, { start: 9, end: 11 }), 'code');
  expect(editorOutput(value.document).blocks.map(block => block.type)).toEqual(['quote', 'heading', 'code']);
  expect(value.document.body).toBe('첫 문단\n둘째\n셋째');
});
it('글머리·번호 목록 전환은 텍스트와 선택을 보존하고 줄바꿈과 빈 목록 종료를 처리한다', () => {
  let value = setBlock(changeBody(emptyEditor(), '문장'), 'bullet');
  expect(value.document.body).toBe('• 문장'); expect(value.selection).toEqual({ start: 4, end: 4 });
  value = insertParagraph(value); expect(value.document.body).toBe('• 문장\n• ');
  value = insertParagraph(value); expect(value.document.body).toBe('• 문장\n'); expect(value.document.blocks[1]).toBe('paragraph');
  value = setBlock(selectText(value, { start: 0, end: 4 }), 'numbered');
  expect(value.document.body).toBe('1. 문장\n'); expect(editorOutput(value.document).blocks[0]?.content[0]?.text).toBe('문장');
  value = selectText(value, { start: 5, end: 5 }); value = changeBody(value, '1. 문장\n\n');
  expect(value.document.body).toContain('2. ');
  value = changeBody(value, '문장\n2. \n'); expect(value.document.blocks[0]).toBe('paragraph');
});
it('구분선은 문단 뒤에 삽입하고 뒤의 입력 문단과 기존 본문을 유지한다', () => {
  const value = insertDivider(changeBody(emptyEditor(), '앞 문단'));
  expect(value.document.body).toBe('앞 문단\n· · ·\n');
  expect(editorOutput(value.document).blocks).toEqual([
    { type: 'paragraph', content: [{ text: '앞 문단', formats: [] }] },
    { type: 'divider', content: [] }, { type: 'paragraph', content: [] },
  ]);
});
it('링크는 안전한 웹 주소만 허용하고 교체·해제 시 본문과 다른 서식을 보존한다', () => {
  expect(safeLink('example.com/path')).toBe('https://example.com/path');
  for (const input of ['javascript:alert(1)', 'data:text/html,test', 'https://user:pass@example.com', 'https://exa mple.com', '']) expect(safeLink(input)).toBeNull();
  let value = selectText(changeBody(emptyEditor(), '연결 문장'), { start: 0, end: 2 });
  value = toggleFormat(value, { kind: 'bold' });
  expect(toggleFormat(value, { kind: 'link', url: 'javascript:alert(1)' })).toBe(value);
  value = toggleFormat(value, { kind: 'link', url: 'https://example.com/' });
  value = toggleFormat(value, { kind: 'link', url: 'https://example.com/' });
  expect(value.document.body).toBe('연결 문장'); expect(value.document.marks).toEqual([{ kind: 'bold', start: 0, end: 2 }]);
});
it('줄바꿈이 있는 붙여넣기와 긴 본문 교체에서도 범위와 블록 수가 일치한다', () => {
  let value = changeBody(emptyEditor(), '원래 문장');
  value = replaceText(value, { start: 0, end: 2 }, '<script>문자</script>\r\n두째');
  expect(value.document.body).toBe('<script>문자</script>\n두째 문장');
  value = changeBody(value, Array.from({ length: 150 }, (_, index) => `${index} 긴 한국어 문단 😀`).join('\n'));
  expect(editorOutput(value.document).blocks).toHaveLength(150);
  expect(selectText(value, { start: -1, end: 999999 }).selection).toEqual({ start: 0, end: value.document.body.length });
});
