// 가장자리 이동량은 화면 높이와 경과 시간에 맞춰 계산해 프레임 속도와 무관하게 유지한다.
export function edgeScrollDelta(pointer: number, height: number, elapsedMs: number): number {
  const edge = Math.min(64, height / 4);
  if (edge <= 0) return 0;
  const direction = pointer < edge ? -Math.min(1, (edge - pointer) / edge)
    : pointer > height - edge ? Math.min(1, (pointer - height + edge) / edge) : 0;
  return direction * 600 * Math.min(Math.max(elapsedMs, 0), 40) / 1000;
}

export function reorderDestination(ids: readonly string[], dragged: string, center: number,
  heights: ReadonlyMap<string, number>): number {
  let y = 0;
  return ids.filter(id => {
    const height = heights.get(id) ?? 72;
    const before = id !== dragged && y + height / 2 < center;
    y += height;
    return before;
  }).length;
}
