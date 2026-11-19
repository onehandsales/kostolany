import { useState, type Ref } from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { useThemeStyles, useTheme } from '../theme/ThemeProvider';
import { fonts, sizes, type ThemeColors } from '../theme/tokens';

type FormTextInputProps = TextInputProps & { ref?: Ref<TextInput> };

// 회색 입력 배경과 실제 입력 영역을 분리해 원본의 낮은 배경 안에서도 48px 터치를 유지한다.
export function FormTextInput({
  ref, style, onFocus, onBlur, onContentSizeChange, ...props
}: FormTextInputProps) {
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);
  const [contentHeight, setContentHeight] = useState<number>(sizes.minimumTouchTarget);
  return (
    <View>
      <View pointerEvents="none" style={[styles.surface, focused && styles.focused]} />
      <TextInput
        {...props}
        ref={ref}
        placeholderTextColor={props.placeholderTextColor ?? colors.secondaryText}
        style={[styles.input, props.multiline && { height: contentHeight }, style]}
        onContentSizeChange={(event) => {
          // 여러 줄 입력의 내용 높이를 반영해 긴 소개와 확대된 글자를 시트 안에서 읽을 수 있게 한다.
          if (props.multiline) {
            setContentHeight(Math.max(sizes.minimumTouchTarget, event.nativeEvent.contentSize.height));
          }
          onContentSizeChange?.(event);
        }}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
      />
    </View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  surface: {
    position: 'absolute',
    top: sizes.fieldSurfaceInset,
    bottom: sizes.fieldSurfaceInset,
    left: 0,
    right: 0,
    backgroundColor: colors.input,
    borderRadius: 4,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  focused: { borderBottomColor: colors.green },
  input: {
    position: 'relative',
    zIndex: 1,
    minHeight: sizes.minimumTouchTarget,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 20,
    color: colors.text,
    backgroundColor: 'transparent',
    outlineStyle: 'solid',
    outlineWidth: 0,
    outlineColor: 'transparent',
  },
});
