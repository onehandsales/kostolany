import { useImperativeHandle, useRef, useState, type Ref } from 'react';
import { Text, TextInput, View } from 'react-native';
import { parseDocument } from 'htmlparser2';
import type { EnrichedTextInputProps } from 'react-native-enriched-html';

type HtmlEvent = { nativeEvent: { value: string } };
type Selection = { start: number; end: number };
type NativeHandle = {
  setValue: (html: string) => void; setSelection: (start: number, end: number) => void;
  focus: () => void; blur: () => void; requestHTML: (id: number) => void;
};
type Props = {
  ref?: Ref<NativeHandle>; defaultValue?: string; accessibilityLabel?: string;
  onChangeText?: (event: HtmlEvent) => void; onChangeHtml?: (event: HtmlEvent) => void;
  onChangeSelection?: (event: { nativeEvent: Selection & { text: string } }) => void;
  onRequestHtmlResult?: (event: { nativeEvent: { requestId: number; html: string } }) => void;
  onInputFocus?: () => void; onInputBlur?: () => void;
} & Pick<EnrichedTextInputProps, 'onChangeState'>;
type HtmlNode = ReturnType<typeof parseDocument>['children'][number];
function textFromNodes(nodes: HtmlNode[]): string {
  return nodes.map(node => {
    if (node.type === 'text') return node.data;
    if (node.type !== 'tag') return '';
    if (node.name === 'br') return '\n';
    if (node.name === 'img') return '\uFFFC';
    const text = textFromNodes(node.children);
    return ['p', 'li', 'h1', 'h2'].includes(node.name) ? `${text}\n` : text;
  }).join('');
}
const plainText = (html: string) => textFromNodes(parseDocument(html).children).replace(/\n$/u, '');
const plainHtml = (text: string) => text.split('\n').map(line => `<p>${line.replace(/&/gu, '&amp;').replace(/</gu, '&lt;').replace(/>/gu, '&gt;')}</p>`).join('');

// Jest에서 실행할 수 없는 native view와 명령만 대체하고 라이브러리 JS·앱·저장 변환은 실제 코드를 쓴다.
export function NativeEditorMock({ ref, ...props }: Props) {
  const [html, setHtml] = useState(props.defaultValue ?? '');
  const [selection, setSelection] = useState<Selection>({ start: 0, end: 0 });
  const value = useRef(html);
  const input = useRef<TextInput>(null);
  function changeHtml(event: HtmlEvent) {
    value.current = event.nativeEvent.value;
    setHtml(value.current);
    props.onChangeText?.({ nativeEvent: { value: plainText(value.current) } });
    props.onChangeHtml?.(event);
  }
  useImperativeHandle(ref, () => ({
    setValue: next => changeHtml({ nativeEvent: { value: next } }),
    setSelection: (start, end) => setSelection({ start, end }),
    focus: () => { input.current?.focus(); props.onInputFocus?.(); },
    blur: () => { input.current?.blur(); props.onInputBlur?.(); },
    requestHTML: requestId => props.onRequestHtmlResult?.({ nativeEvent: { requestId, html: value.current } }),
  }));
  return <View testID={`native-editor-${props.accessibilityLabel}`} accessibilityValue={{ text: html }}
    {...{ onChangeHtml: changeHtml, onRequestHtmlResult: props.onRequestHtmlResult,
      onChangeState: props.onChangeState, onNativeText: props.onChangeText }}>
    <TextInput ref={input} accessibilityLabel={props.accessibilityLabel} multiline selection={selection}
      onFocus={props.onInputFocus} onBlur={props.onInputBlur}
      onChangeText={text => changeHtml({ nativeEvent: { value: plainHtml(text) } })}
      onSelectionChange={event => {
        const range = event.nativeEvent.selection;
        setSelection(range);
        props.onChangeSelection?.({ nativeEvent: { ...range, text: plainText(value.current).slice(range.start, range.end) } });
      }}>
      {plainText(html).split('\n').map((line, index) => <Text key={index}>{line}</Text>)}
    </TextInput>
  </View>;
}

export const nativeEditorCommands = {
  setValue: jest.fn((target: NativeHandle, html: string) => target.setValue(html)),
  setSelection: jest.fn((target: NativeHandle, start: number, end: number) => target.setSelection(start, end)),
  focus: jest.fn((target: NativeHandle) => target.focus()),
  blur: jest.fn((target: NativeHandle) => target.blur()),
  requestHTML: jest.fn((target: NativeHandle, id: number) => target.requestHTML(id)),
  toggleBold: jest.fn(), toggleItalic: jest.fn(),
};
