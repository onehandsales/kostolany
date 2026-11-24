import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { useListening } from './ListeningProvider';
import { ListeningOptionSheet } from './ListeningOptionSheet';
import { listeningSpeeds, speedPositions } from './listeningOptions';
import { SpeedSlider } from './SpeedSlider';

export function ListeningSpeedPanel({ onClose }: { onClose: () => void }) {
  const { store, snapshot } = useListening();
  const styles = useThemeStyles(createStyles);
  const [speed, setSpeed] = useState(snapshot.options.speed);
  const selectSpeed = useCallback(
    (value: number) => {
      if (store?.getSnapshot().optionsStatus !== 'saving') setSpeed(value);
    },
    [store],
  );
  const adjustSpeed = useCallback(
    (offset: number) => {
      if (store?.getSnapshot().optionsStatus === 'saving') return;
      // 연속 접근성 입력도 같은 초안의 마지막 선택에 누적한다.
      setSpeed((current) => Math.max(0.5, Math.min(4, current + offset)));
    },
    [store],
  );
  const [trackHeight, setTrackHeight] = useState(600);
  const [bubbleHeight, setBubbleHeight] = useState(48);
  const { height } = useWindowDimensions();
  const fraction = speedPositions[listeningSpeeds.findIndex((value) => value === speed)] ?? 0.21;
  const category = speed < 1.5 ? 'Slower' : speed < 3 ? 'Average' : speed < 3.5 ? 'Faster' : 'Speed Reader';
  const knobY = (1 - fraction) * trackHeight;
  const bubbleTop = knobY < bubbleHeight + 34 ? knobY + 34 : knobY - bubbleHeight - 34;
  return (
    <ListeningOptionSheet title="Select Speed" options={{ ...snapshot.options, speed }} onClose={onClose}>
      <ScrollView contentContainerStyle={[styles.content, { minHeight: Math.max(620, height - 66) }]}>
        <View style={styles.labels}>
          {['Speed Reader', 'Faster', 'Average', 'Slower'].map((label, index) => (
            <View key={label} style={[styles.labelRow, { top: `${10 + index * 22}%` }]}>
              <Text style={[styles.label, label === category && styles.selectedLabel]}>{label}</Text>
              {label === 'Average' && speed === 2.5 && (
                <Text style={styles.boost}>145% productivity boost</Text>
              )}
            </View>
          ))}
        </View>
        <View style={styles.sliderArea} onLayout={(event) => setTrackHeight(event.nativeEvent.layout.height)}>
          <SpeedSlider
            value={speed}
            onChange={selectSpeed}
            onAdjust={adjustSpeed}
            disabled={snapshot.optionsStatus === 'saving'}
          >
            <View style={styles.track} />
            <View style={[styles.filledTrack, { height: `${fraction * 100}%` }]} />
            <View style={[styles.knob, { top: `${(1 - fraction) * 100}%` }]} />
            <View
              style={[styles.bubble, { top: bubbleTop }]}
              onLayout={(event) => setBubbleHeight(event.nativeEvent.layout.height)}
            >
              <Text style={styles.speed}>{speed}×</Text>
              <Text style={styles.wpm}>{speed === 1 ? '200 WPM' : speed === 2.5 ? '490 WPM' : '— WPM'}</Text>
            </View>
          </SpeedSlider>
        </View>
      </ScrollView>
    </ListeningOptionSheet>
  );
}
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    content: { flexDirection: 'row', paddingTop: 35, paddingBottom: 32 },
    labels: { flex: 1 },
    labelRow: { position: 'absolute', left: 8, right: 26, alignItems: 'flex-end' },
    label: {
      fontFamily: fonts.sans,
      fontSize: 17,
      color: colors.secondaryText,
      maxWidth: '100%',
      textAlign: 'right',
    },
    selectedLabel: { color: colors.text },
    boost: {
      fontFamily: fonts.sans,
      fontSize: 13,
      color: colors.secondaryText,
      marginTop: 4,
      maxWidth: '100%',
      textAlign: 'right',
    },
    sliderArea: { marginRight: '14%', width: 96 },
    track: {
      position: 'absolute',
      left: 47,
      width: 2,
      top: 0,
      bottom: 0,
      backgroundColor: colors.border,
      borderRadius: 2,
    },
    filledTrack: { position: 'absolute', left: 47, width: 2, bottom: 0, backgroundColor: colors.green },
    knob: {
      position: 'absolute',
      left: 32,
      width: 32,
      height: 32,
      marginTop: -16,
      borderRadius: 16,
      borderWidth: 3,
      borderColor: colors.border,
      backgroundColor: colors.background,
      boxShadow: [{ offsetX: 0, offsetY: 0, blurRadius: 0, spreadDistance: 8, color: '#80808010' }],
    },
    bubble: {
      position: 'absolute',
      left: 10,
      width: 76,
      minHeight: 48,
      paddingVertical: 4,
      borderRadius: 7,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    speed: { fontFamily: fonts.sans, fontSize: 17, fontWeight: '600', color: colors.text },
    wpm: { fontFamily: fonts.sans, fontSize: 13, color: colors.secondaryText, marginTop: 3 },
  });
