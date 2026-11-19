import { fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import { createRef, useState } from 'react';
import type { TextInput } from 'react-native';

import { FormTextInput } from './FormTextInput';

describe('FormTextInput', () => {
  it('포커스와 해제 후에도 한글 입력을 보존하고 실제 입력 참조를 전달한다', async () => {
    const ref = createRef<TextInput>();
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    function Form() {
      const [value, setValue] = useState('');
      return <FormTextInput ref={ref} accessibilityLabel="목록 이름" value={value} onChangeText={setValue} onFocus={onFocus} onBlur={onBlur} />;
    }
    await render(<Form />);
    await userEvent.setup().type(screen.getByLabelText('목록 이름'), '긴 한국어 목록 이름');
    expect(screen.getByLabelText('목록 이름')).toHaveDisplayValue('긴 한국어 목록 이름');
    expect(ref.current).not.toBeNull();
    expect(onFocus).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalled();
  });

  it('여러 줄 초안을 보존하고 비활성 입력의 변경을 차단한다', async () => {
    const onChangeText = jest.fn();
    await render(<FormTextInput accessibilityLabel="소개" value={'첫째 줄\n둘째 줄'} multiline editable={false} onChangeText={onChangeText} />);
    expect(screen.getByLabelText('소개')).toHaveDisplayValue('첫째 줄\n둘째 줄');
    expect(screen.getByLabelText('소개')).toHaveProp('multiline', true);
    await fireEvent.changeText(screen.getByLabelText('소개'), '변경');
    expect(onChangeText).not.toHaveBeenCalled();
  });

  it('여러 줄 초안을 교체하지 않고 측정된 내용 높이만큼 입력을 확장한다', async () => {
    const onContentSizeChange = jest.fn();
    await render(<FormTextInput accessibilityLabel="소개" value={'첫째 줄\n둘째 줄'} multiline onContentSizeChange={onContentSizeChange} />);
    await fireEvent(screen.getByLabelText('소개'), 'contentSizeChange', { nativeEvent: { contentSize: { width: 272, height: 108 } } });
    expect(screen.getByLabelText('소개')).toHaveStyle({ height: 108 });
    expect(screen.getByLabelText('소개')).toHaveDisplayValue('첫째 줄\n둘째 줄');
    expect(onContentSizeChange).toHaveBeenCalledTimes(1);
  });
});
