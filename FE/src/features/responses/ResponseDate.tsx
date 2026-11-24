import { useEffect, useState } from 'react';
import { AppState, Text, type StyleProp, type TextStyle } from 'react-native';

import type { ReaderResponse } from './types';

type ResponseDateProps = {
  response: ReaderResponse;
  active: boolean;
  style: StyleProp<TextStyle>;
};

// 보관된 날짜 표시는 유지하고 직접 작성하거나 수정한 응답만 실제 경과 시간으로 표시한다.
export function formatResponseDate(response: ReaderResponse, now: number): string {
  const timestamp = Date.parse(response.updatedAt ?? response.createdAt);
  let label = response.dateLabel;
  if (!label && Number.isFinite(timestamp)) {
    const seconds = Math.max(0, Math.floor((now - timestamp) / 1000));
    const [value, unit] = seconds < 60 ? [seconds, 'second'] : seconds < 3600
      ? [Math.floor(seconds / 60), 'minute'] : seconds < 86400
        ? [Math.floor(seconds / 3600), 'hour'] : [Math.floor(seconds / 86400), 'day'];
    label = seconds === 0 ? 'Now' : `${value} ${unit}${value === 1 ? '' : 's'} ago`;
  }
  return [label, response.updatedAt ? '(edited)' : ''].filter(Boolean).join(' ');
}

// 응답 본문과 목록의 순서를 다시 계산하지 않고 활성 화면의 날짜만 갱신한다.
export function ResponseDate({ response, active, style }: ResponseDateProps) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!active || response.dateLabel) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    // 백그라운드에서는 시계를 멈추고 복귀 시 실제 경과 시간을 다시 읽는다.
    function updateClock(): void {
      if (timer) clearInterval(timer);
      if (AppState.currentState && AppState.currentState !== 'active') return;
      setNow(Date.now());
      timer = setInterval(() => setNow(Date.now()), 1000);
    }
    updateClock();
    const subscription = AppState.addEventListener('change', updateClock);
    return () => {
      if (timer) clearInterval(timer);
      subscription.remove();
    };
  }, [active, response.dateLabel, response.createdAt, response.updatedAt]);
  return <Text style={style}>{formatResponseDate(response, now)}</Text>;
}
