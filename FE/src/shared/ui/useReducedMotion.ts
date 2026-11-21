import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    let active = true;
    let changed = false;
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', (value) => {
      changed = true;
      if (active) setReduced(value);
    });
    // 권한 창과 달리 환경 조회만 수행하며 늦은 최초 조회가 새 OS 선택을 덮지 않게 한다.
    void Promise.resolve()
      .then(() => AccessibilityInfo.isReduceMotionEnabled())
      .then((value) => {
        if (active && !changed && typeof value === 'boolean') setReduced(value);
      })
      .catch(() => {});
    return () => {
      active = false;
      subscription.remove();
    };
  }, []);
  return reduced;
}
