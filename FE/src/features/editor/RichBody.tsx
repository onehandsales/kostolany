import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { EnrichedTextInput, type EnrichedTextInputInstance, type OnChangeStateEvent } from 'react-native-enriched-html';

import { useTheme } from '../../shared/theme/ThemeProvider';
import { fonts } from '../../shared/theme/tokens';
import { validEditorDocument, type EditorValue, type TextSelection } from './editorModel';
import { editorHtml, modelEditorSelection, nativeEditorSelection, nativeEditorText, valueFromNativeHtml, type EditorImageUris } from './nativeEditorHtml';

export type RichBodyProps = {
  value: EditorValue; onChange: (value: EditorValue) => void; onSelect: (selection: TextSelection) => void;
  onFocus: () => void; onBlur: () => void; onComposing: (value: boolean) => void;
  focusRequest: number; dismissRequest: number; label?: string; minHeight?: number; isActive?: boolean;
  imageUris?: EditorImageUris; imageWidth?: number;
};

// 이미지 사이의 연속 문서를 한 native 입력에 두어 문단 서식과 OS 연속 선택을 함께 유지한다.
export function RichBody(props: RichBodyProps) {
  const { colors } = useTheme();
  const input = useRef<EnrichedTextInputInstance>(null);
  const latest = useRef(props);
  const current = useRef(props.value);
  const mounted = useRef(false);
  const focused = useRef(false);
  const nativeText = useRef(nativeEditorText(props.value.document));
  const nativeRange = useRef<{ text: string; selection: TextSelection } | null>(null);
  const nativeStyles = useRef<OnChangeStateEvent | null>(null);
  const requested = useRef(props.focusRequest);
  const replacing = useRef(false);
  const replacement = useRef(0);
  const rendered = useRef(editorHtml(props.value.document));
  const appearanceKey = JSON.stringify([colors.secondaryText, props.imageWidth, props.imageUris]);
  const appearance = useRef(appearanceKey);
  const [initialHtml] = useState(() => editorHtml(props.value.document, { sans: fonts.sans, secondaryText: colors.secondaryText, imageWidth: props.imageWidth }, props.imageUris));
  useLayoutEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; replacement.current += 1; };
  }, []);
  useLayoutEffect(() => { latest.current = props; current.current = props.value; });

  function receiveHtml(html: string) {
    if (!mounted.current) return;
    const previous = current.current;
    const selected = nativeRange.current?.text === nativeText.current ? nativeRange.current.selection : undefined;
    const next = valueFromNativeHtml(html, previous, selected, latest.current.imageUris);
    if (!validEditorDocument(next.document)) return;
    const canonical = editorHtml(next.document);
    // setValue의 반영 이벤트를 받기 전까지 이전 입력 이벤트가 새 서식을 되돌리지 못하게 한다.
    if (replacing.current) {
      if (canonical !== rendered.current) return;
      replacing.current = false;
    }
    latest.current.onComposing(false);
    const normalizedText = nativeEditorText(next.document);
    const needsNormalization = nativeText.current !== normalizedText;
    nativeText.current = normalizedText;
    if (canonical === rendered.current && !needsNormalization) return;
    rendered.current = needsNormalization ? '' : canonical;
    current.current = next;
    latest.current.onChange(next);
  }

  useLayoutEffect(() => {
    const html = editorHtml(props.value.document);
    if (html === rendered.current && appearance.current === appearanceKey) return;
    const target = input.current;
    if (!target) return;
    const request = ++replacement.current;
    replacing.current = true;
    rendered.current = html;
    appearance.current = appearanceKey;
    nativeText.current = nativeEditorText(props.value.document);
    nativeRange.current = null;
    const selection = nativeEditorSelection(props.value.document, props.value.selection);
    target.setValue(editorHtml(props.value.document, { sans: fonts.sans, secondaryText: colors.secondaryText, imageWidth: props.imageWidth }, props.imageUris));
    target.setSelection(selection.start, selection.end);
    // 외부 서식 적용 중 큐에 남은 이전 HTML 이벤트는 버리고 명령 뒤의 실제 native 문서를 읽는다.
    void target.getHTML().then(value => {
      if (!mounted.current || request !== replacement.current || !replacing.current) return;
      replacing.current = false;
      receiveHtml(value);
    }, () => {
      if (!mounted.current || request !== replacement.current) return;
      replacing.current = false;
    });
  });

  useEffect(() => {
    if (requested.current !== props.focusRequest) {
      requested.current = props.focusRequest;
      if (props.isActive !== false) {
        const range = nativeEditorSelection(props.value.document, props.value.selection);
        input.current?.setSelection(range.start, range.end);
        input.current?.focus();
      }
    }
  }, [props.focusRequest, props.isActive, props.value.document, props.value.selection]);
  useEffect(() => { if (props.dismissRequest) input.current?.blur(); }, [props.dismissRequest]);
  useEffect(() => {
    if (!focused.current || props.value.selection.start !== props.value.selection.end || replacing.current) return;
    const state = nativeStyles.current;
    if (!state) return;
    const line = props.value.document.body.slice(0, props.value.selection.start).split('\n').length - 1;
    const implicitItalic = ['quote', 'pullquote'].includes(props.value.document.blocks[line] ?? 'paragraph');
    const bold = props.value.typing.some(format => format.kind === 'bold');
    const italic = implicitItalic || props.value.typing.some(format => format.kind === 'italic');
    if (!state.bold.isBlocking && state.bold.isActive !== bold) input.current?.toggleBold();
    if (!state.italic.isBlocking && state.italic.isActive !== italic) input.current?.toggleItalic();
  }, [props.value.typing, props.value.document, props.value.selection]);

  return <EnrichedTextInput ref={input} accessibilityLabel={props.label ?? '글 본문'}
    defaultValue={initialHtml} scrollEnabled={false} allowFontScaling linkRegex={null}
    selectionColor={colors.green} placeholderTextColor={colors.secondaryText}
    style={{ minHeight: props.minHeight ?? 300, fontFamily: fonts.serif, fontSize: 18, lineHeight: 30,
      color: colors.text, padding: 0 }}
    htmlStyle={{ h1: { fontSize: 28, bold: true }, h2: { fontSize: 18, bold: false },
      blockquote: { borderWidth: 4, borderColor: colors.text, gapWidth: 24 },
      ul: { marginLeft: 0, gapWidth: 22, bulletSize: 4, bulletColor: colors.text },
      ol: { marginLeft: 0, gapWidth: 8, markerColor: colors.text },
      a: { color: colors.green, textDecorationLine: 'underline' },
      mention: { color: colors.green }, codeblock: { backgroundColor: colors.surface, color: colors.text } }}
    onFocus={() => { focused.current = true; props.onFocus(); }}
    onBlur={() => { focused.current = false; props.onBlur(); }}
    onChangeText={event => {
      if (!mounted.current) return;
      nativeText.current = event.nativeEvent.value;
      // 조합 중 HTML 확정이 지연되는 플랫폼에서는 저장 문서와 입력이 일치할 때까지 서식·발행을 막는다.
      if (!replacing.current) latest.current.onComposing(nativeText.current !== nativeEditorText(current.current.document));
    }}
    onChangeHtml={event => receiveHtml(event.nativeEvent.value)}
    onChangeState={event => { nativeStyles.current = event.nativeEvent; }}
    onChangeSelection={event => {
      if (!mounted.current || replacing.current) return;
      const range = event.nativeEvent;
      nativeRange.current = { text: nativeText.current, selection: { start: range.start, end: range.end } };
      const selection = modelEditorSelection(current.current.document, range);
      if (selection && nativeText.current === nativeEditorText(current.current.document)
        && nativeText.current.slice(range.start, range.end) === range.text) latest.current.onSelect(selection);
    }} />;
}
