import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { colors } from '../theme/tokens';
import { IconButton } from './IconButton';
import { ReferenceNotice } from './ReferenceNotice';

export function WriteButton() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <IconButton
        icon="write"
        label="Write a story"
        color={colors.background}
        size={24}
        onPress={() => setVisible(true)}
        style={styles.button}
      />
      <ReferenceNotice title={visible ? 'Write a story' : null} onClose={() => setVisible(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.green,
    boxShadow: '0 4px 20px rgba(0,0,0,0.14)',
  },
});
