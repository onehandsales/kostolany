import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '../../shared/theme/ThemeProvider';
import { fonts } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';

// 초·분·시간·일 경계는 원본에서 미확인인 자체 표시 계약이다.
export function listRelativeTime(updatedAt: number | undefined, now: number): string | null {
  if (updatedAt === undefined || !Number.isFinite(updatedAt) || updatedAt < 0 || updatedAt > now) return null;
  const seconds = Math.floor((now - updatedAt) / 1000);
  const [value, unit] = seconds < 60 ? [seconds, 'second'] : seconds < 3600
    ? [Math.floor(seconds / 60), 'minute'] : seconds < 86400
      ? [Math.floor(seconds / 3600), 'hour'] : [Math.floor(seconds / 86400), 'day'];
  return `${value} ${unit}${value === 1 ? '' : 's'} ago`;
}

// 목록 본문 전체를 다시 그리지 않고 보이는 메타데이터의 경과 시간만 갱신한다.
type ListDetailMetadataProps = {
  updatedAt?: number; count: number; isPrivate: boolean; active?: boolean;
};

export function ListDetailMetadata(props: ListDetailMetadataProps) {
  return <MetadataClock key={JSON.stringify([props.updatedAt, props.active])} {...props} />;
}

function MetadataClock({ updatedAt, count, isPrivate, active = true }: ListDetailMetadataProps) {
  const { colors } = useTheme();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!active || updatedAt === undefined) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [active, updatedAt]);
  const label = [listRelativeTime(updatedAt, now), count ? `${count} ${count === 1 ? 'story' : 'stories'}` : null]
    .filter(Boolean).join(' · ');
  return <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
    <Text accessibilityLabel={`${count}개의 기사${label ? `, ${label}` : ''}`}
      style={{ fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: colors.secondaryText }}>{label}</Text>
    {isPrivate && <View accessible accessibilityLabel="Private"><AppIcon name="lock" size={12} color={colors.secondaryText} /></View>}
  </View>;
}
