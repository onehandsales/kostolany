// 원본의 Just now·23h ago 외 경계는 프로필 카드 전용 mock 표시 계약이다.
export function formatProfilePublishedTime(publishedAt: string, now: number): string {
  const published = Date.parse(publishedAt);
  if (!Number.isFinite(published) || !Number.isFinite(now) || published > now) return '—';
  const elapsed = now - published;
  if (elapsed < 60000) return 'Just now';
  if (elapsed < 3600000) return `${Math.floor(elapsed / 60000)}m ago`;
  if (elapsed < 86400000) return `${Math.floor(elapsed / 3600000)}h ago`;
  return new Date(published).toLocaleDateString();
}
