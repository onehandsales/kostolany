import { useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { nativeEditorCommands } from '../../../test/nativeEditorMock';
import { RichBody } from './RichBody';
import { changeBody, emptyEditor, selectText, setBlock, toggleFormat, type EditorValue } from './editorModel';

function setup(initial: EditorValue) {
  let current = initial;
  let update: (next: EditorValue) => void = () => {};
  function Editor() {
    const [value, setValue] = useState(initial);
    current = value; update = setValue;
    return <RichBody value={value} onChange={setValue} onSelect={range => setValue(previous => selectText(previous, range))}
      onFocus={() => {}} onBlur={() => {}} onComposing={() => {}} focusRequest={0} dismissRequest={0} />;
  }
  return { node: <Editor />, value: () => current, change: (next: EditorValue) => act(() => update(next)) };
}
const input = () => screen.getByLabelText('글 본문');
const html = () => screen.getByTestId('native-editor-글 본문').props.accessibilityValue.text;
const changeHtml = (value: string) => fireEvent(input(), 'changeHtml', { nativeEvent: { value } });
const select = (start: number, end = start) =>
  fireEvent(input(), 'selectionChange', { nativeEvent: { selection: { start, end } } });

it('사진 앞 줄바꿈 삭제가 같은 저장 문서로 정규화돼도 native 입력에 독립 이미지 행을 다시 반영한다', async () => {
  const initial = changeBody(emptyEditor(), 'Before\n\uFFFC\nAfter');
  initial.document.images = [{ id: 'photo', offset: 7, assetId: 'asset', source: 'library', description: 'photo', credit: '', width: 240, height: 160 }];
  const editor = setup(initial); await render(editor.node);
  await changeHtml('<p>Before<img src="kostolany-image:photo" width="240" height="160"/></p><p>After</p>');
  expect(editor.value().document.body).toBe(initial.document.body);
  expect(html()).toContain('<p><img');
  expect(nativeEditorCommands.setValue).toHaveBeenCalledWith(expect.anything(), expect.stringContaining('<p><img'));
});

it('Android Cut이 먼저 내보내는 이미지 span 없는 중간 HTML을 저장하거나 이력에 추가하지 않는다', async () => {
  const initial = changeBody(emptyEditor(), 'Before\n\uFFFC\nAfter');
  initial.document.images = [{ id: 'photo', offset: 7, assetId: 'asset', source: 'library', description: 'photo', credit: '', width: 240, height: 160 }];
  const editor = setup(initial); await render(editor.node);
  await changeHtml('<p>Before</p><p>&#65532;</p><p>After</p>');
  expect(editor.value()).toBe(initial);
  await changeHtml('<p></p>'); expect(editor.value().document.body).toBe('');
  await editor.change({ ...initial, document: { ...initial.document, version: editor.value().document.version + 1 } });
  expect(html()).toContain('<img'); expect(editor.value().document.images[0]?.id).toBe('photo');
});

it('한 입력 영역에서 일반·인용·목록·구분선을 표시하고 여러 문단을 연속 선택한다', async () => {
  const initial = changeBody(emptyEditor(), '일반\n인용\n• 한글 😀\n· · ·');
  initial.document.blocks = ['paragraph', 'quote', 'bullet', 'divider'];
  const editor = setup(initial);
  await render(editor.node);
  expect(screen.getAllByLabelText('글 본문')).toHaveLength(1);
  expect(html()).toBe('<p>일반</p><blockquote><p><i>인용</i></p></blockquote><ul><li>한글 😀</li></ul><p style="text-align: center">· · ·</p>');
  await select(0, 11);
  expect(editor.value().selection).toEqual({ start: 0, end: 13 });
  await editor.change(toggleFormat(editor.value(), { kind: 'bold' }));
  expect(nativeEditorCommands.setSelection).toHaveBeenLastCalledWith(expect.anything(), 0, 11);
  expect(editor.value().document.marks).toContainEqual({ kind: 'bold', start: 0, end: 13 });
});

it('native의 목록 Return·빈 항목 종료·문단 합치기 결과를 기존 저장 형식으로 반영한다', async () => {
  const editor = setup(setBlock(changeBody(emptyEditor(), '첫 항목'), 'numbered'));
  await render(editor.node);
  await select(4);
  await changeHtml('<ol><li>첫 항목</li><li></li></ol>');
  expect(editor.value().document.body).toBe('1. 첫 항목\n2. ');
  await select(5);
  await changeHtml('<ol><li>첫 항목</li></ol><br>');
  expect(editor.value().document.body).toBe('1. 첫 항목\n');
  expect(editor.value().document.blocks).toEqual(['numbered', 'paragraph']);
  await changeHtml('<ol><li>첫 항목다음</li></ol>');
  expect(editor.value().document.body).toBe('1. 첫 항목다음');
});

it('앞 문단의 한글 입력과 붙여넣기 후 뒤 문단의 굵게·이모지·선택을 보존한다', async () => {
  let initial = changeBody(emptyEditor(), '앞\n뒤 😀');
  initial = toggleFormat(selectText(initial, { start: 2, end: 3 }), { kind: 'bold' });
  const editor = setup(initial);
  await render(editor.node);
  await select(1);
  await changeHtml('<p>앞 한글</p><p>중간</p><p><b>뒤</b> 😀</p>');
  expect(editor.value().document.body).toBe('앞 한글\n중간\n뒤 😀');
  expect(editor.value().document.marks).toEqual([{ kind: 'bold', start: 8, end: 9 }]);
  await select(10, 12);
  expect(editor.value().selection).toEqual({ start: 10, end: 12 });
  await select(0, 99);
  expect(editor.value().selection).toEqual({ start: 10, end: 12 });
});

it('서식 반영 뒤 사용자가 입력한 새 HTML을 늦은 getHTML 응답이 되돌리지 않는다', async () => {
  const editor = setup(selectText(changeBody(emptyEditor(), '문장'), { start: 0, end: 2 }));
  await render(editor.node);
  nativeEditorCommands.requestHTML.mockImplementationOnce(() => {});
  await editor.change(setBlock(editor.value(), 'quote'));
  const requestId = nativeEditorCommands.requestHTML.mock.lastCall?.[1];
  await changeHtml('<blockquote><p><i>문장 추가</i></p></blockquote>');
  await fireEvent(input(), 'requestHtmlResult', { nativeEvent: { requestId, html: '<blockquote><p><i>문장</i></p></blockquote>' } });
  expect(editor.value().document.body).toBe('문장 추가');
  expect(editor.value().document.blocks).toEqual(['quote']);
});

it('외부 서식 명령 전의 지연 HTML은 무시하고 마지막 명령의 반영과 입력만 받아들인다', async () => {
  const editor = setup(changeBody(emptyEditor(), '원문'));
  await render(editor.node);
  nativeEditorCommands.setValue.mockImplementationOnce(() => {});
  nativeEditorCommands.requestHTML.mockImplementationOnce(() => {});
  await editor.change(setBlock(editor.value(), 'quote'));
  await changeHtml('<p>이전 입력</p>');
  expect(editor.value().document.body).toBe('원문');
  await changeHtml('<blockquote><p><i>원문</i></p></blockquote>');
  await changeHtml('<blockquote><p><i>원문 최신</i></p></blockquote>');
  expect(editor.value().document.body).toBe('원문 최신');
});

it('화면 이탈 뒤 native HTML 요청이 끝나도 새 문서에 변경을 전하지 않는다', async () => {
  const editor = setup(changeBody(emptyEditor(), '이전 문서'));
  const view = await render(editor.node);
  nativeEditorCommands.requestHTML.mockImplementationOnce(() => {});
  await editor.change(setBlock(editor.value(), 'quote'));
  const snapshot = editor.value();
  const receive = screen.getByTestId('native-editor-글 본문').props.onRequestHtmlResult;
  const requestId = nativeEditorCommands.requestHTML.mock.lastCall?.[1];
  await view.unmount();
  await act(() => receive({ nativeEvent: { requestId, html: '<p>늦은 이전 문서</p>' } }));
  expect(editor.value()).toBe(snapshot);
  await render(<RichBody value={emptyEditor()} onChange={jest.fn()} onSelect={jest.fn()}
    onFocus={jest.fn()} onBlur={jest.fn()} onComposing={jest.fn()} focusRequest={0} dismissRequest={0} />);
  expect(html()).toBe('<p></p>');
});

it('확정 HTML을 기다리는 조합 입력 동안 서식·발행 잠금을 알리고 확정 뒤 해제한다', async () => {
  const composing = jest.fn();
  const onChange = jest.fn();
  await render(<RichBody value={emptyEditor()} onChange={onChange} onSelect={jest.fn()}
    onFocus={jest.fn()} onBlur={jest.fn()} onComposing={composing} focusRequest={0} dismissRequest={0} />);
  await fireEvent(input(), 'nativeText', { nativeEvent: { value: 'ㅎ' } });
  expect(composing).toHaveBeenLastCalledWith(true);
  expect(onChange).not.toHaveBeenCalled();
  await changeHtml('<p>한</p>');
  expect(composing).toHaveBeenLastCalledWith(false);
  expect(onChange.mock.lastCall?.[0].document.body).toBe('한');
});

it('접힌 커서에서 누른 굵게는 native 입력 서식으로 전달하고 다음 입력의 mark를 저장한다', async () => {
  const editor = setup(changeBody(emptyEditor(), '앞'));
  await render(editor.node);
  await fireEvent(input(), 'focus');
  await fireEvent(input(), 'changeState', { nativeEvent: {
    bold: { isActive: false, isBlocking: false }, italic: { isActive: false, isBlocking: false },
  } });
  await editor.change(toggleFormat(editor.value(), { kind: 'bold' }));
  expect(nativeEditorCommands.toggleBold).toHaveBeenCalledTimes(1);
  await changeHtml('<p>앞<b>뒤</b></p>');
  expect(editor.value().document.marks).toEqual([{ start: 1, end: 2, kind: 'bold' }]);
});
